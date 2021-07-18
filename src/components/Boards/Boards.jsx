import React, { useEffect, useState } from 'react';

import { Link as RrdLink } from 'react-router-dom';

import { shallowEqual, useSelector } from 'react-redux';

import { Flex, Heading, Tooltip, IconButton, Link } from '@chakra-ui/react';
import { InfoIcon, QuestionIcon } from '@chakra-ui/icons';

import BoardAdd from './BoardAdd';
import Board from '../Board/Board';
// import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import BoardSelector from './BoardSelector';

const selectState = (state, type) => state[type];

const Boards = () => {
  const [currentBoardId, setCurrentBoardId] = useState(-1);

  // Focus the newly created Board
  const [isNewBoard, setIsNewBoard] = useState(false);

  const boardsState = useSelector(
    (state) => selectState(state, 'boards'),
    shallowEqual
  );

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
      setIsNewBoard(false);
    }
  }, [boardsState]);

  return (
    <>
      <Flex mx="6" flexDir="column" h="100%">
        <Flex ml="3" mb="4">
          <BoardSelector
            currentBoardId={currentBoardId}
            setCurrentBoardId={setCurrentBoardId}
            setIsNewBoard={setIsNewBoard}
          />
          <BoardAdd
            setCurrentBoardId={setCurrentBoardId}
            setIsNewBoard={setIsNewBoard}
          />
          {/* Remove for now */}
          {/* <ThemeSwitcher /> */}
          <IconButton
            ml="6"
            icon={
              <Tooltip label="Get help" openDelay={200}>
                <QuestionIcon />
              </Tooltip>
            }
            // onClick={}
          />
          <IconButton
            ml="2"
            icon={
              <Tooltip label="About" openDelay={200}>
                <Link as={RrdLink} to="/about">
                  <InfoIcon />
                </Link>
              </Tooltip>
            }
            // onClick={}
          />
        </Flex>
        {Object.keys(boardsState).length ? (
          <Board
            id={currentBoardId}
            key={`board-${currentBoardId}`}
            isNew={isNewBoard}
          />
        ) : (
          <Heading as="em">No boards yet.</Heading>
        )}
      </Flex>
    </>
  );
};

export default Boards;
