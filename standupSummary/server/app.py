# app.py

from flask import Flask, redirect, url_for
from flask_dance.contrib.github import make_github_blueprint, github
from flask_sqlalchemy import SQLAlchemy 
from flask_login import UserMixin, current_user, LoginManager, login_required, login_user, logout_user
from flask_dance.consumer.storage.sqla import OAuthConsumerMixin
from flask_dance.consumer import oauth_authorized
from sqlalchemy.orm.exc import NoResultFound

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thisissupposedtobeasecret'

github_blueprint = make_github_blueprint(client_id='c7291fcb9bf832c11e01', client_secret='c9cfff4c1b2eb7224130432432e3f0f49450808c')
app.register_blueprint(github_blueprint, url_prefix='/github_login')

@app.route('/github')
def github_login():
    if not github.authorized:
        return redirect(url_for('github.login'))

    account_info = github.get('/user')

    if account_info.ok:
        account_info_json = account_info.json()

        return '<h1>Your Github name is {}'.format(account_info_json['login'])

    return '<h1>Request failed!</h1>'

@app.route("/")
def hello():
    return "Hello World, hi!"

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))