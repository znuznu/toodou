import { Types } from '../actions/taskList.action';

const initialState = [];

export default function taskListReducer(state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_TITLE:
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
        },
      ];
  }
}
