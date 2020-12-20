import React from 'react';

import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Text, Flex } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const Task = (props) => {
  const { content } = props;

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      mb={3}
      _hover={{ bg: 'gray.50' }}
    >
      <Flex justifyContent="space-between">
        <Text>{content}</Text>
        <Flex flexDir="column">
          <EditIcon
            mb={3}
            aria-label="Edit the task"
            cursor="pointer"
            color="gray.400"
            _hover={{ color: 'gray.800' }}
          />
          <DeleteIcon
            aria-label="Delete the task"
            cursor="pointer"
            color="gray.400"
            _hover={{ color: 'gray.800' }}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

Task.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Task;
