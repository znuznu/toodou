import React from 'react';

import PropTypes from 'prop-types';

import { Box } from '@chakra-ui/react';

import TaskListHeader from './TaskListHeader';
import TaskListContent from './TaskListContent';

const TaskList = (props) => {
  const { id, boardId, isNew } = props;

  return (
    <Box
      minW="xs"
      maxW="xs"
      overflow="hidden"
      borderRadius="lg"
      px="3"
      py="3"
      mr="4"
      display="inline-table"
      backgroundColor="#f8fafb"
    >
      <TaskListHeader id={id} boardId={boardId} isNew={isNew} />
      <TaskListContent id={id} />
    </Box>
  );
};

TaskList.propTypes = {
  id: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
};

export default TaskList;
