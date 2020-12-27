import React from 'react';

import PropTypes from 'prop-types';

import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const TaskAdd = (props) => {
  const { onAddTask } = props;

  const color = useColorModeValue('gray.400', '#51555e');
  const bgHover = useColorModeValue('gray.100', '#2C323D');
  const colorHover = useColorModeValue('gray.800', '#F0F0F1');

  return (
    <Box
      boxShadow="base"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      mb={3}
      color={color}
      _hover={{ bg: bgHover, color: colorHover }}
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
