const Types = {
  ADD: 'taskList/add',
  UPDATE_TITLE: 'taskList/updateTitle',
  DELETE: 'taskList/delete',
};

const addTaskList = (title) => ({
  type: Types.ADD,
  payload: { title },
});

const updateTaskListTitle = (boardId, taskListId, title) => ({
  type: Types.UPDATE_TITLE,
  payload: { boardId, taskListId, title },
});

const deleteTaskList = (boardId, taskListId) => ({
  type: Types.DELETE,
  payload: { boardId, taskListId },
});

export { Types, addTaskList, updateTaskListTitle, deleteTaskList };
