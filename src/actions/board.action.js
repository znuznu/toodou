const Types = {
  ADD_BOARD: 'board/add',
  UPDATE_TITLE: 'board/updateTitle',
  DELETE_BOARD: 'board/delete',
  ADD_TASKLIST: 'board/addTaskList',
  DELETE_TASKLISTS: 'board/deleteTaskLists',
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
  payload: { boardId, title },
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

const deleteTaskListsOfBoard = (boardId, taskListIdArray) => ({
  type: Types.DELETE_TASKLISTS,
  payload: {
    boardId,
    taskListIdArray,
  },
});

export {
  Types,
  addNewBoard,
  updateTitleBoard,
  deleteBoard,
  addTaskListToBoard,
  deleteTaskListsOfBoard,
};
