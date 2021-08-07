import React from 'react';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip, useColorModeValue } from '@chakra-ui/react';
import {} from '@chakra-ui/react';

import { addTaskToTaskList } from '../../actions/taskList.action';
import { addTask } from '../../actions/task.action';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getNewNextId } from '../../helpers/functions';

const selectNextTaskId = (state) => {
  return getNewNextId(state.tasks);
};

const TaskAdd = (props) => {
  const { taskListId, setNewTaskId } = props;

  const dispatch = useDispatch();

  const lastTaskId = useSelector(
    (state) => selectNextTaskId(state),
    shallowEqual
  );

  const { t } = useTranslation();

  const onAddTask = () => {
    dispatch(addTask());
    dispatch(addTaskToTaskList(taskListId, lastTaskId));
    setNewTaskId(lastTaskId);
  };

  return (
    <IconButton
      m="0 auto"
      aria-label={t('task.add-button')}
      display="flex"
      w="100%"
      onClick={onAddTask}
      icon={
        <Tooltip label={t('task.add-button')} openDelay={500}>
          <AddIcon />
        </Tooltip>
      }
    />
  );
};

TaskAdd.propTypes = {
  taskListId: PropTypes.number.isRequired,
  setNewTaskId: PropTypes.func.isRequired,
};

export default TaskAdd;
