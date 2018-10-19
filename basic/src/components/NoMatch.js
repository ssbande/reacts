import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../contents/noMatch.css';

class NoMatch extends Component {
  componentDidMount() {
    this.props.setIsValidRoute(false);
  }

  render() {
    return (
      <div>
        {`${this.props.location.pathname}
        is not a valid route in this application
         `}
        <p><Link to='/'>Go To Home</Link></p>
      </div>
    );
  }
}

NoMatch.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  setIsValidRoute: PropTypes.func.isRequired,
};

export default NoMatch;
