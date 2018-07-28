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

    this.deadBoxStyle = {
      fontSize: '75px',
      lineHeight: '75px',
      verticalAlign: 'middle',
      display: 'table-cell',
      fontWeight: '100',
      border: '1px solid whitesmoke',
      width: '100%'
    }
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

  renderSquare(i, sqW) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;
    const n = _(this.state.positions).find(function (node) {
      return node.position[0] === x && node.position[1] === y;
    });

    return (
      <div key={i} style={{ width: '12.5%', height: '12.5%' }}>  {/* onClick={() => this.handleSquareClick(x, y)} */}
        <BoardSquare x={x} y={y} node={n} updatePositionForNode={this.updatePositionForNode}>
          {this.renderPiece(x, y, n, sqW)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y, n, sqW) {
    if (n) {
      return <ChessPiece content={n.content} node={n} sq={sqW}/>;
    }
  }

  renderWhiteDeadPawns(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    let content = _.isEmpty(this.state.whiteDeadPawns[i]) ? '' : this.state.whiteDeadPawns[i].content;

    return (
      <div style={this.deadBoxStyle}>{content}</div>
    );
  }

  renderWhiteDeadFigures(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    let content = _.isEmpty(this.state.whiteDeadFigures[i]) ? '' : this.state.whiteDeadFigures[i].content;

    return (
      <div style={this.deadBoxStyle}>{content}</div>
    );
  }

  render() {
    const squares = [];
    const boardWidth = this.props.sq * 8;
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i, this.props.sq));
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
      // <div className='container-fluid'>
      //   <div className="row">
      //     <div className="col">
      //       <div style={{ display: 'inline-flex', marginLeft: 8, height: boardWidth, border: '1px solid #999', width: this.props.sq * 2 }}>
      //         <div style={{ display: 'flex' }}>
      //           <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadPawnSquares}</div>
      //           <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadFiguresSquares}</div>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="col">
      //       <div style={{ width: boardWidth, height: boardWidth, display: 'inline-flex', margin: '0px auto', flexWrap: 'wrap', border: '1px solid #999' }}>
      //         {squares}
      //       </div>
      //     </div>
      //     <div className="col">
      //       <div style={{ display: 'inline-flex', marginLeft: 8, height: boardWidth, border: '1px solid #999', width: this.props.sq * 2 }}>
      //         <div style={{ display: 'flex' }}>
      //           <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadPawnSquares}</div>
      //           <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadFiguresSquares}</div>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="col">
      //       One of three columns
      //     </div>
      //   </div>
      // </div>
      <div style={{ display: 'flex'}}>
        <div style={{ display: 'inline-flex', marginRight: 8, height: boardWidth, border: '1px solid #999', width: this.props.sq * 2 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadPawnSquares}</div>
            <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadFiguresSquares}</div>
          </div>
        </div>
        <div style={{
          width: boardWidth,
          height: boardWidth,
          display: 'inline-flex',
          margin: '0px',
          flexWrap: 'wrap',
          border: '1px solid #999',
        }}>
          {squares}
        </div>
        <div style={{ display: 'inline-flex', marginLeft: 8, height: boardWidth, border: '1px solid #999', width: this.props.sq * 2 }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadPawnSquares}</div>
            <div style={{ width: '50%', display: 'flex', flexWrap: 'wrap', width: this.props.sq }}>{whiteDeadFiguresSquares}</div>
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