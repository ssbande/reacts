import _ from 'underscore';
import nodes from './../utils/nodePositions';

export default class MoveRules {
  constructor(occupiedSquares) {
    this.occupiedSquares = occupiedSquares
  }

  canMovePawn(node, toX, toY, targetNode) {
    const [fromX, fromY] = node.position;
    const isBlack = node.name.indexOf('black') !== -1;
    let allowStab = false;

    if(!_.isEmpty(targetNode)) {
      allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
    }

    console.log('moving the item from: (', fromX, ',', fromY, ') to position: (', toX, ',', toY, ') targetNode: ', targetNode)
    const dx = toX - fromX;
    const dy = toY - fromY;
    return (
      isBlack && toY >= fromY ||
      !isBlack && toY <= fromY
    ) && 
    (_.isEmpty(targetNode) && (
      // (Math.abs(dx) === 1 && Math.abs(dy) === 0) || 
      (Math.abs(dx) === 0 && Math.abs(dy) === 1) || 
      (fromY == 1 && isBlack && (Math.abs(dx) === 0 && Math.abs(dy) === 2)) ||
      (fromY == 6 && !isBlack && (Math.abs(dx) === 0 && Math.abs(dy) === 2))
    ) || (!_.isEmpty(targetNode) && allowStab && (Math.abs(dx) === 1 && Math.abs(dy) === 1)))
    ;
  }
}