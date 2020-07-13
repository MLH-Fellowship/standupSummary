// Libraries
import React from "react";

// Styles
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';

// Component Imports
import Instructions from '../components/Instructions';
import Form from '../components/Form.jsx';

const Home = () => {
  return (
    <section className="section">
      <Instructions />
      <Form />
    </section>
  );
};

export default Home;
