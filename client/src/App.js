// Libraries
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Page Imports
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Preferences from "./pages/Preferences";

library.add(fab, faCheckSquare, faSignOutAlt);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/preferences" component={Preferences} />

        <Route component={() => <h1>404 page not found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;

