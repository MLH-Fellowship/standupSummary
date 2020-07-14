// Libraries
import React from "react";

// Styles
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// Component Imports
import Header from "../components/Header";
import LoginButton from "../components/LoginButton";

import logo from "../assests/mlh-logo-color.png";

const Home = () => {
  return (
    <div>
    <nav class="level-left mx-4 my-4">
        <img src={logo} width="125" />
        <h2 class = "title is-2 mx-4">Standup Summary</h2>
      </nav>
    <section className="section is-medium is-vertical-center">
      <Header />
      <LoginButton />
    </section>
    </div>
  );
};

export default Home;
