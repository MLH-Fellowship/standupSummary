// Libraries
import React, { useState, useEffect } from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const List = () => {
    const [itemsList, setListData] = useState('');

    useEffect(() => {
        fetch('/getWords').then(res => res.json()).then(data => {
          setListData(data.words);
          console.log(data.words);
        });
      }, []);

    let items;

    if(itemsList[0] !== undefined) {
        items = itemsList.map((item, i) => (
            <div key = {i} class="container">
                <div class="level notification my-3 width-set hvr-grow">
                    <div class="mx-4">You referenced <strong>{item[0]}</strong> {item[1]} times.</div>
                </div>
            </div>
        ));
    } else {
        items = (
            <div class="level notification my-3 width-set hvr-grow">
                    <div class="mx-4">Fetching your results...</div>
                    <FontAwesomeIcon icon={faSpinner} className="loading" />
            </div>
        );
    }

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