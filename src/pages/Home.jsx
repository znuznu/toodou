import React from 'react';

import { Flex } from '@chakra-ui/react';

import Boards from '../components/Boards/Boards';

const Home = () => {
  return (
    <Flex flexDir="column" h="100%">
      <Boards />
    </Flex>
  );
};

export default Home;
