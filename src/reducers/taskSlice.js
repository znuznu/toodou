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

    case Types.DELETE_MULTIPLE:
      let newState = {};

      Object.keys(state).forEach((taskId) => {
        if (!action.payload.taskIdArray.includes(Number(taskId))) {
          newState[taskId] = { ...state[taskId] };
        }
      });

      return newState;

    default:
      return state;
  }
}
