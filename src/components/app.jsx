import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import PeopleDashboard from './subcomponents/peopleDashboard.jsx';
import Forbidden from './subcomponents/forbidden.jsx';

function App() {
  return (
    <Switch>
      <Route exact path={'/'}>
        <Redirect to={'/people'} />
      </Route>
      <Route exact path={'/people'}>
        <PeopleDashboard />
      </Route>
      <Route path={'*'}>
        <Forbidden />
      </Route>
    </Switch>
  );
}

export default App;
