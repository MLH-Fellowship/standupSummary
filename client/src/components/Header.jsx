// Libraries
import React from "react";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Header = () => {
  return (
    <div className="container has-text-centered">
       <h1 className="title is-1">Welcome to Standup Summary!</h1>
       <h4 className="subtitle is-4">You worked hard at the MLH Fellowship-- gathering your work doesn't have to be.</h4>
       <h6 className="subtitle is-6">Standup Summary will show you your most frequently used words from your standups this summer and produce resume sentences for you based off of these words!</h6>
    </div>
  );
};

export default Header;
