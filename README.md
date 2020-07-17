# standupSummary

## General information
`standupSummary` is a web app that takes in your stand-up notes on MLH Github and return a list of most frequently used words. This app can also generate a new sentence based on user's past comments using Markov chain rule.

This project was submitted as part of the MLH Fellowship [Half-way Hackathon](https://mlh-fellowship.gitbook.io/fellow-handbook/events/halfway-hackathon), which encourages projects that improve the experience of current and future fellows. This `standupSummary` project aims to provide a tool for fellows to look back on their past work and have fun!

## Installation
### Dependencies
The project uses React front-end and Flask back-end. To install the project, your machine must have `python` and `npm` installed.

Now, to install the front-end, nagivate to `/client` folder and run `npm install`; and to install the back-end, navigate to `standupSummary/server/` and run `pip install -r requirements.txt`.

### Server
Once you have installed all the dependencies, let's fire up our servers. To start the React server, run:
```
cd client/
npm start
```

To start the Flask server, on a new terminal, run:
```
export OAUTHLIB_INSECURE_TRANSPORT=1
export OAUTHLIB_RELAX_TOKEN_SCOPE=1
export FLASK_APP=app.py
cd standupSummary/server/
flask run
```
The first two commands allow us to utilize GitHub Oauth without an https request, while the subsequent commands start the Flask server.


Once you have started **both** React and Flask servers, you can use your browser to navigate to `http://localhost:3000/` and start using our app!

*Note: by default, the Flask server will run on localhost:5000 and React server will run on localhost:3000. If these ports are already in use, you will have to free these ports first before starting the servers in order for the web app to work properly.*


## User guide
Once you start the servers, you are greeted with the login screen:

![](screenshots/welcome_screenshot.png)

Once you have logged in, you can choose to see your most frequently used words by choosing the *right* pod (note that only members of a port can see comments of that port):

![](screenshots/form_screenshot.png)

If you are an MLH fellow and are in some valid pod, you are able to see the most frequent words that you used in your stand-up notes (excluding all English stop words). In addition, you can generate a new sentence based on your comments using the `Generate a new sentence` button.

![](screenshots/summary_screen.png)
