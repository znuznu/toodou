import React from 'react';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { addTaskListToBoard } from '../../actions/board.action';
import { addTaskList } from '../../actions/taskList.action';

import { getNewNextId } from '../../helpers/functions';

const selectTaskLists = (state) => {
  return state.taskLists;
};

const TaskListAdd = (props) => {
  const { boardId, setNewTaskListId } = props;

  const dispatch = useDispatch();

  const taskListsState = useSelector(
    (state) => selectTaskLists(state),
    shallowEqual
  );

  const { t } = useTranslation();

  const onAddTaskList = () => {
    const nextId = getNewNextId(taskListsState);
    dispatch(addTaskList('Title'));
    dispatch(addTaskListToBoard(boardId, nextId));
    setNewTaskListId(nextId);
  };

  return (
    <IconButton
      aria-label={t('tasklist.tooltip.add')}
      icon={
        <Tooltip label={t('tasklist.tooltip.add')} openDelay={500}>
          <AddIcon />
        </Tooltip>
      }
      onClick={onAddTaskList}
    />
  );
};

TaskListAdd.propTypes = {
  boardId: PropTypes.number.isRequired,
  setNewTaskListId: PropTypes.func.isRequired,
};

export default TaskListAdd;
