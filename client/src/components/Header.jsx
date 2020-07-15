// Libraries
import React from "react";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Header = () => {
  return (
    <div className="container has-text-centered">
       <h1 className="title is-1">Welcome to Standup Summary!</h1>
       <h3 className="subtitle is-5">You worked hard at the MLH Fellowship-- gathering your work doesn't have to be.</h3>
    </div>
  );
};

export default Header;
