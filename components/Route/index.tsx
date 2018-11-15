import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import {
  IStoreState,
} from '../../types'

import { Container, Header,Content, Card, CardItem, Left, Body, Right, Button, Icon, Title, Drawer, SideBar} from 'native-base';
import Dashboard from '../Dashboard';

interface IProps {
  path: string,
}
class Route extends Component<IProps, any> {
  constructor(props:IProps) {
    super(props);
  }

  render() {
    const {path} = this.props;
    let children:JSX.Element|undefined;
    switch(path) {
      case '/':
        children = <Dashboard/>
    }
    return <View>
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
      // Main View
      </Drawer>
      {children ? children : undefined}
    </View>;
  }
}


const mapStateToProps = (state:IStoreState) => {
  return {
    path: state.route.path,
  }
};

const mapDispatchToProps = (dispatch :Dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Route);
