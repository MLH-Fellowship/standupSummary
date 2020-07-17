import os
from os import environ 
GITHUB_CLIENT = environ.get('GITHUB_CLIENT')
GITHUB_SECRET = environ.get('GITHUB_SECRET')
SECRET_KEY = os.urandom(32)
# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

# Enable debug mode.
DEBUG = True

# Connect to the database


# TODO IMPLEMENT DATABASE URL
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + basedir + '/login.db'