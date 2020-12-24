import { Types } from '../actions/task.action';
import { getNextId } from '../utils/functions';

const initialState = {};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD:
      return {
        ...state,
        [getNextId(state)]: {
          content: action.payload.content,
        },
      };

    case Types.UPDATE_CONTENT:
      return {
        ...state,
        [action.payload.taskId]: {
          ...state[action.payload.taskId],
          content: action.payload.content,
        },
      };

    default:
      return state;
  }
}
