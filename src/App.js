import React, { Component } from 'react';
import MainPage from './MainPage'
import Newsfeed from './Newsfeed'
import Login from './Login'
import Signup from './Signup'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <Switch>

          <Route exact path='/' render={ () => <Login /> } />

          <Route exact path='/signup' render={ () => <Signup /> } />

        </Switch>
      </>
    );
  }
}

export default App;
