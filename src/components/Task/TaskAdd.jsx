import React from 'react';

import PropTypes from 'prop-types';

import { EditIcon, AddIcon } from '@chakra-ui/icons';
import { Box, IconButton, Flex, Text } from '@chakra-ui/react';

const TaskAdd = (props) => {
  const { onAddTask } = props;

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      mb={3}
      color="gray.500"
      _hover={{ bg: 'gray.100', color: 'gray.800' }}
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
  onAddTask: PropTypes.func.isRequired,
};

export default TaskAdd;
