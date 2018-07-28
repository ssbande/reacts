import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';


const source = {
  beginDrag(props, monitor, component) {
    return props.node;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let chessPiece;

class ChessPiece extends Component {
  render() {
    const { connectDragSource, isDragging, content, sq } = this.props;
    chessPiece = this.props.node.name;
    const fs= 0.75*sq;
    return connectDragSource(
      <div style={{
        fontSize: fs, lineHeight: fs+'px', verticalAlign: 'middle', display: 'table-cell',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'pointer',
        fontWeight: '100'
      }}>
        {content}
      </div>
    );
  }
}

ChessPiece.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('ChessPiece', source, collect)(ChessPiece);