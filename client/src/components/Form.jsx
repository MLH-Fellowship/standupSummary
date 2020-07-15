// Libraries
import React, { useState } from "react";

import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';


const Form = () => {
    const [wordsList, setWordsList] = useState(
        [
            {word: 'the', selected: true}, 
            {word: 'a', selected: true}, 
            {word: 'an', selected: false}, 
            {word: 'did', selected: false}
        ]
    );

    const [numWords, setNumWords] = useState(50);

    const [newWord, setNewWord] = useState('');

    const [podName, setPodName] = useState('0.0.1');

    const numWordsReturned = [];

    const podNames = [
        '0.0.1', '0.1.1', '0.2.1', '0.2.2', '0.3.1', '0.3.2', '0.4.1', '0.4.2', '0.5.1', '0.5.2', '0.6.3'
    ];
    
    for (let i = 1; i <= 50; i++) {
        numWordsReturned.push(i);
    }
    
    const numberOptions = numWordsReturned.map((option, i) => (
        <option key={i} className="mx-6">{option}</option>
    ));

    const podOptions = podNames.map((option, i) => (
        <option key={i} className="mx-6">{option}</option>
    ));

    const checkboxes = wordsList.map((word, i) => (
        <p class="control">
            <label class="checkbox px-5" style={{fontSize:"1.25rem"}}>
            <input type="checkbox" key={i} checked={word.selected} />
                &nbsp; {word.word}
            </label>
        </p>
    ));

    const addWordToList = () => {
        setWordsList(wordsList.concat([{word: newWord, selected: true}]));
        setNewWord('');
    };

    const submit = () => {
        
        const summary = { 'podname': podName, 'numWords': numWords, 'newWord': newWord };
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
                            {numberOptions}
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
