import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';
import Knight from './knight';
import BoardSquare from './BoardSquare';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'underscore';
import ChessPiece from './ChessPiece'
import nodes from './../utils/nodePositions';
import Constants from './../utils/constants';
import { DeadBox, Header, DeadBoxContainer, BoardContainer, DeadBoxColumn, DeadBoxColumnContainer, BoardPieceSquare } from './style';


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: nodes,
      whiteDeadPawns: [],
      whiteDeadFigures: [],
      blackDeadPawns: [],
      blackDeadFigures: []
    };

    this.updatePositionForNode = this.updatePositionForNode.bind(this);
  }

  updatePositionForNode(node, newPosition, targetNode) {
    let oldNodes = this.state.positions;
    const toX = newPosition.x, toY = newPosition.y
    const wdP = this.state.whiteDeadPawns, wdF = this.state.whiteDeadFigures;
    const bdP = this.state.blackDeadPawns, bdF = this.state.blackDeadFigures;

    if (!_.isEmpty(targetNode)) {
      const isBlack = targetNode.name.indexOf('black') !== -1;
      if (targetNode.piece == 'Pawn') {
        if (isBlack) { bdP.push(targetNode) } else { wdP.push(targetNode) };
      } else {
        if (isBlack) { bdF.push(targetNode) } else { wdF.push(targetNode) };
      }

      oldNodes = _.without(oldNodes, _.findWhere(oldNodes, { name: targetNode.name }));
    }

    oldNodes.forEach(element => {
      if (element.name === node.name) {
        element.position = [toX, toY]
      }
    });

    this.setState({
      whiteDeadFigures: wdF,
      whiteDeadPawns: wdP,
      positions: oldNodes,
      blackDeadPawns: bdP,
      blackDeadFigures: bdF
    })
  }

  renderSquare(i, sqW) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;
    const n = _(this.state.positions).find(function (node) {
      return node.position[0] === x && node.position[1] === y;
    });

    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
        <BoardSquare x={x} y={y} node={n} updatePositionForNode={this.updatePositionForNode}>
          {this.renderPiece(x, y, n, sqW)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y, n, sqW) {
    if (n) {
      return <ChessPiece content={n.content} node={n} sq={sqW} />;
    }
  }

  renderDeadPiece(i, color, category) {
    let targetArray = [];
    if (color === Constants.color.white) {
      targetArray = category === Constants.category.pawn ? this.state.whiteDeadPawns : category === Constants.category.figure ? this.state.whiteDeadFigures : targetArray;
    } else if (color === Constants.color.black) {
      targetArray = category === Constants.category.pawn ? this.state.blackDeadPawns : category === Constants.category.figure ? this.state.blackDeadFigures : targetArray;
    }

    let content = _.isEmpty(targetArray[i]) ? '' : targetArray[i].content;
    return (
      <DeadBoxContainer sw={this.props.sq}>
        <DeadBox sw={this.props.sq}>{content}</DeadBox>
      </DeadBoxContainer>
    );
  }

  render() {
    const squares = [];
    const boardWidth = this.props.sq * 8;
    const whiteDeadPawnSquares = [], whiteDeadFiguresSquares = [], blackDeadPawnSquares = [], blackDeadFiguresSquares = [];
    for (let i = 0; i < 64; i++) {
      if(i < 8) {
        whiteDeadPawnSquares.push(this.renderDeadPiece(i, Constants.color.white, Constants.category.pawn));
        whiteDeadFiguresSquares.push(this.renderDeadPiece(i, Constants.color.white, Constants.category.figure));
        blackDeadPawnSquares.push(this.renderDeadPiece(i, Constants.color.black, Constants.category.pawn));
        blackDeadFiguresSquares.push(this.renderDeadPiece(i, Constants.color.black, Constants.category.figure))
      }

      squares.push(this.renderSquare(i, this.props.sq));
    }

    return (
      <div>
        <Header>Chess</Header>
        <BoardContainer>
          <DeadBoxColumnContainer sw={this.props.sq} boardWidth={boardWidth}>
            <div style={{ display: 'flex' }}>
              <DeadBoxColumn sw={this.props.sq}>{blackDeadPawnSquares}</DeadBoxColumn>
              <DeadBoxColumn sw={this.props.sq}>{blackDeadFiguresSquares}</DeadBoxColumn>
            </div>
          </DeadBoxColumnContainer>
          <BoardPieceSquare sw={this.props.sq} boardWidth={boardWidth}>{squares}</BoardPieceSquare>
          <DeadBoxColumnContainer sw={this.props.sq}>
            <div style={{ display: 'flex' }}>
              <DeadBoxColumn sw={this.props.sq}>{whiteDeadPawnSquares}</DeadBoxColumn>
              <DeadBoxColumn sw={this.props.sq}>{whiteDeadFiguresSquares}</DeadBoxColumn>
            </div>
          </DeadBoxColumnContainer>
        </BoardContainer>
      </div>
    );
  }
}

Board.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.array.isRequired
  ).isRequired
};

export default DragDropContext(HTML5Backend)(Board);