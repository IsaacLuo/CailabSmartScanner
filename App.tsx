import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import {createStore, applyMiddleware, compose} from 'redux'
import saga from './saga'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'remote-redux-devtools';
import Dashboard from './components/Dashboard'

/* eslint-disable no-underscore-dangle */
// Development mode with Redux DevTools support enabled.
const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     rootReducer,
//     composeEnhancers(applyMiddleware(sagaMiddleware)),
//   );


// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware)),
// );

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
/* eslint-enable */
sagaMiddleware.run(saga);


export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <View style={styles.container}>
          <Dashboard/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
