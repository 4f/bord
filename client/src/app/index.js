import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../utils/history';

import '../styles/app.css';

import Home from '../bridges/home'
import Bord from '../bridges/bord'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/(home)?" component={Home} />
          <Route path="/bords/:url?" component={Bord} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;


