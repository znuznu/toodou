import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ChakraProvider } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';

import theme from './style/theme';

import Boards from './components/Boards/Boards';
import Header from './components/Header/Header';

import { store, persistor } from './store/store';

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Flex flexDir="column" h="100%">
            <Header title="Toodou." />
            <Boards />
          </Flex>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
