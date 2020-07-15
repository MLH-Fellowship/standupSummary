// Libraries
import React, { useEffect, useState } from "react";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Instructions = () => {
  const [username, setUsername] = useState([]);

  useEffect(() => {
    fetch("/get_user").then(response =>
      response.json().then(data => {
        setUsername(data['username']);
      })
    );
  }, []);
  return (
    <div className="container">
       <h2 className="title is-2">Welcome, {username}.</h2>
       <h4 className="subtitle is-4">Select your pod, which words to exclude, and how many words to return.</h4>
    </div>
  );
};

export default Instructions;
