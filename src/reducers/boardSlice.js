import { Types } from '../actions/board.action';
import { getNextId } from '../utils/functions';

const initialState = {};

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_BOARD:
      return {
        ...state,
        [getNextId(state)]: {
          title: action.payload.title,
          taskLists: [...action.payload.taskLists],
        },
      };

    case Types.UPDATE_TITLE:
      return {
        ...state,
        [action.payload.boardId]: {
          ...state[action.payload.boardId],
          title: action.payload.title,
        },
      };

    case Types.DELETE_BOARD:
      // Later :)
      return state;

    case Types.ADD_TASKLIST:
      return {
        ...state,
        [action.payload.boardId]: {
          title: state[action.payload.boardId].title,
          taskLists: [
            ...state[action.payload.boardId].taskLists,
            action.payload.taskListId, // Splice ?
          ],
        },
      };

    case Types.DELETE_TASKLISTS:
      return {
        ...state,
        [action.payload.boardId]: {
          title: state[action.payload.boardId].title,
          taskLists: state[action.payload.boardId].taskLists.filter(
            (taskListId) => !action.payload.taskListIdArray.includes(taskListId)
          ),
        },
      };

    default:
      return state;
  }
}
