import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const TaskListAdd = () => {
  return (
    <Box
      borderWidth="1px"
      overflow="hidden"
      borderRadius="lg"
      p={3}
      mr={4}
      mt={4}
      boxShadow="base"
    >
      <IconButton aria-label="Delete the task" icon={<AddIcon />} />
    </Box>
  );
};

export default TaskListAdd;
