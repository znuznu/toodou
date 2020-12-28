import React from 'react';

import PropTypes from 'prop-types';

import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';

const Board = (props) => {
  const { id, isNew } = props;

  return (
    <>
      <BoardHeader id={id} isNew={isNew} />
      <BoardContent id={id} />
    </>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
};

export default Board;
