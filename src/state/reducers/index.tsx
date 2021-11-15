import checkersReducer from './checkersReducer';

import { combineReducers } from 'redux';

const reducers = combineReducers({
  checkers: checkersReducer,
});

export default reducers;
