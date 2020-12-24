const Types = {
  ADD: 'taskList/add',
  UPDATE_TITLE: 'taskList/updateTitle',
  DELETE: 'taskList/delete',
  ADD_TASK: 'taskList/addTask',
};

const addTaskList = (title) => ({
  type: Types.ADD,
  payload: { title },
});

const updateTaskListTitle = (taskListId, title) => ({
  type: Types.UPDATE_TITLE,
  payload: { taskListId, title },
});

const deleteTaskList = (boardId, taskListId) => ({
  type: Types.DELETE,
  payload: { boardId, taskListId },
});

const addTaskToTaskList = (taskListId, taskId) => ({
  type: Types.ADD_TASK,
  payload: {
    taskListId,
    taskId,
  },
});

export {
  Types,
  addTaskList,
  updateTaskListTitle,
  deleteTaskList,
  addTaskToTaskList,
};
