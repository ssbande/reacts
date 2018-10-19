import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/* A fake authentication function */

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },

  deAuthenticate(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false,
    };

    this.login = this.login.bind(this);
  }

  login() {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (<Redirect to={from} />);
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname} </p>
        <button type='button' onClick={this.login}>Log in</button>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.object,
    }),
  }).isRequired,
};

export default Login;
