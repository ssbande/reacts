import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    this.props.setIsValidRoute(true);
  }

  render() {
    return (
      <div>
        <h3>Home</h3>
      </div>
    );
  }
}

Home.propTypes = {
  setIsValidRoute: PropTypes.func.isRequired,
};

export default Home;
