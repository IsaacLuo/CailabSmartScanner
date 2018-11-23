
import * as React from 'react';
import { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Root } from "native-base";

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import {
  StyleProvider,
} from 'native-base';
import {
createDrawerNavigator, 
createStackNavigator,
} from "react-navigation";
import {NativeRouter, Route, Switch} from 'react-router-native';

import Home from './screens/Home'
import AssignTubes from './screens/AssignTubes';
import Login from './screens/Login';
import SideBar from './screens/SideBar';
import MultiInputTest from './screens/MultiInputTest';
import WhereIsMyPart from './screens/WhereIsMyPart';
import WhatIsInFreezer from './screens/WhatIsInFreezer';
import PartDetail from './screens/PartDetail';

const Drawer = createDrawerNavigator(
  {
    // Home: { screen: AssignTubes },
    // Home: { screen: Home },
    AssignTubes: {screen: AssignTubes},
    WhereIsMyPart: {screen: WhereIsMyPart},
    WhatIsInFreezer: {screen: WhatIsInFreezer},
    // Login: {screen: Login},
    Dashboard: {
      screen: SideBar,
      navigationOptions: () => ({
        drawerLockMode: 'locked-closed'
      })
    },
    Test1: {screen:MultiInputTest},
  },
  {
    initialRouteName: "Dashboard",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: SideBar,
  }
);

const AppNavigator = createStackNavigator(
  {
    Drawer: { screen: Drawer },
    Home: { screen: Home },
    // AssignTubes: {screen: AssignTubes},
    // Dashboard: {screen: SideBar},
    Login: {screen: Login},
    PartDetail: {screen: PartDetail},

  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default AppNavigator;