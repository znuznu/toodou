import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { CloseIcon, CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import {
  Box,
  Flex,
  Textarea,
  Text,
  Tooltip,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react';

import { updateTaskContent, deleteTasks } from '../../actions/task.action';
import { deleteTasksOfTaskList } from '../../actions/taskList.action';

import PropTypes from 'prop-types';

const selectTaskFromId = (state, id) => {
  return state.tasks[id];
};

const Task = (props) => {
  const { id, taskListId, isDragged, isNew } = props;

  const [editMode, setEditMode] = useState({ content: isNew });
  const [content, setContent] = useState('');

  const bg = useColorModeValue('white', 'sith.800');
  const bgDragged = useColorModeValue('#eeeafe', 'sith.700');
  const colorBtn = useColorModeValue('gray.400', '#6d6d6d');
  const colorBtnHover = useColorModeValue('sith.900', '#F0F0F1');

  const dispatch = useDispatch();

  const task = useSelector(
    (state) => selectTaskFromId(state, id),
    shallowEqual
  );

  const { t } = useTranslation();

  useEffect(() => {
    if (task) {
      setContent(task.content);
    }
  }, [task]);

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

  const Preview = () => {
    return (
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">{task.content}</Text>
        <Flex flexDir="column" ml="3">
          <Tooltip label={t('task.tooltip.edit')} openDelay={500}>
            <EditIcon
              mb={3}
              aria-label={t('task.tooltip.edit')}
              cursor="pointer"
              color={colorBtn}
              _hover={{ color: colorBtnHover }}
              onClick={toggleEditContent}
            />
          </Tooltip>
          <Tooltip label={t('task.tooltip.delete')} openDelay={500}>
            <DeleteIcon
              aria-label={t('task.tooltip.delete')}
              cursor="pointer"
              color={colorBtn}
              _hover={{ color: colorBtnHover }}
              onClick={onDelete}
            />
          </Tooltip>
        </Flex>
      </Flex>
    );
  };

  return (
    <Box
      // boxShadow="0 1px 8px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      mb={3}
      bg={isDragged ? bgDragged : bg}
    >
      {task ? (
        editMode.content ? (
          <Flex justifyContent="space-between">
            <Textarea
              fontWeight="bold"
              placeholder={t('task.placeholder.content')}
              value={content}
              onChange={onContentChange}
              autoFocus
              focusBorderColor="gray.700"
              onKeyPress={(e) => e.key === 'Enter' && onSaveContent()}
            />
            <Flex flexDir="column" ml="3">
              <Tooltip label={t('task.tooltip.save')} openDelay={500}>
                <CheckIcon
                  mb={3}
                  aria-label={t('task.tooltip.save')}
                  cursor="pointer"
                  color={colorBtn}
                  _hover={{ color: colorBtnHover }}
                  onClick={onSaveContent}
                />
              </Tooltip>
              <Tooltip label={t('task.tooltip.undo-editing')} openDelay={500}>
                <CloseIcon
                  aria-label={t('task.tooltip.undo-editing')}
                  cursor="pointer"
                  color={colorBtn}
                  _hover={{ color: colorBtnHover }}
                  onClick={toggleEditContent}
                  boxSize={3}
                />
              </Tooltip>
            </Flex>
          </Flex>
        ) : (
          <Preview />
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
  isDragged: PropTypes.bool.isRequired,
  isNew: PropTypes.bool.isRequired,
};

export default Task;
