import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyledSquare} from './style'

export default class Square extends Component {
  render() {
    const { black } = this.props;
    const fill = black ? '#aed9da' : '#edfafd';
    // const pieceColor = '#135589'

    return (
      <StyledSquare fill={fill}>
        {this.props.children}
      </StyledSquare>
    );
  }
}

Square.propTypes = {
  black: PropTypes.bool
};
