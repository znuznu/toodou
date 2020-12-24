import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';

import { ChakraProvider, theme } from '@chakra-ui/react';

import BoardList from './components/BoardList/BoardList';
import Header from './components/Header/Header';

import store from './store/store';

function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Header title="Toodou."></Header>
        <BoardList></BoardList>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default App;
