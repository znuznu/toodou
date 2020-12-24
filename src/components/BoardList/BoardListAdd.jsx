import React from 'react';

import PropTypes from 'prop-types';

import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const BoardListAdd = (props) => {
  const { addBoard } = props;

  return (
    <Tooltip shouldWrapChildren label="Add a new board" openDelay={500}>
      <IconButton
        aria-label="Add a new Board"
        icon={<AddIcon />}
        onClick={addBoard}
      />
    </Tooltip>
  );
};

BoardListAdd.propTypes = {
  addBoard: PropTypes.func.isRequired,
};

export default BoardListAdd;
