import './TaskList.scss';

import { Droppable, Draggable } from 'react-beautiful-dnd';

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
  useColorModeValue,
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

  // Background of the taskList, need one due to the dnd
  const bg = useColorModeValue('white', 'gray.800');

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
        bg={bg}
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
                  icon={
                    <Tooltip label="Save the title" openDelay={500}>
                      <CheckIcon />
                    </Tooltip>
                  }
                  onClick={onSaveTitle}
                />
                <IconButton
                  aria-label="Undo edit"
                  icon={
                    <Tooltip label="Undo edit" openDelay={500}>
                      <CloseIcon />
                    </Tooltip>
                  }
                  onClick={toggleEditTitle}
                />
              </Box>
            </>
          ) : (
            <TaskListHeader />
          )}
        </Flex>

        <Droppable droppableId={`${id}`} type="task">
          {(provided) => (
            <Box ref={provided.innerRef} minH="5" className="tasks">
              {taskList &&
                taskList.tasks &&
                taskList.tasks.map((taskId, index) => (
                  <Draggable
                    key={`draggable-task-${taskId}`}
                    draggableId={`draggable-task-${taskId}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          key={`task-${taskId}`}
                          id={taskId}
                          taskListId={id}
                          isDragged={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>

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
