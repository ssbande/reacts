import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';
import { DropTarget } from 'react-dnd';

import pieceMoveRules from './../utils/pieceMoveRules';
const moveRules = new pieceMoveRules([]);

const squareTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    let methodName = 'canMove' + item.piece;
    return moveRules[methodName](item, props.x, props.y, props.node);
  },

  drop(props, monitor) {
    const item = monitor.getItem();
    props.updatePositionForNode(item, {x: props.x, y: props.y});
    return {};
    // const item = monitor.getItem();
    // let methodName = 'move' + item.piece;
    // return moveRules[methodName](item, props.x, props.y, props.updatePositionForNode);
  }
};

function collect(connect, monitor) {  
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
    item: monitor.getItem()
  };
}

class BoardSquare extends Component {
  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }} />
    );
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop, node, updatePositionForNode} = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget('ChessPiece', squareTarget, collect)(BoardSquare);