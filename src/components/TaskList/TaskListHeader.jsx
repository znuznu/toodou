import React, { useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Tooltip,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
  updateTaskListTitle,
  deleteTaskLists,
} from '../../actions/taskList.action';
import { deleteTasks } from '../../actions/task.action';
import { deleteTaskListsOfBoard } from '../../actions/board.action';

const selectTaskList = (state, taskListId) => {
  return state.taskLists[taskListId];
};

const TaskListHeader = (props) => {
  const { id, boardId } = props;

  const [editMode, setEditMode] = useState({ title: false });
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const toggleEditTitle = () => {
    setEditMode({ ...editMode, title: !editMode.title });
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const taskList = useSelector(
    (state) => selectTaskList(state, id),
    shallowEqual
  );

  const onSaveTitle = () => {
    dispatch(updateTaskListTitle(id, title));
    toggleEditTitle();
  };

  const onDelete = () => {
    dispatch(deleteTasks(taskList.tasks));
    dispatch(deleteTaskLists([id]));
    dispatch(deleteTaskListsOfBoard(boardId, [id]));
  };

  const Preview = () => {
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
        <Preview />
      )}
    </Flex>
  );
};

export default TaskListHeader;
