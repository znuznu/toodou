import React from 'react';

import { useTranslation } from 'react-i18next';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { addNewBoard } from '../../actions/board.action';

import { getNewNextId } from '../../helpers/functions';

const selectState = (state, type) => state[type];

const BoardAdd = (props) => {
  const { setCurrentBoardId, setIsNewBoard } = props;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const boardsState = useSelector(
    (state) => selectState(state, 'boards'),
    shallowEqual
  );

  const addBoard = () => {
    const nextId = getNewNextId(boardsState);
    dispatch(addNewBoard(`Board #${nextId + 1}`));
    setCurrentBoardId(nextId);
    setIsNewBoard(true);
  };

  return (
    <IconButton
      aria-label={t('board.tooltip.create')}
      icon={
        <Tooltip
          shouldWrapChildren
          label={t('board.tooltip.create')}
          openDelay={500}
        >
          <AddIcon />
        </Tooltip>
      }
      onClick={addBoard}
      outline="none"
    />
  );
};

BoardAdd.propTypes = {
  setCurrentBoardId: PropTypes.func.isRequired,
  setIsNewBoard: PropTypes.func.isRequired,
};

export default BoardAdd;
