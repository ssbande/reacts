import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './square';
import { DropTarget } from 'react-dnd';
import {OverlaySquare} from './style';

import pieceMoveRules from './../utils/pieceMoveRules';
const moveRules = new pieceMoveRules([]);

const squareTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    let methodName = 'canMove' + item.piece;
    return moveRules[methodName](item, props.x, props.y, props.node, props.currentBoardPosition);
  },

  drop(props, monitor) {
    const item = monitor.getItem();
    props.updatePositionForNode(item, {x: props.x, y: props.y}, props.node);
    return {};
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
    return <OverlaySquare color={color} />;
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop, node, updatePositionForNode} = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{position: 'relative', width: '100%', height: '100%'}}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && <OverlaySquare color='red' />}
        {!isOver && canDrop && <OverlaySquare color='yellow' />}
        {isOver && canDrop && <OverlaySquare color='green' />}
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