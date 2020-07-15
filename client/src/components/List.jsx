// Libraries
import React, { useState, useEffect } from "react";
import { CSSTransitionGroup } from 'react-transition-group';

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const List = () => {
    const [itemsList, setListData] = useState(
        [
            {word: 'Javascript', number: 92}, 
            {word: 'API', number: 65}, 
            {word: 'Pair-Programming', number: 46}, 
            {word: 'Overcame', number: 34},
            {word: 'Blocked', number: 20}
        ]
    );

    useEffect(() => {
        fetch('/getWords').then(res => res.json()).then(data => {
          setListData(data.words);
          console.log(data.words);
        });
      }, []);
    
    const items = itemsList.map((item, i) => (
        <div key = {i} class="container">
            <div class="level notification my-3 width-set hvr-grow">
                <div class="mx-4">You referenced <strong>{item[0]}</strong> {item[1]} times.</div>
            </div>
        </div>
    ));

    return (
        <div>
          <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {items}
          </CSSTransitionGroup>
        </div>
      );
};

export default List;