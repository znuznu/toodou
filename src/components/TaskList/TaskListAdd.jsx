import React from 'react';

import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const TaskListAdd = (props) => {
  const { onAddTaskList } = props;

  return (
    <Tooltip shouldWrapChildren label="Add a new task list" openDelay={500}>
      <Box
        borderWidth="1px"
        overflow="hidden"
        borderRadius="lg"
        p={3}
        mr={4}
        mt={4}
        boxShadow="base"
        w="auto"
        h="auto"
      >
        <IconButton
          aria-label="Add a task list"
          icon={<AddIcon />}
          onClick={onAddTaskList}
        />
      </Box>
    </Tooltip>
  );
};

TaskListAdd.propTypes = {
  onAddTaskList: PropTypes.func.isRequired,
};

export default TaskListAdd;
