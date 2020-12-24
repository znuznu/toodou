import { Types } from '../actions/board.action';
import { getMaxId } from '../utils/functions';

const initialState = {};

function getNextId(state) {
  // Find the max board id
  const maxId = getMaxId(state);

  return maxId + 1;
}

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD_BOARD:
      console.log('BEFORE ASSIGN');
      console.log(state);

      let t = {
        ...state,
        [getMaxId(state)]: {
          title: action.payload.title,
          taskLists: [...action.payload.taskLists],
        },
      };

      console.log('AFTER ASSIGN');
      console.log(state);

      console.dir('t');
      console.log(t);

      return t;

    case Types.UPDATE_TITLE:
      // Todo: update with {}
      return state.map((board) => {
        if (board.id === action.payload.id) {
          return {
            id: action.payload.id,
            title: action.payload.title,
            taskLists: board.taskLists,
          };
        }

        return board;
      });

    case Types.DELETE_BOARD:
      // Todo: update with {}
      return state.filter((board) => board.id !== action.payload);

    case Types.ADD_TASKLIST:
      console.dir('state board before');
      console.dir(state);

      console.dir(action);

      // get last taskList added

      let p = {
        ...state,
        [action.payload.boardId]: {
          title: state[action.payload.boardId].title,
          taskLists: [
            ...state[action.payload.boardId].taskLists,
            action.payload.taskListId,
          ],
        },
      };

      console.dir('state board after');
      console.dir(state);
      console.log('p');
      console.dir(p);

      return p;

    default:
      return state;
  }
}
