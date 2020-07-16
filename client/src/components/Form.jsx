// Libraries
import React, { useState } from "react";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const Form = () => {
    const [wordsList, setWordsList] = useState([]);

    const [numWords, setNumWords] = useState(50);

    const [newWord, setNewWord] = useState('');

    const [podName, setPodName] = useState('pod-0-0-1');

    let numWordsReturned = [];

    const podNames = [
        'pod-0-0-1', 'pod-0-1-1', 'pod-0-1-2', 'pod-0-2-1', 'pod-0-2-2', 'pod-0-3-1', 'pod-0-3-2', 
        'pod-0-4-1', 'pod-0-4-2', 'pod-0-5-1', 'pod-0-5-2', 'pod-0-6-3'
    ];
    
    for (let i = 1; i <= 50; i++) {
        numWordsReturned.push(i);
    }

    const removeWordFromList = (word) => {
        setWordsList(wordsList.filter(e => e !== word));
    };

    const addWordToList = () => {
        setWordsList(wordsList.concat([newWord]));
        setNewWord('');
    };

    const numberWordsOptions = numWordsReturned.map((option, i) => (
        <option key={i} className="mx-6">{option}</option>
    ));

    numWordsReturned = [];

    for (let i = 1; i <= 15; i++) {
        numWordsReturned.push(i);
    }

    const numberWordsInSentenceOptions = numWordsReturned.map((option, i) => (
        <option key={i} className="mx-6">{option}</option>
    ));

    const podOptions = podNames.map((option, i) => (
        <option key={i} className="mx-6">{option}</option>
    ));

    const checkboxes = wordsList.map((word, i) => (
        <div class="notification level width-set-small">
            <span>{word} &nbsp;</span>
            <FontAwesomeIcon icon={faTrashAlt} style={{cursor: 'pointer'}} onClick={() => {removeWordFromList(word)}} /> 
        </div>
    ));

    const submit = () => {
        
        const summary = { 'podname': podName, 'numWords': numWords, 'excludedWords': wordsList };
        const response = fetch("/add_summary", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(summary)
        });
        if (response.ok) {
            console.log("response worked!");
        }   
        window.location.replace("http://localhost:3000/dashboard");
    };

    return (
        <div className="container">
            <div class = "level">
                <div class="field my-4">
                    <label class="label">Which pod were you a part of?</label>
                    <span class="select">
                        <select value={podName} onChange={e => setPodName(e.currentTarget.value)}>
                            {podOptions}
                        </select>
                    </span>
                </div>
                <div class="field my-4">
                    <label class="label">How many top words do you want?</label>
                    <span class="select">
                        <select value={numWords} onChange={e => setNumWords(e.currentTarget.value)}>
                            {numberWordsOptions}
                        </select>
                    </span>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <label class="label">Which words do you want to exclude?</label>
            <div class = "field">
                <div class="field-body">
                    <div class="field">
                    {checkboxes}
                    </div>
                </div>
                <div class="field has-addons my-4">
                    <p class="control">
                        <input class="input" type="text" placeholder="do" value={newWord} onChange={e => setNewWord(e.target.value)} />
                    </p>
                    <p class="control">
                        <a class="button is-warning" onClick={addWordToList}>
                            Exclude <strong>&nbsp; {newWord}</strong>
                        </a>
                    </p>
                </div>
            </div>
            <p class="control">
            <button class="button is-primary" onClick={submit}>Submit</button>
                {/* <a class="button is-primary" onClick={}>
                    Submit
                </a> */}
            </p>
        </div>
    );
};

export default Form;
