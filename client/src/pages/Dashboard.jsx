// Libraries
import React from "react";

// Styles
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// Component Imports
import Intro from '../components/Intro';
import List from '../components/List';
import NewSelection from '../components/NewSelection';
import Logout from '../components/Logout'

import logo from "../assests/mlh-logo-color.png";

const Dashboard = () => {
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
        <div class = "level">
        <Intro />
          <NewSelection />
        </div>
        <List />
      </section>
    </div>
  );
};

export default Dashboard;
