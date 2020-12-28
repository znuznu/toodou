import React from 'react';

import { shallowEqual, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Select } from '@chakra-ui/react';

const selectState = (state, type) => state[type];

const BoardSelector = (props) => {
  // Should probably store the current board id in redux
  const { currentBoardId, setCurrentBoardId } = props;

  const boardsState = useSelector(
    (state) => selectState(state, 'boards'),
    shallowEqual
  );

  const onSelectChange = (event) => {
    setCurrentBoardId(Number(event.target.value));
  };

  return (
    <>
      <Select
        my="auto"
        mr="3"
        ml="auto"
        w="auto"
        value={currentBoardId}
        onChange={onSelectChange}
        variant="filled"
        focusBorderColor="gray.700"
      >
        {Object.keys(boardsState).map((boardId) => (
          <option value={boardId} key={`board-select-${boardId}`}>
            {boardsState[boardId].title}
          </option>
        ))}
      </Select>
    </>
  );
};

BoardSelector.propTypes = {
  currentBoardId: PropTypes.number,
  setCurrentBoardId: PropTypes.func.isRequired,
};

export default BoardSelector;
