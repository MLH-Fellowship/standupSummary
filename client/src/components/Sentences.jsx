// Libraries
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

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

    const removeSentenceFromList = (sentence) => {
        setSentences(sentences.filter(e => e !== sentence));
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    let sentencesDiv = (<div class="width-set"></div>);

    if(sentences.length !== 0) {
        sentencesDiv = sentences.map((item, i) => (
            <div key = {i} class="container">
                <div class="level notification my-3 width-set">
                    <div class="mx-4">{capitalizeFirstLetter(item)}.</div>
                    <FontAwesomeIcon className="deleteIcon hvr-grow" icon={faTrashAlt} onClick={() => {removeSentenceFromList(item)}} />
                </div>
            </div>
        ));
    }

    return (
        <div class="continer">
             <h4 className="subtitle is-4">Generate sentences for your resume using these words.</h4>
            {sentencesDiv}
            <div class="width-set"></div>
            <div class="has-text-centered">
                <button className="button is-medium" onClick = {getSentence}>
                    <a className="hvr-icon-bounce">
                        Generate a new sentence &nbsp;
                        <FontAwesomeIcon icon={faPlus} className="hvr-icon" />
                    </a>
                </button>
            </div>
        </div>
      );
};

export default Sentences;