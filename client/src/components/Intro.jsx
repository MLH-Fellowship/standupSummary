// Libraries
import React from "react";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Intro = ({number}) => {
  return (
    <div className="container mx-0">
       <h2 className="title is-2">Congrats on your hard work this summer! 🎉</h2>
       <div className="level has-text-centered">
         <h4 className="subtitle is-4 mb-0">Here are your {number} most used words during standups.</h4>
         <h4 className="subtitle is-4 mb-0">Generate sentences for your resume using these words.</h4>
       </div>
    </div>
  );
};

export default Intro;
