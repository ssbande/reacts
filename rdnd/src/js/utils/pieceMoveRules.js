import _ from 'underscore';
import nodes from './../utils/nodePositions';

export default class MoveRules {
  constructor(occupiedSquares) {
    this.occupiedSquares = occupiedSquares
  }

  isItMyChance(name, currentChance) {
    return (name.indexOf('black') !== -1 && currentChance == 'B') || (name.indexOf('white') !== -1 && currentChance == 'W');
  }

  canMovePawn(node, toX, toY, targetNode, currentBoard, currentChance) {
    if (this.isItMyChance(node.name, currentChance)) {
      const [fromX, fromY] = node.position;
      const isBlack = node.name.indexOf('black') !== -1;
      let allowStab = false;

      if (!_.isEmpty(targetNode)) {
        allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
      }

      const dx = toX - fromX;
      const dy = toY - fromY;
      return (
        isBlack && toY >= fromY ||
        !isBlack && toY <= fromY
      ) &&
        (_.isEmpty(targetNode) && (
          (Math.abs(dx) === 0 && Math.abs(dy) === 1) ||
          (fromY == 1 && isBlack && (Math.abs(dx) === 0 && Math.abs(dy) === 2)) ||
          (fromY == 6 && !isBlack && (Math.abs(dx) === 0 && Math.abs(dy) === 2))
        ) || (!_.isEmpty(targetNode) && allowStab && (Math.abs(dx) === 1 && Math.abs(dy) === 1)))
        ;
    } else {
      return false;
    }
  }

  canMoveRook(node, toX, toY, targetNode, currentBoard, currentChance) {
    if (this.isItMyChance(node.name, currentChance)) {
      const [fromX, fromY] = node.position;
      const isBlack = node.name.indexOf('black') !== -1;
      let allowStab = false;

      if (!_.isEmpty(targetNode)) {
        allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
      }

      let firstLeft = fromX, firstRight = fromX, firstTop = fromY, firstDown = fromY;
      let left = fromX - 1, right = fromX, top = fromY - 1, down = fromY;
      while (left >= 0) {
        let e = _.find(currentBoard, (p) => p.position[0] == left && p.position[1] == fromY)
        if (!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
          firstLeft = e.name.indexOf('black') !== -1 && isBlack ? e.position[0] : e.position[0]; // Cant understand why ????
          // With e.position[0] - 1 its going one square more to the left.
          break;
        } else {
          firstLeft--;
        }
        left--;
      }

      while (right < 8) {
        let e = _.find(currentBoard, (p) => p.position[0] == right && p.position[1] == fromY)
        if (!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
          firstRight = e.name.indexOf('black') !== -1 && isBlack ? e.position[0] : e.position[0] + 1;
          break;
        } else {
          firstRight++;
        }
        right++;
      }

      while (top >= 0) {
        let e = _.find(currentBoard, (p) => p.position[1] == top && p.position[0] == fromX)
        if (!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
          firstTop = e.name.indexOf('black') !== -1 && isBlack ? e.position[1] : e.position[1] - 1;
          break;
        }
        top--;
      }

      while (down < 8) {
        let e = _.find(currentBoard, (p) => p.position[1] == down && p.position[0] == fromX)
        if (!_.isEmpty(e) && (e.position[0] != fromX || e.position[1] !== fromY)) {
          firstDown = e.name.indexOf('black') !== -1 && isBlack ? e.position[1] : e.position[1] + 1;
          break;
        }
        down++;
      }

      // console.log(' firstTop: ', firstTop, ' firstDown: ', firstDown, ' firstLeft: ', firstLeft, ' firstRight: ', firstRight, 'toX: ', toX, ' toY: ', toY);
      const newAllowedPosition = (toX === fromX && (toY > firstTop && toY < firstDown) || toY == fromY && (toX >= firstLeft && toX < firstRight))

      return _.isEmpty(targetNode) && newAllowedPosition ||
        (!_.isEmpty(targetNode) && allowStab && newAllowedPosition);
    } else {
      return false;
    }
  }

  canMoveKnight(node, toX, toY, targetNode, currentBoard, currentChance) {
    if (this.isItMyChance(node.name, currentChance)) {
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
    } else {
      return false;
    }
  }

