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

import Dashboard from '../../components/Dashboard';
import variables from '../../theme/variables/commonColor';
import getTheme from '../../theme/components';
import SideBar from '../SideBar'
import Home from '../Home'
import AssignTubes from '../AssignTubes';
import Login from '../Login';

import styles from './styles'


// Drawer.defaultProps.styles.mainOverlay.elevation = 0;

import AppNavigator from '../../navigator'

interface IProps {
}
class Main extends Component<IProps, any> {
  constructor(props:IProps) {
    super(props);
  }

  render() {
    return <View style={styles.container}>
    <AppNavigator />
    </View>
  }
}


const mapStateToProps = (state:IStoreState) => ({
  state: state.nav,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
