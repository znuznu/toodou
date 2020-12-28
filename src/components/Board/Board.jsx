import React from 'react';

import PropTypes from 'prop-types';

import BoardHeader from './BoardHeader';
import BoardContent from './BoardContent';

const Board = (props) => {
  const { id } = props;

  return (
    <>
      <BoardHeader id={id} />
      <BoardContent id={id} />
    </>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Board;
