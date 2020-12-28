import React from 'react';

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
    <Tooltip shouldWrapChildren label="Add a new board" openDelay={500}>
      <IconButton
        aria-label="Add a new Board"
        icon={<AddIcon />}
        onClick={addBoard}
        outline="none"
      />
    </Tooltip>
  );
};

BoardAdd.propTypes = {
  setCurrentBoardId: PropTypes.func.isRequired,
  setIsNewBoard: PropTypes.func.isRequired,
};

export default BoardAdd;
