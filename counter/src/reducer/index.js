import {combineReducers} from 'redux';
import counterReducer from './counterreducer';

const counterApp = combineReducers({
  counterReducer
})

export default counterApp;