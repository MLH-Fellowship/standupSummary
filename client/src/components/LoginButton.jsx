// Libraries
import React, { useState } from "react";
import '../App.css';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const LoginButton = () => {
    return (
        <div className="container has-text-centered" style={{marginTop: "3rem"}}>
            <button className="button is-large" aria-label="Github">
                <a className="hvr-icon-bounce" href="/preferences" aria-label="Github">
                    Login with Github &nbsp;
                    <FontAwesomeIcon icon={['fab', 'github']} className="hvr-icon" />
                </a>
            </button>
        </div>
    );
};

export default LoginButton;
