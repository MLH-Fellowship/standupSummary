from flask import Flask, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_dance.contrib.github import make_github_blueprint, github
from flask_login import UserMixin, current_user, LoginManager, login_required, login_user, logout_user
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin, SQLAlchemyStorage
from flask_dance.consumer import oauth_authorized
from sqlalchemy.orm.exc import NoResultFound
from words import freq, sentence_gen

app = Flask(__name__)
app.config.from_object('config')
github_blueprint = make_github_blueprint(client_id=app.config.get("GITHUB_CLIENT"), client_secret=app.config.get("GITHUB_SECRET"), scope=["read:org", "read:discussion", "repo"]) # fix this/set env var, 
app.register_blueprint(github_blueprint, url_prefix='/login')

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True)
    github_id = db.Column(db.Integer, unique=True)
    podname = db.Column(db.String(250))
    num_words = db.Column(db.String(250))
    excluded_words = db.Column(db.String(500))
    corpus = db.Column(db.String(250))

class OAuth(OAuthConsumerMixin, db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    user = db.relationship(User)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
@login_required
def index():
    return redirect('http://localhost:3000/preferences')

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
    # github_token = Oauth(token=token)

    if account_info.ok:
        # user model
        account_info_json = account_info.json()
        username = account_info_json['login']
        github_id = account_info_json['id']     
        query = User.query.filter_by(username=username)

        try:
            user = query.one()
        except NoResultFound:
            user = User(username=username, github_id=github_id)
            # oauth
            db.session.add(user)
            db.session.commit()

        login_user(user)

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
    excluded_words = str(summary_data['excludedWords']).strip('[]').replace(',', '').replace('\'', '')
    new_summary = dict(podname=summary_data['podname'], num_words=summary_data['numWords'], excluded_words=excluded_words)
    User.query.filter_by(id=current_user.id).update(new_summary)
    db.session.commit()
    return 'Done', 201

@app.route('/get_words')
# @login_required
def get_words():  
    # retrieve a user's number of words and podname
    summary = get_summary()
    num_words = int(summary['num_words'])
    podname = summary['podname']

    # retrieve user's token 
    print(current_user.id)
    # print(OAuth.query.filter_by(id=current_user.id))
    user_token = OAuth.query.filter_by(id=current_user.id).first().token
    print("user: ", user_token)
    access_token = user_token['access_token']
    
    # retrieve user's github id, username, excluded words
    user = get_user()
    user_id = user['github_id']
    username = user['username']
    excluded_words = summary['excluded_words']
    excluded_words = excluded_words.split(' ')

    # execute frequency of words script
    frequency, corpus = freq.get_word_frequency(username, user_id, podname, num_words, excluded_words, access_token, True)

    # add corpus database
    corpus = str(corpus).strip('[]').replace(',', '').replace('\'', '')
    the_user = User.query.filter_by(id=current_user.id)

    dicti = dict(corpus=corpus)

    the_user.update(dicti)

    db.session.commit()
   
    if(type(frequency) is list):
        result = {"words": frequency}

    return result

@app.route('/get_sentence')
@login_required
def get_sentence():
    user_corpus = User.query.filter_by(id=current_user.id).first().corpus
    corpus = user_corpus.split(' ')
    sentence = sentence_gen.sentence_gen(corpus)
    print('sentence:', sentence)
    result = {'sentence': sentence}
    return result

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('/'))