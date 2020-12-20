import React from 'react';

import { Flex, Box } from '@chakra-ui/react';

import TaskList from '../TaskList/TaskList';
import TaskListAdd from '../TaskList/TaskListAdd';

const Panel = () => {
  const placeholderList = [
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti',
    'At vero eos et accusamus et iusto odio dignissimos ',
    'end something',
    'At vero eos et accusamus et iusto ',
    'At vero eos et accusamus etiis praesentium voluptatum',
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum',
  ];

  return (
    <>
      <Box mx={6}>
        <Flex flexDir="horizontal" wrap="wrap">
          <TaskList title={'Todo.'} tasks={placeholderList}></TaskList>
          <TaskList title={'Doing...'} tasks={placeholderList}></TaskList>
          <TaskList title={'Done!'} tasks={placeholderList}></TaskList>
          <TaskList title={'Thinking.'} tasks={placeholderList}></TaskList>
          <TaskListAdd></TaskListAdd>
        </Flex>
      </Box>
    </>
  );
};

export default Panel;
