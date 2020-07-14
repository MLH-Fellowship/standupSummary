from flask import Flask, redirect, url_for
from flask_sqlalchemy import SQLAlchemy 
from flask_dance.contrib.github import make_github_blueprint, github
from flask_login import UserMixin, current_user, LoginManager, login_required, login_user, logout_user
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage
from flask_dance.consumer import oauth_authorized
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)
app.config.from_object('config')
github_blueprint = make_github_blueprint(client_id='c7291fcb9bf832c11e01', client_secret='c9cfff4c1b2eb7224130432432e3f0f49450808c') # fix this/set env var
app.register_blueprint(github_blueprint, url_prefix='/login')

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True)
    github_id = db.Column(db.Integer, unique=True)

class OAuth(OAuthConsumerMixin, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

github_blueprint.storage = SQLAlchemyStorage(OAuth, db.session, user=current_user, user_required=False)
@app.route('/login')
def github_login():
    if not github.authorized:
        return redirect(url_for('github.login'))

    account_info = github.get('/user')
    account_info_json = account_info.json()
    return '<h1>Your Github name is {}'.format(account_info_json['login'])

github_blueprint.storage = SQLAlchemyStorage(OAuth, db.session, user=current_user, user_required=False) 
@oauth_authorized.connect_via(github_blueprint)
def github_logged_in(blueprint, token):
    account_info = blueprint.session.get('/user')

    if account_info.ok:
        print('in ok')
        account_info_json = account_info.json()
        username = account_info_json['login']
        github_id = account_info_json['id']
        query = User.query.filter_by(username=username)

        try:
            print('try')
            user = query.one()
        except NoResultFound:
            print('exc')
            user = User(username=username, github_id=github_id)
            db.session.add(user)
            db.session.commit()

        login_user(user)

@app.route('/')
@login_required
def dashboard():
    return '<h1>You are logged in as {}</h1>'.format(current_user.username)

@app.route('/home')
def index():
    return 'Home'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('/home'))
