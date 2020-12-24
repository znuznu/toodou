import { combineReducers } from 'redux';

import taskListReducer from './taskListSlice';
import boardSliceReducer from './boardSlice';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
  boards: boardSliceReducer,
  taskLists: taskListReducer,
  tasks: taskReducer,
});

export default rootReducer;
