// Libraries
import React, { useState } from "react";
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const Logout = () => {
    return (
        <div className="container has-text-centered">
            <button className="button is-medium" aria-label="Github">
                <a className="hvr-icon-forward" href="/" aria-label="Github">
                    Logout &nbsp;
                    <FontAwesomeIcon icon={faSignOutAlt} className="hvr-icon" />
                </a>
            </button>
        </div>
    );
};

export default Logout;
