import React from 'react';
import ReactDOM from 'react-dom';
import 'css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Board from './../component/Board'
// import { observe } from './../component/Game';
import nodes from './../utils/nodePositions';


const rootEl = document.getElementById('root');
console.log('nodes from start: ', nodes)

// observe(() =>
//   ReactDOM.render(
//     <Board nodes={nodes}/>,
//     rootEl
//   )
// );

ReactDOM.render(
  <Board nodes={nodes} />,
  rootEl
)

registerServiceWorker();
