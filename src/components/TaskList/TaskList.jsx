import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Heading, IconButton, Flex, Box } from '@chakra-ui/react';

import Task from '../Task/Task';

import {
  addTaskList,
  updateTaskListTitle,
  deleteTaskList,
} from '../../actions/taskList.action';

const TaskList = (props) => {
  const { boardId } = props;

  const [title, setTitle] = useState('This is a title');

  return (
    <>
      <Box
        maxW="sm"
        borderWidth="1px"
        overflow="hidden"
        borderRadius="lg"
        px="3"
        pt="3"
        mr="4"
        mt="4"
        boxShadow="base"
      >
        <Flex justifyContent="space-between">
          <Heading as="h1" size="lg" mb="3">
            {title}
          </Heading>
          <Box ml={2}>
            <IconButton aria-label="Edit the list" mr="2" icon={<EditIcon />} />
            <IconButton aria-label="Delete the task" icon={<DeleteIcon />} />
          </Box>
        </Flex>
        {/* {taskLists.map((content, index) => (
          <Task key={`${title}-${index}`}></Task>
        ))} */}
      </Box>
    </>
  );
};

TaskList.propTypes = {
  boardId: PropTypes.number.isRequired,
};

export default TaskList;
