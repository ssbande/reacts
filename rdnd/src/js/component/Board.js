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


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: nodes,
      whiteDeadPawns: [],
      whiteDeadFigures: [],
      blackKilledPawns: [],
      blackDeadFigures: []
    };

    this.updatePositionForNode = this.updatePositionForNode.bind(this);
  }

  updatePositionForNode(node, newPosition) {
    let oldNodes = this.state.positions;
    const toX = newPosition.x, toY = newPosition.y
    oldNodes.forEach(element => {
      if (element.name === node.name) {
        element.position = [toX, toY]
      }
    });

    this.setState({
      positions: oldNodes
    })
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    // const [knightX, knightY] = this.props.knightPosition;
    // const piece = (x === knightX && y === knightY) ?
    //   <Knight /> :
    //   null;

    const n = _(this.state.positions).find(function (node) {
      return node.position[0] === x && node.position[1] === y;
    });
    // if (n) {
    //   return <ChessPiece content={n.content} node={n}/>;
    // }

    console.log('positions: ', x, ' ', y, ' node: ', n);


    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>  {/* onClick={() => this.handleSquareClick(x, y)} */}
        <BoardSquare x={x} y={y} node={n} updatePositionForNode={this.updatePositionForNode}>
          {this.renderPiece(x, y, n)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y, n) {
    // const [knightX, knightY] = this.props.knightPosition;
    // if (x === knightX && y === knightY) {
    //   return <Knight />;
    // }

    // console.log('props node: ', this.props.nodes);
    // console.log('x: ', x, ' y: ', y);

    // const n = _(this.props.nodes).find(function (node) {
    //   return node.position[0] === x && node.position[1] === y;
    // });
    if (n) {
      return <ChessPiece content={n.content} node={n} />;
    }
  }

  // handleSquareClick(toX, toY) {
  //   console.log('Moving knight to position: (', toX, ', ', toY, ')')
  //   if (canMoveKnight(toX, toY)) {
  //     moveKnight(toX, toY);
  //   }
  // }

  renderWhiteDeadPawns(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    let content = ''
    if(!_.isEmpty(this.state.whiteDeadPawns[i])) {
      content = this.state.whiteDeadPawns[i].content;
    }

    return (
      <div style={{
        fontSize: '75px', lineHeight: '75px', verticalAlign: 'middle', display: 'table-cell',
        fontWeight: '100', border: '1px solid whitesmoke',width:'100%'
      }}>
        {content}
      </div>
    );
  }

  renderWhiteDeadFigures(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    let content = ''
    if(!_.isEmpty(this.state.whiteDeadFigures[i])) {
      content = this.state.whiteDeadFigures[i].content;
    }

    return (
      <div style={{
        fontSize: '75px', lineHeight: '75px', verticalAlign: 'middle', display: 'table-cell',
        fontWeight: '100', border: '1px solid whitesmoke',width:'100%'
      }}>
        {content}
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    const whiteDeadPawnSquares = []; 
    for (let i = 0; i < 8; i++) {
      whiteDeadPawnSquares.push(this.renderWhiteDeadPawns(i))
    }  

    const whiteDeadFiguresSquares = []; 
    for (let i = 0; i < 8; i++) {
      whiteDeadFiguresSquares.push(this.renderWhiteDeadFigures(i))
    }  
    

    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'inline-flex', marginRight: 8, height: '800px', border: '1px solid #999', width: '200px'}}>Shreyas</div>
        <div style={{
          width: '800px',
          height: '800px',
          display: 'inline-flex',
          margin: '0px auto',
          flexWrap: 'wrap',
          border: '1px solid #999',
        }}>
          {squares}
        </div>
        <div style={{display: 'inline-flex', marginLeft: 8, height: 800, border: '1px solid #999', width: 200}}>
          <div style={{display:'flex'}}>
          <div style={{width: '50%', display: 'flex', flexWrap: 'wrap', width: '100px'}}>{whiteDeadPawnSquares}</div>
          <div style={{width: '50%', display: 'flex', flexWrap: 'wrap', width: '100px'}}>{whiteDeadFiguresSquares}</div>
          </div>
        </div>
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