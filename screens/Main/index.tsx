import * as React from 'react';
import { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Root } from "native-base";

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import {
  IStoreState,
} from '../../types'

import {
  StyleProvider,
} from 'native-base';
import { StackNavigator, DrawerNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import {NativeRouter, Route, Switch} from 'react-router-native';

import Dashboard from '../../components/Dashboard';
import variables from '../../theme/variables/commonColor';
import getTheme from '../../theme/components';
import SideBar from '../SideBar'
import Home from '../Home'
import AssignTubes from '../AssignTubes';
import Login from '../Login';

import styles from './styles'


// Drawer.defaultProps.styles.mainOverlay.elevation = 0;

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    AssignTubes: {screen: AssignTubes},
    Login: {screen: Login},
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: (props:any) => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    AssignTubes: {screen: AssignTubes},
    Login: {screen: Login},
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

interface IProps {
}
class Main extends Component<IProps, any> {
  constructor(props:IProps) {
    super(props);
  }
  private drawer:any;

  closeDrawer = () => {
      this.drawer._root.close();
    }

  render() {
    return <View style={styles.container}>
    <AppNavigator />
    </View>
  }
}


const mapStateToProps = (state:IStoreState) => {
  return {

  }
};

const mapDispatchToProps = (dispatch :Dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
