// Libraries
import React, { useState, useEffect } from "react";

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
  const [itemsList, setListData] = useState('');

  let num = itemsList.length;

  if(num===0) num='';

  useEffect(() => {
      fetch('/get_word_freq').then(res => res.json())
      .then(data => {
        if(data.error) {
          setListData(data);
        } else {
          setListData(data.words);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }, []);

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
          <Intro number={num} />
          <NewSelection />
        </div>
          <List itemsList={itemsList} />
      </section>
    </div>
  );
};

export default Dashboard;
