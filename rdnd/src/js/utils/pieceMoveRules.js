import _ from 'underscore';
import nodes from './../utils/nodePositions';

export default class MoveRules {
  constructor(occupiedSquares) {
    this.occupiedSquares = occupiedSquares
  }

  canMovePawn(node, toX, toY, targetNode) {

    // console.log('from can move knight')
    // const [x, y] = knightPosition;
    // const dx = toX - x;
    // const dy = toY - y;

    // return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);

    const [fromX, fromY] = node.position;
    const isBlack = node.name.indexOf('black') !== -1;
    let allowStab = false;

    if (!_.isEmpty(targetNode)) {
      allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
    }

    // console.log('moving the item from: (', fromX, ',', fromY, ') to position: (', toX, ',', toY, ') targetNode: ', targetNode)
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

  canMoveRook(node, toX, toY, targetNode, currentBoard) {
    const [fromX, fromY] = node.position;
    const isBlack = node.name.indexOf('black') !== -1;
    let allowStab = false;

    if (!_.isEmpty(targetNode)) {
      allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
    }

    let firstLeft = fromX, firstRight = fromX, firstTop = fromY, firstDown = fromY;
    let left = fromX - 1, right = fromX - 1, top = fromY - 1, down = fromY;
    while (left >= 0) {
      let e = _.find(currentBoard, (p) => p.position[0] == left && p.position[1] == fromY)
      if(!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
        firstLeft = e.name.indexOf('black') !== -1 && isBlack ? e.position[0] : e.position[0] ; // Cant understand why ????
        // With e.position[0] - 1 its going one square more to the left.
        break;
      } else {
        firstLeft--;
      }
      left--;
    }
    
    while (right < 8) {
      let e = _.find(currentBoard, (p) => p.position[0] == right && p.position[1] == fromY)
      if(!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
        firstRight = e.name.indexOf('black') !== -1 && isBlack ? e.position[0] : e.position[0] + 1;
        break;
      } else {
        firstRight++;
      }
      right++;
    }

    while (top >= 0) {
      let e = _.find(currentBoard, (p) => p.position[1] == top && p.position[0] == fromX)
      if(!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
        firstTop = e.name.indexOf('black') !== -1 && isBlack ? e.position[1] : e.position[1] - 1 ;
        break;
      }
      top--;
    }
    
    while (down < 8) {
      let e = _.find(currentBoard, (p) => p.position[1] == down && p.position[0] == fromX)
      if(!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
        firstDown = e.name.indexOf('black') !== -1 && isBlack ? e.position[1] : e.position[1] + 1;
        break;
      }
      down++;
    }

    // const newAllowedPosition = (toX === fromX && (toY >= minTop || toY < minDown) || toY == fromY && (toX >= minLeft || toX < minRight))
    console.log(' firstTop: ', firstTop, ' firstDown: ', firstDown, ' firstLeft: ', firstLeft, ' firstRight: ', firstRight, 'toX: ', toX, ' toY: ', toY);
    
    const newAllowedPosition = (toX === fromX && (toY > firstTop && toY < firstDown) || toY == fromY && (toX >= firstLeft && toX < firstRight))

    return _.isEmpty(targetNode) && newAllowedPosition ||
    (!_.isEmpty(targetNode) && allowStab && newAllowedPosition);
  }

  canMoveKnight(node, toX, toY, targetNode) {
    const [fromX, fromY] = node.position;
    const isBlack = node.name.indexOf('black') !== -1;
    let allowStab = false;

    if (!_.isEmpty(targetNode)) {
      allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
    }

    const dx = toX - fromX;
    const dy = toY - fromY;
    const newAllowedPosition = (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2)

    return _.isEmpty(targetNode) && newAllowedPosition ||
    (!_.isEmpty(targetNode) && allowStab && newAllowedPosition);
  }

  
}