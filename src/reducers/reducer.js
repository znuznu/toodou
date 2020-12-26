import { combineReducers } from 'redux';

import taskListReducer from './taskListSlice';
import boardReducer from './boardSlice';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
  boards: boardReducer,
  taskLists: taskListReducer,
  tasks: taskReducer,
});

export default rootReducer;
