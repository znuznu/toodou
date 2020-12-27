import React, { useState } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import {
  addTaskListToBoard,
  updateTitleBoard,
} from '../../actions/board.action';
import { addTaskList } from '../../actions/taskList.action';

import { getNewNextId } from '../../utils/functions';

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

import TaskList from '../TaskList/TaskList';
import TaskListAdd from '../TaskList/TaskListAdd';

const selectBoardFromId = (state, id) => {
  return state.boards[id];
};

const selectTaskLists = (state) => {
  return state.taskLists;
};

const Board = (props) => {
  const { id, onDelete } = props;

  const board = useSelector(
    (state) => selectBoardFromId(state, id),
    shallowEqual
  );

  const taskListsState = useSelector(
    (state) => selectTaskLists(state),
    shallowEqual
  );

  const [editMode, setEditMode] = useState({ title: false });
  const [title, setTitle] = useState('');

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

  const onAddTaskList = () => {
    const nextId = getNewNextId(taskListsState);
    dispatch(addTaskList(`Tasks`));
    dispatch(addTaskListToBoard(id, nextId));
  };

  const Header = () => {
    return (
      <>
        <Heading>{board && board.title}</Heading>
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
      </>
    );
  };

  return (
    <>
      <Flex mb="4">
        {editMode.title ? (
          <>
            <Input
              size="lg"
              placeholder={board && board.title}
              w="50"
              name="title"
              value={title}
              onChange={onTitleChange}
              autoFocus
              focusBorderColor="gray.800"
            />
            <Box my="auto">
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
          <Header />
        )}
      </Flex>
      <Flex flexDir="horizontal" overflowX="auto" h="100%">
        {board && board.taskLists.length ? (
          board.taskLists.map((taskListId) => {
            return (
              <TaskList
                id={taskListId}
                boardId={id}
                key={`tlid-${taskListId}`}
              ></TaskList>
            );
          })
        ) : (
          <Heading as="em" mr="4">
            No list found.
          </Heading>
        )}
        <TaskListAdd onAddTaskList={onAddTaskList}></TaskListAdd>
      </Flex>
    </>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Board;
