const Types = {
  ADD: 'taskList/add',
  UPDATE_TITLE: 'taskList/updateTitle',
  DELETE_MULTIPLE: 'taskList/delete',
  ADD_TASK: 'taskList/addTask',
  DELETE_TASKS: 'taskList/deleteTasks',
  MOVE_TASK_SELF: 'taskList/moveTaskSelf',
  MOVE_TASK_BETWEEN: 'taskList/moveTaskBetween',
};

const addTaskList = (title) => ({
  type: Types.ADD,
  payload: { title },
});

const updateTaskListTitle = (taskListId, title) => ({
  type: Types.UPDATE_TITLE,
  payload: { taskListId, title },
});

const deleteTaskLists = (taskListIdArray) => ({
  type: Types.DELETE_MULTIPLE,
  payload: { taskListIdArray },
});

const addTaskToTaskList = (taskListId, taskId) => ({
  type: Types.ADD_TASK,
  payload: {
    taskListId,
    taskId,
  },
});

const deleteTasksOfTaskList = (taskListId, taskIdArray) => ({
  type: Types.DELETE_TASKS,
  payload: {
    taskListId,
    taskIdArray,
  },
});

// Move the task on the same tasklist
const moveTaskSelf = (taskListId, taskSourceIndex, taskDestIndex) => ({
  type: Types.MOVE_TASK_SELF,
  payload: {
    taskListId,
    taskSourceIndex,
    taskDestIndex,
  },
});

// Move the task between different lists
const moveTaskBetween = (
  taskListSourceId,
  taskListDestId,
  taskSourceIndex,
  taskDestIndex
) => ({
  type: Types.MOVE_TASK_BETWEEN,
  payload: {
    taskListSourceId,
    taskListDestId,
    taskSourceIndex,
    taskDestIndex,
  },
});

export {
  Types,
  addTaskList,
  updateTaskListTitle,
  deleteTaskLists,
  addTaskToTaskList,
  deleteTasksOfTaskList,
  moveTaskSelf,
  moveTaskBetween,
};
