import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ChakraProvider } from '@chakra-ui/react';

import theme from './style/theme';

import Header from './components/Header/Header';

import Home from './pages/Home';
import About from './pages/About';

import { store, persistor } from './store/store';

function App() {
  return (
    <Router>
      <Switch>
        <ChakraProvider theme={theme}>
          <Header title="Toodou." />

          <Route path={'/about'}>
            <About />
          </Route>

          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Route exact path={'/'}>
                <Home />
              </Route>
            </PersistGate>
          </ReduxProvider>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </ChakraProvider>
      </Switch>
    </Router>
  );
}

export default App;
