// Libraries
import React from "react";

// Styles
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// Component Imports
import Instructions from '../components/Instructions';
import Form from '../components/Form.jsx';
import Logout from '../components/Logout';

import logo from "../assests/mlh-logo-color.png";

const Home = () => {
  return (
      <div>
        <nav class="level mx-4 my-4">
            <div class="level-left">
                <img src={logo} width="125" />
                <h2 class = "title is-2 mx-4">Standup Summary</h2>
            </div>
            <div class="level-right">
             <Logout />
            </div>
        </nav>
        <section className="section">
            <Instructions />
            <Form />
        </section>
    </div>
  );
};

export default Home;
