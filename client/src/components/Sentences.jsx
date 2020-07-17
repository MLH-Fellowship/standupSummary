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

    let sentencesDiv = (<div class="width-set"></div>);

    if(sentences.length !== 0) {
        sentencesDiv = sentences.map((item, i) => (
            <div key = {i} class="container">
                <div class="level notification my-3 width-set">
                    <div class="mx-4">{item}</div>
                    <FontAwesomeIcon className="deleteIcon hvr-grow" icon={faTrashAlt} onClick={() => {removeSentenceFromList(item)}} />
                    {/* style={{color:'red', cursor:'pointer'}} */}
                </div>
            </div>
        ));
    }

    return (
        <div class="continer has-text-centered">
            {sentencesDiv}
            <div class="width-set"></div>
            <div class="has-text-centered">
                <button className="button is-medium" onClick = {getSentence}>
                    <a>
                        Generate a new sentence &nbsp;
                        <FontAwesomeIcon icon={faPlus} />
                    </a>
                </button>
            </div>
        </div>
      );
};

export default Sentences;