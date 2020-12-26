import React, { useState } from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
  ArrowBackIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { Box, Flex, Textarea, Text, SkeletonText } from '@chakra-ui/react';

import { updateTaskContent, deleteTasks } from '../../actions/task.action';
import { deleteTasksOfTaskList } from '../../actions/taskList.action';

import PropTypes from 'prop-types';

const selectTaskFromId = (state, id) => {
  return state.tasks[id];
};

const Task = (props) => {
  const { id, taskListId } = props;

  const [editMode, setEditMode] = useState({ content: false });
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const task = useSelector(
    (state) => selectTaskFromId(state, id),
    shallowEqual
  );

  const onContentChange = (event) => {
    setContent(event.target.value);
  };

  const toggleEditContent = () => {
    setEditMode({ ...editMode, content: !editMode.content });
  };

  const onDelete = () => {
    dispatch(deleteTasksOfTaskList(taskListId, [id]));
    dispatch(deleteTasks([id]));
  };

  const onSaveContent = () => {
    dispatch(updateTaskContent(id, content));
    toggleEditContent();
  };

  const TaskRender = () => {
    return (
      <Flex justifyContent="space-between">
        <Text>{task.content}</Text>
        <Flex flexDir="column">
          <EditIcon
            mb={3}
            aria-label="Edit the task"
            cursor="pointer"
            color="gray.400"
            _hover={{ color: 'gray.800' }}
            onClick={toggleEditContent}
          />
          <DeleteIcon
            aria-label="Delete the task"
            cursor="pointer"
            color="gray.400"
            _hover={{ color: 'gray.800' }}
            onClick={onDelete}
          />
        </Flex>
      </Flex>
    );
  };

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      mb={3}
      _hover={{ bg: 'gray.50' }}
    >
      {task ? (
        editMode.content ? (
          <Flex justifyContent="space-between">
            <Textarea
              placeholder={task.content}
              value={content}
              onChange={onContentChange}
              autoFocus
            />
            <Flex flexDir="column" ml="3">
              <CheckIcon
                mb={3}
                aria-label="Save the task"
                cursor="pointer"
                color="gray.400"
                _hover={{ color: 'gray.800' }}
                onClick={onSaveContent}
              />
              <ArrowBackIcon
                aria-label="Undo editing"
                cursor="pointer"
                color="gray.400"
                _hover={{ color: 'gray.800' }}
                onClick={toggleEditContent}
              />
            </Flex>
          </Flex>
        ) : (
          <TaskRender />
        )
      ) : (
        <SkeletonText />
      )}
    </Box>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  taskListId: PropTypes.number.isRequired,
};

export default Task;
