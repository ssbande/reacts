import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fakeAuth } from './Login';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
    };

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    fakeAuth.deAuthenticate(() => {
      this.setState({ loggedIn: false });
    });
  }

  render() {
    if (!this.state.loggedIn) {
      return (<Redirect to='/' />);
    }

    return (
      <div>
        <h2>Welcome admin </h2>
        <button
          type='button'
          onClick={event => this.logout(event)}
        >
          Log out
        </button>
      </div>
    );
  }
}

export default Admin;
