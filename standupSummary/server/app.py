from flask import Flask, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_dance.contrib.github import make_github_blueprint, github
from flask_login import UserMixin, current_user, LoginManager, login_required, login_user, logout_user
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage
from flask_dance.consumer import oauth_authorized
from sqlalchemy.orm.exc import NoResultFound
# from freq import get_word_frequency

from words import freq

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
    podname = db.Column(db.String(250))
    top_words = db.Column(db.String(250))
    num_words = db.Column(db.String(250))
    excluded_words = db.Column(db.String(500))

class OAuth(OAuthConsumerMixin, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login')
def github_login():
    if not github.authorized:
        return redirect(url_for('github.login'))

    account_info = github.get('/user')
    account_info_json = account_info.json()
    return redirect('http://localhost:3000/preferences')

github_blueprint.storage = SQLAlchemyStorage(OAuth, db.session, user=current_user, user_required=False) 
@oauth_authorized.connect_via(github_blueprint)
def github_logged_in(blueprint, token):
    account_info = blueprint.session.get('/user')

    if account_info.ok:
        account_info_json = account_info.json()
        username = account_info_json['login']
        github_id = account_info_json['id']
        query = User.query.filter_by(username=username)

        try:
            user = query.one()
        except NoResultFound:
            user = User(username=username, github_id=github_id)
            db.session.add(user)
            db.session.commit()

        login_user(user)
    return redirect('http://localhost:3000/preferences')

@app.route('/get_user')
@login_required
def get_user():
    username = current_user.username
    github_id = current_user.github_id
    user = {'username': username, 'github_id': github_id }
    return user

@app.route('/get_summary')
@login_required
def get_summary():
    podname = current_user.podname
    num_words = current_user.num_words
    excluded_words = current_user.excluded_words
    summary = {'podname': podname, 'num_words': num_words, 'excluded_words': excluded_words}
    return summary

@app.route('/add_summary', methods=['POST'])
@login_required
def add_summary():
    summary_data = request.get_json()
    new_summary = dict(podname=summary_data['podname'], num_words=summary_data['numWords'], excluded_words=summary_data['newWord'])
    User.query.filter_by(id=current_user.id).update(new_summary)
    db.session.commit()
    return 'Done', 201


# @app.route('/get_word_freq')
# # @login_required
# def get_word_freq():
#     summary = get_summary()
#     podname = summary['podname']
#     num_words = summary['num_words']
#     user = get_user()
#     user_id = user['github_id']
#     frequency = get_word_frequency(user_id, podname)
#     return frequency[:num_words]

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('/'))

@app.route('/getWords')
def get_words():
    result = freq.get_word_frequency(16248113, "pod-0-2-1")
    return {"words": result}
