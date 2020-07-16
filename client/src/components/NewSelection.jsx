// Libraries
import React, { useState } from "react";
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from "@fortawesome/free-solid-svg-icons";


const NewSelection = () => {
    return (
        <div className="container has-text-centered mr-3">
            <button className="button is-medium" aria-label="Github">
                <a className="hvr-icon-bounce" href="/preferences" aria-label="Github">
                    Change your Preferences &nbsp;
                    <FontAwesomeIcon icon={ faUserCog } className="hvr-icon" />
                </a>
            </button>
        </div>
    );
};

export default NewSelection;
