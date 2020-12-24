import { Types } from '../actions/taskList.action';
import { getNextId } from '../utils/functions';

const initialState = {};

export default function taskListReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD:
      return {
        ...state,
        [getNextId(state)]: {
          title: action.payload.title,
          tasks: [],
        },
      };

    case Types.UPDATE_TITLE:
      return {
        ...state,
        [action.payload.taskListId]: {
          ...state[action.payload.taskListId],
          title: action.payload.title,
        },
      };

    case Types.ADD_TASK:
      return {
        ...state,
        [action.payload.taskListId]: {
          title: state[action.payload.taskListId].title,
          tasks: [
            ...state[action.payload.taskListId].tasks,
            action.payload.taskId,
          ],
        },
      };

    default:
      return state;
  }
}
