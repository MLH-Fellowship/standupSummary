// Libraries
import React from "react";

// Styles
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// Component Imports
import Header from "../components/Header";
import LoginButton from "../components/LoginButton";

const Home = () => {
  return (
    <section className="section is-large is-vertical-center">
      <Header />
      <LoginButton />
    </section>
  );
};

export default Home;
