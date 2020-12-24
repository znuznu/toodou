import React from 'react';

import { EditIcon, AddIcon } from '@chakra-ui/icons';
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
      <IconButton aria-label="Add a task" icon={<AddIcon />} />
    </Box>
  );
};

export default TaskAdd;
