
// types
import { IStoreState } from './types';
import { NavigationContainer } from 'react-navigation';

// react
import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';

// redux
import rootReducer from './rootReducer';
import {createStore, applyMiddleware, compose} from 'redux'
import {composeWithDevTools} from 'remote-redux-devtools';
import { Provider, connect } from 'react-redux';

// redux-saga
import saga from './saga'
import createSagaMiddleware from 'redux-saga'

// navigation
import AppNavigator from './navigator';

// redux-navigation
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';


// middle wares: saga and nav
const sagaMiddleware = createSagaMiddleware();
const navMiddleware = createReactNavigationReduxMiddleware(
  "Home",
  (state:IStoreState) => state.nav,
);

const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, navMiddleware)));

sagaMiddleware.run(saga);

// navigation root component
const navigationComponent = reduxifyNavigator(AppNavigator, "Home");
const mapStateToProps = (state:IStoreState) => ({state:state.nav});
const AppWithNavigationState = connect(mapStateToProps)(navigationComponent);

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
        {/* <Main/> */}
        <AppWithNavigationState/>
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
