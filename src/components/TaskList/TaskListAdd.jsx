import React from 'react';

import PropTypes from 'prop-types';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { addTaskListToBoard } from '../../actions/board.action';
import { addTaskList } from '../../actions/taskList.action';

import { getNewNextId } from '../../utils/functions';

const selectTaskLists = (state) => {
  return state.taskLists;
};

const TaskListAdd = (props) => {
  const { boardId } = props;

  const dispatch = useDispatch();

  const taskListsState = useSelector(
    (state) => selectTaskLists(state),
    shallowEqual
  );

  const onAddTaskList = () => {
    const nextId = getNewNextId(taskListsState);
    dispatch(addTaskList(`Tasks`));
    dispatch(addTaskListToBoard(boardId, nextId));
  };

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
  boardId: PropTypes.number.isRequired,
};

export default TaskListAdd;
