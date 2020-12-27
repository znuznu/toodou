import React, { useEffect, useState } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { addNewBoard, deleteBoards } from '../../actions/board.action';
import { deleteTaskLists } from '../../actions/taskList.action';
import { deleteTasks } from '../../actions/task.action';

import {
  IconButton,
  Flex,
  Heading,
  Select,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { getNewNextId } from '../../utils/functions';
import BoardListAdd from './BoardListAdd';
import Board from '../Board/Board';

const selectState = (state, type) => state[type];

const BoardList = () => {
  const [currentBoardId, setCurrentBoardId] = useState(-1);

  const { colorMode, toggleColorMode } = useColorMode();

  const boardsState = useSelector(
    (state) => selectState(state, 'boards'),
    shallowEqual
  );

  const taskListsState = useSelector(
    (state) => selectState(state, 'taskLists'),
    shallowEqual
  );

  const onSelectChange = (event) => {
    setCurrentBoardId(Number(event.target.value));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const boardsIdArray = Object.keys(boardsState).map(Number);

    const shouldHaveCurrentBoardId =
      currentBoardId === -1 && boardsIdArray.length;

    const currentBoardIdIsNoMore =
      currentBoardId !== -1 && !boardsIdArray.includes(currentBoardId);

    if (shouldHaveCurrentBoardId) {
      setCurrentBoardId(boardsIdArray[0]);
    } else if (currentBoardIdIsNoMore) {
      // todo: set the previous id instead of the first one
      setCurrentBoardId(boardsIdArray[0]);
    }
  }, [boardsState]);

  const addBoard = () => {
    const nextId = getNewNextId(boardsState);
    dispatch(addNewBoard(`Board #${nextId + 1}`));
    setCurrentBoardId(nextId);
  };

  const onDelete = () => {
    // Remove each task related to the taskLists of the current board
    boardsState[currentBoardId].taskLists.forEach((taskListId) => {
      dispatch(deleteTasks(taskListsState[taskListId].tasks));
    });

    // Remove each taskList of the current board
    dispatch(deleteTaskLists(boardsState[currentBoardId].taskLists));

    // Remove the current board
    dispatch(deleteBoards([currentBoardId]));

    if (Object.keys(boardsState).length === 1) {
      setCurrentBoardId(-1);
    }
  };

  return (
    <>
      <Flex mx="6" flexDir="column" h="100%">
        <Flex ml="3" mb="4">
          <Select
            my="auto"
            mr="3"
            ml="auto"
            w="auto"
            value={currentBoardId}
            onChange={onSelectChange}
            variant="filled"
            focusBorderColor="gray.800"
          >
            {Object.keys(boardsState).map((boardId) => (
              <option value={boardId} key={`board-select-${boardId}`}>
                {boardsState[boardId].title}
              </option>
            ))}
          </Select>
          <BoardListAdd addBoard={addBoard} />
          <IconButton
            aria-label="Switch theme"
            icon={
              <Tooltip label="Switch theme" openDelay={500}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Tooltip>
            }
            onClick={toggleColorMode}
            ml="6"
          />
        </Flex>
        {Object.keys(boardsState).length ? (
          <Board
            id={currentBoardId}
            onDelete={onDelete}
            key={`board-${currentBoardId}`}
          />
        ) : (
          <Heading as="em">No boards yet.</Heading>
        )}
      </Flex>
    </>
  );
};

export default BoardList;
