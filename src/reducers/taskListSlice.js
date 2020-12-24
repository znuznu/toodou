import { Types } from '../actions/taskList.action';
import { getMaxId } from '../utils/functions';

const initialState = {};

function nextTaskListId(taskLists) {
  // Find the max board id
  const maxId = getMaxId(taskLists);

  return maxId + 1;
}

export default function taskListReducer(state = initialState, action) {
  switch (action.type) {
    case Types.ADD:
      return {
        ...state,
        [nextTaskListId(state)]: {
          title: action.payload.title,
          taskLists: [],
        },
      };

    case Types.UPDATE_TITLE:
      return [
        ...state,
        {
          id: state,
          text: action.payload,
        },
      ];

    case Types.UPDATE_TITLE:
      return [
        ...state,
        {
          id: state,
          text: action.payload,
        },
      ];

    default:
      return state;
  }
}
