import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';
import Knight from './knight';
import BoardSquare from './BoardSquare';
import { canMoveKnight, moveKnight } from './Game';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class Board extends Component {
  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;

    return (
      <div key={i}
        style={{ width: '12.5%', height: '12.5%' }}
        onClick={() => this.handleSquareClick(x, y)}>
        <BoardSquare x={x}
          y={y}>
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  handleSquareClick(toX, toY) {
    console.log('Moving knight to position: (', toX, ', ', toY, ')')
    if (canMoveKnight(toX, toY)) {
      moveKnight(toX, toY);
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '800px',
        height: '800px',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '50px auto',
        border: '1px solid black',
      }}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};

export default DragDropContext(HTML5Backend)(Board);