import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import counterApp from './reducer/index'
import { createStore } from 'redux';

const store = createStore(counterApp);

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)