import React from 'react';
import './App.css';
import { Router, Route, Switch } from './Router';
import Play from './pages/play';
import Actuator from './pages/actuator';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/play" component={Play} />
          <Route path="/actuator" component={Actuator} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
