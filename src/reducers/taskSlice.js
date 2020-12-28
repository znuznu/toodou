import { Types } from '../actions/task.action';
import { filterObject, getNewNextId } from '../helpers/functions';

const initialState = {};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD:
      return {
        ...state,
        [getNewNextId(state)]: {
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

    case Types.DELETE_MULTIPLE:
      return filterObject(state, action.payload.taskIdArray);

    default:
      return state;
  }
}
