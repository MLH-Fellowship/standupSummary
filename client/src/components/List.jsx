// Libraries
import React, { useState } from "react";
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
    
    const items = itemsList.map((item, i) => (
        <div key = {i} class="container">
            <div class="level notification my-3 width-set">
                <div class="mx-4">You referenced <strong>{item.word}</strong> {item.number} times.</div>
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