import React, { Component } from 'react';
import logo from 'images/logo.svg';
import 'css/App.css';
import Knight from './../component/knight'
import Square from './../component/square'



import { DragDropContextProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
// import Dustbin from './component/Dustbin'
// import Box from './component/Box'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Board knightPosition={[7, 4]} />
      </div>
    );
  }
}

export default App;
