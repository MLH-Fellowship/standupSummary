// Libraries
import React from "react";

// Styles
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// Component Imports
import Intro from '../components/Intro';
import List from '../components/List';
import NewSelection from '../components/NewSelection';

const Dashboard = () => {
  return (
    <section className="section">
    <div class = "level">
    <Intro />
      <NewSelection />
    </div>
      <List />
    </section>
  );
};

export default Dashboard;
