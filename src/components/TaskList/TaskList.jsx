import './TaskList.scss';

import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Tooltip,
} from '@chakra-ui/react';

import Task from '../Task/Task';
import TaskAdd from '../Task/TaskAdd';

import {
  updateTaskListTitle,
  deleteTaskLists,
  addTaskToTaskList,
} from '../../actions/taskList.action';
import { addTask, deleteTasks } from '../../actions/task.action';
import { deleteTaskListsOfBoard } from '../../actions/board.action';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getNewNextId } from '../../utils/functions';

const selectTaskList = (state, taskListId) => {
  return state.taskLists[taskListId];
};

const selectNextTaskId = (state) => {
  return getNewNextId(state.tasks);
};

const TaskList = (props) => {
  const { id, boardId } = props;
  const [editMode, setEditMode] = useState({ title: false });
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const taskList = useSelector(
    (state) => selectTaskList(state, id),
    shallowEqual
  );

  const lastTaskId = useSelector(
    (state) => selectNextTaskId(state),
    shallowEqual
  );

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

  const TaskListHeader = () => {
    return (
      <>
        <Heading as="h1" size="lg" isTruncated>
          {taskList && taskList.title}
        </Heading>
        <Box ml={2} display="flex">
          <IconButton
            aria-label="Edit the title"
            outline="none"
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
        minW="xs"
        maxW="sm"
        borderWidth="1px"
        overflow="hidden"
        borderRadius="lg"
        px="3"
        pt="3"
        mr="4"
        boxShadow="base"
        display="inline-table"
        className="taskList"
      >
        <Flex justifyContent="space-between" mb={3}>
          {editMode.title ? (
            <>
              <Input
                placeholder={taskList && taskList.title}
                name="title"
                value={title}
                onChange={onTitleChange}
                autoFocus
                focusBorderColor="gray.700"
              />
              <Box my="auto" display="flex">
                <IconButton
                  aria-label="Save the title"
                  mx="2"
                  icon={<CheckIcon />}
                  onClick={onSaveTitle}
                />
                <IconButton
                  aria-label="Undo editing the title"
                  icon={<CloseIcon />}
                  onClick={toggleEditTitle}
                />
              </Box>
            </>
          ) : (
            <TaskListHeader />
          )}
        </Flex>
        <Box overflowY="auto" className="tasks">
          {taskList &&
            taskList.tasks &&
            taskList.tasks.map((taskId) => (
              <Task key={`task-${taskId}`} id={taskId} taskListId={id}></Task>
            ))}
        </Box>
        {/* todo: inside box ? */}
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
