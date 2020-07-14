// Libraries
import React, { useState } from "react";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Intro = () => {
  return (
    <div className="container">
       <h2 className="title is-2">Congrats on your hard work this summer! 🎉</h2>
       <h4 className="subtitle is-4">Here are your 20 most used words during standups.</h4>
    </div>
  );
};

export default Intro;
