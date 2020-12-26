import { Types } from '../actions/taskList.action';
import { filterObject, getNewNextId } from '../utils/functions';

const initialState = {};

export default function taskListReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD:
      return {
        ...state,
        [getNewNextId(state)]: {
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

    case Types.DELETE_MULTIPLE:
      return filterObject(state, action.payload.taskListIdArray);

    case Types.DELETE_TASKS:
      return {
        ...state,
        [action.payload.taskListId]: {
          title: state[action.payload.taskListId].title,
          tasks: state[action.payload.taskListId].tasks.filter(
            (taskId) => !action.payload.taskIdArray.includes(taskId)
          ),
        },
      };

    default:
      return state;
  }
}
