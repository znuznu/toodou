const Types = {
  ADD: 'task/add',
  UPDATE_CONTENT: 'task/updateContent',
  DELETE: 'task/delete',
};

const addTask = (content) => ({
  type: Types.ADD,
  payload: {
    content,
  },
});

const updateTaskContent = (taskId, content) => ({
  type: Types.UPDATE_CONTENT,
  payload: {
    taskId,
    content,
  },
});

const deleteTask = (boardId, taskListId, taskId) => ({
  type: Types.DELETE,
  payload: {
    boardId,
    taskListId,
    taskId,
  },
});

export { Types, addTask, updateTaskContent, deleteTask };
