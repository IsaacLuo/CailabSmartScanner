import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Provider } from 'react-redux';
import rootReducer from './rootReducer';
import {createStore, applyMiddleware, compose} from 'redux'
import saga from './saga'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'remote-redux-devtools';
import Main from './screens/Main'
import Login from './components/Login'



import { NativeRouter} from "react-router-native";
import Route from './components/Route'


const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);

interface IProps {

}
interface IState {
  loading: boolean,
}
export default class App extends Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  public async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({loading:false});
  }

  public render() {
    if(this.state.loading) {
      return <Expo.AppLoading />
    }
    return (
      
      <Provider store={ store }>
        <Main/>
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
