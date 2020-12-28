import React from 'react';

import PropTypes from 'prop-types';

import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import { addTaskToTaskList } from '../../actions/taskList.action';
import { addTask } from '../../actions/task.action';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { getNewNextId } from '../../utils/functions';

const selectNextTaskId = (state) => {
  return getNewNextId(state.tasks);
};

const TaskAdd = (props) => {
  const { taskListId, setNewTaskId } = props;

  const color = useColorModeValue('gray.400', '#51555e');
  const bgHover = useColorModeValue('gray.100', '#2C323D');
  const colorHover = useColorModeValue('gray.800', '#F0F0F1');

  const dispatch = useDispatch();

  const lastTaskId = useSelector(
    (state) => selectNextTaskId(state),
    shallowEqual
  );

  const onAddTask = () => {
    dispatch(addTask('A beautiful task'));
    dispatch(addTaskToTaskList(taskListId, lastTaskId));
    setNewTaskId(lastTaskId);
  };

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      mb={3}
      color={color}
      _hover={{ bg: bgHover, color: colorHover }}
      cursor="pointer"
      onClick={onAddTask}
    >
      <Flex>
        <AddIcon my="auto" />
        <Text my="auto" ml="2">
          Add a new task
        </Text>
      </Flex>
    </Box>
  );
};

TaskAdd.propTypes = {
  taskListId: PropTypes.number.isRequired,
  setNewTaskId: PropTypes.func.isRequired,
};

export default TaskAdd;
