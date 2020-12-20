import React from 'react';

import PropTypes from 'prop-types';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Heading, IconButton, Flex, Box } from '@chakra-ui/react';

import Task from '../Task/Task';

const TaskList = (props) => {
  const { title, tasks } = props;

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
          <div>
            <IconButton aria-label="Edit the list" mr="2" icon={<EditIcon />} />
            <IconButton aria-label="Delete the task" icon={<DeleteIcon />} />
          </div>
        </Flex>
        {tasks.map((content, index) => (
          <Task key={`${title}-${index}`} content={content}></Task>
        ))}
      </Box>
    </>
  );
};

TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
};

export default TaskList;
