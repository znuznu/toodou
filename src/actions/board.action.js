const Types = {
  ADD_BOARD: 'board/add',
  UPDATE_TITLE: 'board/updateTitle',
  DELETE_BOARD: 'board/delete',
  ADD_TASKLIST: 'board/addTaskList',
};

const addNewBoard = (title) => ({
  type: Types.ADD_BOARD,
  payload: {
    title,
    taskLists: [],
  },
});

const updateTitleBoard = (boardId, title) => ({
  type: Types.UPDATE_TITLE,
  payload: { id: boardId, title },
});

const deleteBoard = (boardId) => ({
  type: Types.DELETE_BOARD,
  payload: boardId,
});

const addTaskListToBoard = (boardId, taskListId) => ({
  type: Types.ADD_TASKLIST,
  payload: {
    boardId,
    taskListId,
  },
});

export {
  Types,
  addNewBoard,
  updateTitleBoard,
  deleteBoard,
  addTaskListToBoard,
};
