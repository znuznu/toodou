import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Link as RrdLink } from 'react-router-dom';

import { shallowEqual, useSelector } from 'react-redux';

import {
  Button,
  Flex,
  Heading,
  Tooltip,
  IconButton,
  Link,
} from '@chakra-ui/react';
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

  const { t, i18n } = useTranslation();

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

  const switchLanguage = () => {
    const nextLanguage = i18n.language === 'en' ? 'fr' : 'en';

    i18n.changeLanguage(nextLanguage);
  };

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
            aria-label={t('board.header.about')}
            icon={
              <Tooltip label={t('board.header.about')} openDelay={200}>
                <Link as={RrdLink} to="/about">
                  <InfoIcon />
                </Link>
              </Tooltip>
            }
          />
          <Button
            ml="2"
            aria-label={t('board.header.lang-switch')}
            onClick={() => switchLanguage()}
          >
            <Tooltip label={t('board.header.lang-switch')} openDelay={200}>
              {i18n.language === 'en' ? 'EN' : 'FR'}
            </Tooltip>
          </Button>
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
