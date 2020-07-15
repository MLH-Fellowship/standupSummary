// Libraries
import React, { useState, useEffect } from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const List = ({ itemsList }) => {
    let items;

    if(itemsList.error) {
      items = (
        <div class="level notification is-warning my-3 width-set hvr-grow">
                <div class="mx-4">Error: {itemsList.error}. Change your preferences.</div>
                <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
    );
    } else if(itemsList[0] !== undefined) {
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