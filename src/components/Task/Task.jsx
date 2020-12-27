import React, { useState } from 'react';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { CloseIcon, CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Textarea,
  Text,
  Tooltip,
  SkeletonText,
} from '@chakra-ui/react';

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
        <Flex flexDir="column" ml="3">
          <Tooltip label="Edit the task" openDelay={500}>
            <EditIcon
              mb={3}
              aria-label="Edit the task"
              cursor="pointer"
              color="gray.400"
              _hover={{ color: 'gray.800' }}
              onClick={toggleEditContent}
            />
          </Tooltip>
          <Tooltip label="Delete the task" openDelay={500}>
            <DeleteIcon
              aria-label="Delete the task"
              cursor="pointer"
              color="gray.400"
              _hover={{ color: 'gray.800' }}
              onClick={onDelete}
            />
          </Tooltip>
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
              focusBorderColor="gray.800"
            />
            <Flex flexDir="column" ml="3">
              <Tooltip label="Save the task" openDelay={500}>
                <CheckIcon
                  mb={3}
                  aria-label="Save the task"
                  cursor="pointer"
                  color="gray.400"
                  _hover={{ color: 'gray.800' }}
                  onClick={onSaveContent}
                />
              </Tooltip>
              <Tooltip label="Undo edit" openDelay={500}>
                <CloseIcon
                  aria-label="Undo edit"
                  cursor="pointer"
                  color="gray.400"
                  _hover={{ color: 'gray.800' }}
                  onClick={toggleEditContent}
                  boxSize={3}
                />
              </Tooltip>
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
