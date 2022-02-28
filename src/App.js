import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Home from "./pages/Home";
import Episode from "./pages/Episode/Episode";
import Character from "./pages/Character/Character";
import Location from "./pages/Location/Location";
import * as routes from "./constants/routes";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={`${routes.HOME}`} component={Home} />
        <Route path={`${routes.EPISODE}/:episodeId`} component={Episode} />
        <Route path={`${routes.CHARACTER}/:characterId`} component={Character} />
        <Route path={`${routes.LOCATION}/:locationId`} component={Location} />
      </Switch>
    </Router>
  );
}

export default App;
