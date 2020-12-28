import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

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

import { selectAll } from '../../helpers/events';

const selectTaskList = (state, taskListId) => {
  return state.taskLists[taskListId];
};

const TaskListHeader = (props) => {
  const { id, boardId, isNew } = props;

  const [editMode, setEditMode] = useState({ title: isNew });
  const [title, setTitle] = useState('');

  const taskList = useSelector(
    (state) => selectTaskList(state, id),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskList) {
      setTitle(taskList.title);
    }
  }, [taskList]);

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
            placeholder={'Enter list title...'}
            name="title"
            value={title}
            onChange={onTitleChange}
            autoFocus
            focusBorderColor="gray.700"
            onKeyPress={(e) => e.key === 'Enter' && onSaveTitle()}
            onFocus={selectAll}
            size="lg"
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

TaskListHeader.propTypes = {
  id: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
};

export default TaskListHeader;
