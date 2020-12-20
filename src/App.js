import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';

import { ChakraProvider, theme } from '@chakra-ui/react';

import Panel from './components/Panel/Panel';
import Header from './components/Header/Header';

import store from './redux/store/store';

function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Header title="Toodou."></Header>
        <Panel></Panel>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default App;
