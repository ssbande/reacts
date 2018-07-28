import React from 'react';
import ReactDOM from 'react-dom';
import 'css/index.css';

import Board from './../component/Board'
import nodes from './../utils/nodePositions';


const rootEl = document.getElementById('root');
console.log('nodes from start: ', nodes)

ReactDOM.render(
  <Board nodes={nodes} sq={80}/>,
  rootEl
)
