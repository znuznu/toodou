import React from 'react';

import PropTypes from 'prop-types';

import { Box, useColorModeValue } from '@chakra-ui/react';

import TaskListHeader from './TaskListHeader';
import TaskListContent from './TaskListContent';

const TaskList = (props) => {
  const { id, boardId, isNew } = props;

  // Background of the taskList, need one due to the dnd
  const bg = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Box
        minW="xs"
        maxW="sm"
        borderWidth="1px"
        overflow="hidden"
        borderRadius="lg"
        px="3"
        pt="3"
        mr="4"
        boxShadow="base"
        display="inline-table"
        bg={bg}
      >
        <TaskListHeader id={id} boardId={boardId} isNew={isNew} />
        <TaskListContent id={id} />
      </Box>
    </>
  );
};

TaskList.propTypes = {
  id: PropTypes.number.isRequired,
  boardId: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
};

export default TaskList;
