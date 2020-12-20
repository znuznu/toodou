import React from 'react';

import { EditIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const TaskAdd = () => {
  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      mb={3}
      _hover={{ bg: 'gray.50' }}
    >
      {/* TODO: update Icon */}
      <EditIcon
        mb={3}
        aria-label="Edit the task"
        cursor="pointer"
        color="gray.400"
        _hover={{ color: 'gray.800' }}
      />
    </Box>
  );
};

export default TaskAdd;
