const Types = {
  ADD: 'task/add',
  UPDATE_CONTENT: 'task/updateContent',
  DELETE_MULTIPLE: 'task/deleteMultiple',
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

const deleteTasks = (taskIdArray) => ({
  type: Types.DELETE_MULTIPLE,
  payload: {
    taskIdArray,
  },
});

export { Types, addTask, updateTaskContent, deleteTasks };
