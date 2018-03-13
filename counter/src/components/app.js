import React, {Component} from 'react';
import Counter from '../container/counter';
import AddCounter from '../container/addcounter';
import RemoveCounter from '../container/removecounter';
import { REMOVE_COUNTER } from '../actions/actiontype';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Counter></Counter>
        <br/>
        <div className="columns">
          <div className="column is-11">
            <AddCounter></AddCounter>
          </div>
          <div className="column auto">
            <RemoveCounter></RemoveCounter>
          </div>
        </div>
      </div>
    )
  }
}

export default App;