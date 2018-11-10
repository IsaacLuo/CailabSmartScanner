
import * as React from 'react';
import { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Root } from "native-base";

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import {
  StyleProvider,
} from 'native-base';
import { StackNavigator, DrawerNavigator, createDrawerNavigator, createStackNavigator } from "react-navigation";
import {NativeRouter, Route, Switch} from 'react-router-native';

import Home from './screens/Home'
import AssignTubes from './screens/AssignTubes';
import Login from './screens/Login';
import SideBar from './screens/SideBar';
import Dashboard from './screens/Dashboard';


const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    AssignTubes: {screen: AssignTubes},
    Login: {screen: Login},
    Dashboard: {screen: Dashboard},
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
    Home: { screen: Home },
    Drawer: { screen: Drawer },
    AssignTubes: {screen: AssignTubes},
    Login: {screen: Login},
    Dashboard: {screen: Dashboard},
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default AppNavigator;