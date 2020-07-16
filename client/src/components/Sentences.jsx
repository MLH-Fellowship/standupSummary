// Libraries
import React, { useState, useEffect } from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Sentences = () => {
    const [sentences, setSentences] = useState([
        'Erin is really cool.',
        'Jason is also cool.',
        'Diana is also cool.',
    ]);

    const getSentence = () => {
        fetch('/get_words').then(res => res.json())
        .then(data => {
            if(data.error) {
            setSentences(data);
            } else {
            setSentences(data.words);
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    let sentencesDiv;

    if(sentences.error) {
      sentencesDiv = (
        <div class="level notification is-warning my-3 width-set hvr-grow">
                <div class="mx-4">Error: {sentences.error}. Change your preferences.</div>
                <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
    );
    } else if(sentences[0] !== undefined) {
        sentencesDiv = sentences.map((item, i) => (
            <div key = {i} class="container">
                <div class="level notification my-3 width-set hvr-grow">
                    <div class="mx-4">{item}</div>
                </div>
            </div>
        ));
    } else {
        sentencesDiv = (
            <div class="level notification my-3 width-set hvr-grow">
                    <div class="mx-4">Fetching your results...</div>
                    <FontAwesomeIcon icon={faSpinner} className="loading" />
            </div>
        );
    }

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
            <button className="button is-medium">
                <a className="hvr-icon-forward">
                    Generate a new sentence
                </a>
            </button>
        </div>
      );
};

export default Sentences;