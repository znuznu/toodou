import { Types } from '../actions/taskList.action';
import { filterObject, getNewNextId } from '../helpers/functions';

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

    case Types.MOVE_TASK_BETWEEN:
      let tasksSourceClone = state[
        action.payload.taskListSourceId
      ].tasks.slice();

      const toMoveBetween = tasksSourceClone.splice(
        action.payload.taskSourceIndex,
        1
      )[0];

      let tasksDestClone = state[action.payload.taskListDestId].tasks;
      tasksDestClone.splice(action.payload.taskDestIndex, 0, toMoveBetween);

      return {
        ...state,
        [action.payload.taskListSourceId]: {
          ...state[action.payload.taskListSourceId],
          tasks: tasksSourceClone,
        },
        [action.payload.taskListDestId]: {
          ...state[action.payload.taskListDestId],
          tasks: tasksDestClone,
        },
      };

    case Types.MOVE_TASK_SELF:
      let tasksClone = state[action.payload.taskListId].tasks.slice();
      const toMoveSelf = tasksClone.splice(
        action.payload.taskSourceIndex,
        1
      )[0];
      tasksClone.splice(action.payload.taskDestIndex, 0, toMoveSelf);

      return {
        ...state,
        [action.payload.taskListId]: {
          ...state[action.payload.taskListId],
          tasks: tasksClone,
        },
      };

    default:
      return state;
  }
}
