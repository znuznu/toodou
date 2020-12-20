import { combineReducers } from 'redux';

import taskListReducer from './taskListSlice';

const rootReducer = combineReducers({
  taskList: taskListReducer,
});

export default rootReducer;
