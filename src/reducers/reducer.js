import { combineReducers } from 'redux';

import taskListReducer from './taskListSlice';
import boardSliceReducer from './boardSlice';

const rootReducer = combineReducers({
  boards: boardSliceReducer,
  taskLists: taskListReducer,
});

export default rootReducer;
