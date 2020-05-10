import React, { Component } from 'react';
import Newsfeed from './Newsfeed'
import Login from './Login'
import Signup from './Signup'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import './App.css';

class App extends Component {
  state = {
    currentUser: '',
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    if (token) {
      fetch('http://localhost:3000/api/v1/sessions/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(result => result.json())
        .then(data => {
          this.setState({currentUser: data})
        })
        .catch(err => {
          debugger;
        })
    }
  }

  updateCurrentUser = (currentUser) => {
    this.setState({currentUser: currentUser})
  }

  handleLogout = () => {
    localStorage.removeItem('token')

    this.setState({currentUser: null})
  }

  render() {
    const { currentUser } = this.state;

    return (
      <>
        <Switch>

          <Route
            exact path='/'
            render={
              () => currentUser ?
                <Newsfeed
                  currentUser={currentUser}
                  handleLogout={this.handleLogout}
                /> :
                <Login updateCurrentUser={this.updateCurrentUser} />
            }
          />

          <Route exact path='/signup' render={
              () => currentUser ?
                <Newsfeed
                  currentUser={currentUser}
                  handleLogout={this.handleLogout}
              /> :
                <Signup updateCurrentUser={this.updateCurrentUser} />
            }
          />

        </Switch>
      </>
    );
  }
}

export default App;
