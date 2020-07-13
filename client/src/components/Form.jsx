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

    const numWordsReturned = [];
    
    for (let i = 1; i <= 50; i++) {
        numWordsReturned.push(i);
    }
    
    const numberOptions = numWordsReturned.map((option, i) => (
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

    return (
        <div className="container">
            <div class="field my-4">
                <label class="label">How many top words do you want?</label>
                <span class="select">
                    <select value={numWords} onChange={e => setNumWords(e.currentTarget.value)}>
                        {numberOptions}
                    </select>
                </span>
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
                <a class="button is-primary" href="/dashboard">
                Submit
                </a>
            </p>
        </div>
    );
};

export default Form;