  canMoveBishop(node, toX, toY, targetNode, currentBoard, currentChance) {
    if (this.isItMyChance(node.name, currentChance)) {// console.log(node, toX, toY, targetNode, currentBoard)
      const [fromX, fromY] = node.position;
      const isBlack = node.name.indexOf('black') !== -1;
      let allowStab = false;

      if (!_.isEmpty(targetNode)) {
        allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
      }

      let dx = Math.abs(toX - fromX);
      const dy = Math.abs(toY - fromY);
      let firstTopLeft = [fromX, fromY], firstTopRight = [fromX, fromY], firstBottomLeft = [fromX, fromY], firstBottomRight = [fromX, fromY];
      let topLeft = fromX, topRight = fromX, bottomLeft = fromY, bottomRight = fromY;

      while (bottomRight < 8 && firstBottomRight[0] < 8) {
        bottomRight++; 
        firstBottomRight = [firstBottomRight[0]+1, bottomRight];    
        let e = _.find(currentBoard, (p) => p.position[0] == firstBottomRight[0] && p.position[1] == bottomRight);

        // console.log(' first Bottom Right: ', firstBottomRight, ' _.isEmpty(e): ', _.isEmpty(e));

        if(!_.isEmpty(e)) {
          let x = e.name.indexOf('black') !== -1 && isBlack ? firstBottomRight[0] : firstBottomRight[0] + 1;
          let y = e.name.indexOf('black') !== -1 && isBlack ? bottomRight : bottomRight + 1;
          firstBottomRight = [x, y];
          break;
        } 
      }

      while (bottomLeft < 8 && firstBottomLeft[0] < 8) {
        bottomLeft++; 
        firstBottomLeft = [firstBottomLeft[0] - 1, bottomLeft];    
        let e = _.find(currentBoard, (p) => p.position[0] == firstBottomLeft[0] && p.position[1] == bottomLeft);

        if(!_.isEmpty(e)) {
          let x = e.name.indexOf('black') !== -1 && isBlack ? firstBottomLeft[0] : firstBottomLeft[0] - 1;
          let y = e.name.indexOf('black') !== -1 && isBlack ? bottomLeft : bottomLeft + 1;
          firstBottomLeft = [x, y];
          console.log(' first Bottom Left: ', firstBottomLeft, ' _.isEmpty(e): ', _.isEmpty(e), ' toX: ', toX, ' toY: ', toY);
          break;
        } 
      }


      return (toX < firstBottomRight[0] && toY < firstBottomRight[1] && (dx === 1 && dy === 1)) ||
      (toX < firstBottomRight[0] && toY < firstBottomRight[1] && (dx === 2 && dy === 2)) ||
      (toX < firstBottomRight[0] && toY < firstBottomRight[1] && (dx === 3 && dy === 3)) ||
      (toX < firstBottomRight[0] && toY < firstBottomRight[1] && (dx === 4 && dy === 4)) ||
      (toX < firstBottomRight[0] && toY < firstBottomRight[1] && (dx === 5 && dy === 5)) ||
      (toX < firstBottomRight[0] && toY < firstBottomRight[1] && (dx === 6 && dy === 6)) ||
      (toX < firstBottomRight[0] && toY < firstBottomRight[1] && (dx === 7 && dy === 7)) 
||
      ((toX > firstBottomLeft[0] && toY < firstBottomLeft[1] && (dx === 1 && dy === 1)) ||
      (toX > firstBottomLeft[0] && toY < firstBottomLeft[1] && (dx === 2 && dy === 2)) ||
      (toX > firstBottomLeft[0] && toY < firstBottomLeft[1] && (dx === 3 && dy === 3)) ||
      (toX > firstBottomLeft[0] && toY < firstBottomLeft[1] && (dx === 4 && dy === 4)) ||
      (toX > firstBottomLeft[0] && toY < firstBottomLeft[1] && (dx === 5 && dy === 5)) ||
      (toX > firstBottomLeft[0] && toY < firstBottomLeft[1] && (dx === 6 && dy === 6)) ||
      (toX > firstBottomLeft[0] && toY < firstBottomLeft[1] && (dx === 7 && dy === 7)) )

      
    } else {
      return false;
    }
  }

  canMoveQueen(node, toX, toY, targetNode, currentBoard, currentChance){
    if(this.isItMyChance(node.name, currentChance)) {
      const [fromX, fromY] = node.position;

      return fromX < 8 && fromY < 8;
    } else {
      return false;
    }
  }

  canMoveKing(node, toX, toY, targetNode, currentBoard, currentChance){
    if(this.isItMyChance(node.name, currentChance)) {
      const [fromX, fromY] = node.position;
      const isBlack = node.name.indexOf('black') !== -1;
      let allowStab = false;

      if (!_.isEmpty(targetNode)) {
        allowStab = isBlack ? targetNode.name.indexOf('white') !== -1 : targetNode.name.indexOf('black') !== -1
      }

      const dx = toX - fromX;
      const dy = toY - fromY;
      return (
        isBlack && (toY == fromY+1 || toY == fromY-1 || toY == fromY) && (toX == fromX+1 || toX == fromX-1 || toX == fromX) ||
        !isBlack && (toY == fromY+1 || toY == fromY-1 || toY == fromY) && (toX == fromX+1 || toX == fromX-1 || toX == fromX)
      ) &&
      (_.isEmpty(targetNode) && (
        (Math.abs(dx) === 0 && Math.abs(dy) === 1) || 
        (Math.abs(dx) === 1 && Math.abs(dy) === 0) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 1) 
      ) || (!_.isEmpty(targetNode) && allowStab && 
        ((Math.abs(dx) === 1 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 0 && Math.abs(dy) === 1) || 
        (Math.abs(dx) === 1 && Math.abs(dy) === 0))
      ));
    } else {
      return false;
    }
  }
}