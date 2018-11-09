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

// import { Drawer } from 'native-base';
import { HIDE_DRAWER } from '../../actions';
import AssignTubes from '../AssignTubes';


// Drawer.defaultProps.styles.mainOverlay.elevation = 0;

const Drawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    // AssignTubes: {screen: Home},
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
    // AssignTubes: { screen: Home },
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

interface IProps {
  path: string,
  drawerVisible: boolean,
  hideDrawer: () => void,
}
class Main extends Component<IProps, any> {
  constructor(props:IProps) {
    super(props);
  }
  private drawer:any;

  closeDrawer = () => {
      this.drawer._root.close();
      this.props.hideDrawer();
    }

  render() {
    return <Root>
    {/* <Drawer
            ref={(ref:any) => { this.drawer = ref; }}
            content={<SideBar/>}
            onClose={() => this.closeDrawer()}
            open={this.props.drawerVisible}
      >
      </Drawer> */}
    <AppNavigator />
    </Root>
  }
}


const mapStateToProps = (state:IStoreState) => {
  return {
    path: state.route.path,
    drawerVisible: state.app.drawerVisible,
  }
};

const mapDispatchToProps = (dispatch :Dispatch) => ({
  hideDrawer: ()=>dispatch({type:HIDE_DRAWER})
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
