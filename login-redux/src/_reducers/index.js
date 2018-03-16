import { combineReducers } from 'redux';

import { authentication } from './authentication.reducers';
import { registration } from './registration.reducers';
import { users } from './users.reducers';
import { alert } from './alert.reducers';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;