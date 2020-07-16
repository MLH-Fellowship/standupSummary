// Libraries
import React, { useState, useEffect } from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationTriangle, faPlus } from "@fortawesome/free-solid-svg-icons";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Sentences = () => {
    const [sentences, setSentences] = useState([]);

    const getSentence = () => {
        fetch('/get_sentence').then(res => res.json())
        .then(data => {
            setSentences(sentences.concat([data.sentence]));
        })
        .catch(error => {
          console.log(error);
        });
      };

    let sentencesDiv = sentences.map((item, i) => (
        <div key = {i} class="container">
            <div class="level notification my-3 width-set hvr-grow">
                <div class="mx-4">{item}</div>
            </div>
        </div>
    ));

    return (
        <div class="continer has-text-centered">
            <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {sentencesDiv}
            </CSSTransitionGroup>
            <button className="button is-medium" onClick = {getSentence}>
                <a>
                    Generate a new sentence &nbsp;
                    <FontAwesomeIcon icon={faPlus} />
                </a>
            </button>
        </div>
      );
};

export default Sentences;