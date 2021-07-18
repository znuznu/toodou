import React from 'react';

import PropTypes from 'prop-types';

import { Box, useColorModeValue } from '@chakra-ui/react';

import TaskListHeader from './TaskListHeader';
import TaskListContent from './TaskListContent';

const TaskList = (props) => {
  const { id, boardId, isNew } = props;

  // Background of the taskList, need one due to the dnd
  const bg = useColorModeValue('white', 'sith.900');

  return (
    <Box
      minW="xs"
      maxW="xs"
      overflow="hidden"
      borderRadius="lg"
      px="3"
      pt="0"
      mr="4"
      display="inline-table"
      // boxShadow="5px 5px 10px #1d1d1d, -5px -5px 10px #272727"
      // bg={bg}
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
