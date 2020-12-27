import React from 'react';

import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';

const TaskListAdd = (props) => {
  const { onAddTaskList } = props;

  return (
    <Tooltip label="Add a new task list" openDelay={500}>
      <IconButton
        aria-label="Add a task list"
        icon={<AddIcon />}
        onClick={onAddTaskList}
      />
    </Tooltip>
  );
};

TaskListAdd.propTypes = {
  onAddTaskList: PropTypes.func.isRequired,
};

export default TaskListAdd;
