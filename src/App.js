import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";
import * as routes from "./constants/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={`${routes.HOME}`} component={Home} />
        <Route path={`${routes.EPISODE}/:episodeId`} component={Episode} />
      </Switch>
    </Router>
  );
}

export default App;
