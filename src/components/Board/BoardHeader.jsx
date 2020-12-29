import React, { useEffect, useState } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { deleteBoards, updateTitleBoard } from '../../actions/board.action';
import { deleteTaskLists } from '../../actions/taskList.action';
import { deleteTasks } from '../../actions/task.action';

import { Flex, Heading, IconButton, Input, Tooltip } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { selectAll } from '../../helpers/events';

const selectBoardFromId = (state, id) => {
  return state.boards[id];
};

const selectState = (state, type) => state[type];

const BoardHeader = (props) => {
  const { id, isNew } = props;

  const [editMode, setEditMode] = useState({ title: isNew });
  const [title, setTitle] = useState('');

  const board = useSelector(
    (state) => selectBoardFromId(state, id),
    shallowEqual
  );

  useEffect(() => {
    if (board) {
      setTitle(board.title);
    }
  }, [board]);

  const boardsState = useSelector(
    (state) => selectState(state, 'boards'),
    shallowEqual
  );

  const taskListsState = useSelector(
    (state) => selectState(state, 'taskLists'),
    shallowEqual
  );

  const dispatch = useDispatch();

  const toggleEditTitle = () => {
    setEditMode({ ...editMode, title: !editMode.title });
  };

  const onSaveTitle = () => {
    dispatch(updateTitleBoard(id, title));
    toggleEditTitle();
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDelete = () => {
    // Remove each task related to the taskLists of the current board
    boardsState[id].taskLists.forEach((taskListId) => {
      dispatch(deleteTasks(taskListsState[taskListId].tasks));
    });

    // Remove each taskList of the current board
    dispatch(deleteTaskLists(boardsState[id].taskLists));

    // Remove the current board
    dispatch(deleteBoards([id]));
  };

  const Preview = () => {
    return (
      <>
        <Flex mb="4">
          <Heading isTruncated>{board && board.title}</Heading>
          <Flex>
            <IconButton
              aria-label="Edit the board"
              mx="2"
              icon={
                <Tooltip label="Edit the board" openDelay={500}>
                  <EditIcon />
                </Tooltip>
              }
              onClick={toggleEditTitle}
            />
            <IconButton
              aria-label="Delete the board"
              icon={
                <Tooltip label="Delete the board" openDelay={500}>
                  <DeleteIcon />
                </Tooltip>
              }
              onClick={onDelete}
            />
          </Flex>
        </Flex>
      </>
    );
  };

  return (
    <>
      {editMode.title ? (
        <>
          <Flex mb="3" maxW="sm">
            <Input
              size="lg"
              placeholder="Enter board title..."
              name="title"
              value={title}
              onChange={onTitleChange}
              autoFocus
              focusBorderColor="gray.700"
              onKeyPress={(e) => e.key === 'Enter' && onSaveTitle()}
              onFocus={selectAll}
            />
            <Flex my="auto">
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
            </Flex>
          </Flex>
        </>
      ) : (
        <Preview />
      )}
    </>
  );
};

BoardHeader.propTypes = {
  id: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
};

export default BoardHeader;
