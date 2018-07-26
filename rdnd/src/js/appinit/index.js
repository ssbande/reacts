import React from 'react';
import ReactDOM from 'react-dom';
import 'css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Board from './../component/Board'
import { observe } from './../component/Game';


const rootEl = document.getElementById('root');

observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  )
);

// ReactDOM.render(
//   <Board knightPosition={[7, 0]} />,
//   rootEl
// )

registerServiceWorker();
