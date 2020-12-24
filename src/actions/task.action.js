const Types = {
  ADD_TASK: 'task/add',
  UPDATE_TASK: 'task/update',
  DELETE_TASK: 'task/delete',
};

const addTask = (boardId, taskListId, taskId) => ({
  type: Types.ADD_TASK,
  payload: {
    boardId,
    taskListId,
    taskId,
  },
});

const updateTask = (boardId, taskListId, taskId) => ({
  type: Types.UPDATE_TASK,
  payload: {
    boardId,
    taskListId,
    taskId,
  },
});

const deleteTask = (boardId, taskListId, taskId) => ({
  type: Types.DELETE_TASK,
  payload: {
    boardId,
    taskListId,
    taskId,
  },
});

export { Types, addTask, updateTask, deleteTask };
