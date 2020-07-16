# standupSummary

## To run frontend

Navigate into `/client` folder. Run `npm install && npm start`

## To run backend:
 
1. create a python environment in `standup_summary/standup_summary'
    - `python3 -m venv nameOfEnvironment`
   - `source nameOfEnvironment/bin/activate` to activate the env
    - exit by running `deactivate`
2. Within `server/` run:
     - `pip install -r requirements.txt`
3. create a sqlite3 db within `server/`
      - run: 
      `sqlite3 login.db`
        `.tables`
        `.exit`
4. migrate tables for `login.db`
      - run:
       `python`
        `from app import db`
         `db.create_all()`
          `quit()`
5. Before running the flask app, run (while cd'ed in `server/`):
      -  `export OAUTHLIB_INSECURE_TRANSPORT=1`
      - `export OAUTHLIB_RELAX_TOKEN_SCOPE=1`
      - this allows us to utilize GitHub Oauth without an https request
6. to run the app (within `server/`): `flask run`
 
