import * as React from 'react';
import { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import {
  IStoreState,
} from '../../types'

import {
  StyleProvider,
} from 'native-base';
import { StackNavigator, DrawerNavigator, createStackNavigator } from "react-navigation";
import {NativeRouter, Route, Switch} from 'react-router-native';

import Dashboard from '../../components/Dashboard';
import variables from '../../theme/variables/commonColor';
import getTheme from '../../theme/components';
import SideBar from '../SideBar'
import Home from '../Home'

import { Drawer } from 'native-base';
import { HIDE_DRAWER } from '../../actions';
import AssignTubes from '../AssignTubes';


Drawer.defaultProps.styles.mainOverlay.elevation = 0;

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
    return <View style={{width:'100%', height:'100%'}}>
    <Drawer
            ref={(ref:any) => { this.drawer = ref; }}
            content={<SideBar/>}
            onClose={() => this.closeDrawer()}
            open={this.props.drawerVisible}
      >
      <NativeRouter>
        <Switch>
          <Route exact={true} path='/' component={Home}/>
          {/* <Route path='/AssginTubes' component={AssignTubes}/> */}
        </Switch>
      </NativeRouter>
      </Drawer>
    </View>
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
