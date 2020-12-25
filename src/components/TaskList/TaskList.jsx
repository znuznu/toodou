import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  ArrowBackIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';

import {
  Heading,
  IconButton,
  Flex,
  Box,
  Tooltip,
  Input,
} from '@chakra-ui/react';

import Task from '../Task/Task';
import TaskAdd from '../Task/TaskAdd';

import {
  updateTaskListTitle,
  deleteTaskLists,
  addTaskToTaskList,
  deleteTasksOfTaskList,
} from '../../actions/taskList.action';
import { addTask, deleteTasks } from '../../actions/task.action';
import { deleteTaskListsOfBoard } from '../../actions/board.action';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getNextId } from '../../utils/functions';

const selectTaskList = (state, taskListId) => {
  return state.taskLists[taskListId];
};

const selectTasks = (state) => {
  return state.tasks;
};

const selectNextTaskId = (state) => {
  return getNextId(state.tasks);
};

const TaskList = (props) => {
  const { id, boardId } = props;
  const [editMode, setEditMode] = useState({ title: false });
  const [title, setTitle] = useState('');

  // const [title, setTitle] = useState('This is a title');

  const dispatch = useDispatch();

  const taskList = useSelector(
    (state) => selectTaskList(state, id),
    shallowEqual
  );

  const lastTaskId = useSelector(
    (state) => selectNextTaskId(state),
    shallowEqual
  );

  const tasks = useSelector((state) => selectTasks(state, id), shallowEqual);

  const toggleEditTitle = () => {
    setEditMode({ ...editMode, title: !editMode.title });
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onSaveTitle = () => {
    dispatch(updateTaskListTitle(id, title));
    toggleEditTitle();
  };

  const onAddTask = () => {
    dispatch(addTask(`A task...`));
    dispatch(addTaskToTaskList(id, lastTaskId));
  };

  const onDelete = () => {
    dispatch(deleteTasks(taskList.tasks));
    dispatch(deleteTaskLists([id]));
    dispatch(deleteTaskListsOfBoard(boardId, [id]));
  };

  const onClear = () => {
    dispatch(deleteTasksOfTaskList(id, taskList.tasks));
    dispatch(deleteTasks(taskList.tasks));
  };

  const TaskListHeader = () => {
    return (
      <>
        <Heading as="h1" size="lg" mb="3">
          {taskList && taskList.title}
        </Heading>
        <Box ml={2}>
          <IconButton
            aria-label="Edit the title"
            mr="2"
            icon={
              <Tooltip label="Edit the title" openDelay={500}>
                <EditIcon />
              </Tooltip>
            }
            onClick={toggleEditTitle}
          />
          <IconButton
            aria-label="Delete the list"
            icon={
              <Tooltip label="Delete the list" openDelay={500}>
                <DeleteIcon />
              </Tooltip>
            }
            onClick={onDelete}
          />
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        overflow="hidden"
        borderRadius="lg"
        px="3"
        pt="3"
        mr="4"
        mt="4"
        boxShadow="base"
      >
        <Flex justifyContent="space-between">
          {editMode.title ? (
            <>
              <Input
                placeholder={taskList && taskList.title}
                w="50"
                name="title"
                value={title}
                onChange={onTitleChange}
                autoFocus
              />
              <Box my="auto">
                <IconButton
                  aria-label="Save the title"
                  mx="2"
                  icon={<CheckIcon />}
                  onClick={onSaveTitle}
                />
                <IconButton
                  aria-label="Undo editing the title"
                  icon={<ArrowBackIcon />}
                  onClick={toggleEditTitle}
                />
              </Box>
            </>
          ) : (
            <TaskListHeader />
          )}
        </Flex>
        {taskList &&
          taskList.tasks &&
          taskList.tasks.map((taskId) => (
            <Task key={`task-${taskId}`} id={taskId} taskListId={id}></Task>
          ))}
        <TaskAdd onAddTask={onAddTask}></TaskAdd>
      </Box>
    </>
  );
};

TaskList.propTypes = {
  id: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
};

export default TaskList;
