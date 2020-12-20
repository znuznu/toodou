const Types = {
  ADD_TASK: 'taskList/addTask',
  UPDATE_TASK: 'taskList/updateTask',
  DELETE_TASK: 'taskList/deleteTask',
  UPDATE_TITLE: 'taskList/updateTitle',
};

const addTask = (task) => ({
  type: Types.ADD_TASK,
  payload: task,
});

const updateTask = (task) => ({
  type: Types.UPDATE_TASK,
  payload: task,
});

const deleteTask = (id) => ({
  type: Types.DELETE_TASK,
  payload: id,
});

const updateTaskListTitle = (taskList) => ({
  type: Types.UPDATE_TITLE,
  payload: task,
});

const deleteTaskList = (taskList) => ({
  type: Types.UPDATE_TITLE,
  payload: task,
});

export {
  Types,
  addTask,
  updateTask,
  deleteTask,
  updateTaskListTitle,
  deleteTaskList,
};
