import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';

import Panel from './components/Panel/Panel';
import Title from './components/Title/Title';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Title content="Toodou."></Title>
      <Panel></Panel>
    </ChakraProvider>
  );
}

export default App;
