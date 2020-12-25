import React, { useEffect, useState } from 'react';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { addNewBoard, deleteBoards } from '../../actions/board.action';

import { Box, Flex, Select, Heading } from '@chakra-ui/react';

import { getMinId, getMaxId } from '../../utils/functions';
import BoardListAdd from './BoardListAdd';
import Board from '../Board/Board';

const selectBoards = (state) => state.boards;

/** Main component containing all boards. */
const BoardList = () => {
  const [currentBoardId, setCurrentBoardId] = useState(0);

  // const boards = useSelector(selectBoards, shallowEqual);

  const boards = [];

  const updateCurrentBoard = (event) => {
    setCurrentBoardId(Number(event.target.value));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNewBoard(`Board #${boards.length + 1}`));
  }, []);

  // const addBoard = () => {
  //   dispatch(addNewBoard(`Board #${boards.length + 1}`));
  // };

  const onDelete = () => {
    dispatch(deleteBoards(currentBoardId));
  };

  return (
    <>
      <Box mx="6" mb="6">
        {/* <Flex mx="3">
          <Select
            size="sm"
            my="auto"
            mr="3"
            ml="auto"
            w="auto"
            value={currentBoardId}
            onChange={updateCurrentBoard}
          >
            {boards.map((board) => (
              <option value={board.id} key={board.id}>
                {board.title}
              </option>
            ))}
          </Select>
          <BoardListAdd addBoard={addBoard} />
        </Flex> */}
        <Board
          id={currentBoardId}
          onDelete={onDelete}
          key={`board-${currentBoardId}`}
        />
        {/* {boards.length && currentBoardId > -1 ? (
          <Board
            id={currentBoardId}
            onDelete={onDelete}
            key={`board-${currentBoardId}`}
          />
        ) : (
          <Heading as="h3">No boards yet.</Heading>
        )} */}
      </Box>
    </>
  );
};

export default BoardList;
