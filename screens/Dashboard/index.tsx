import * as React from "react";
import { ImageBackground, View, StatusBar, Platform } from "react-native";
import { Container, Button, H3, Text } from "native-base";
import {Link} from 'react-router-native';

import {IStoreState, IReactNavigatingProps} from '../../types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import styles from "./styles";

const launchscreenBg = require("../../assets/mib.jpg");
const launchscreenLogo = require("../../assets/title.png");

interface IProps extends IReactNavigatingProps {
  token: string,
  onPressStart: ()=>void,
}

class Home extends React.Component<IProps,any> {
  render() {
    return (
      <Container style={{ flex: 1, marginTop: Platform.OS === 'android' ? 25 : 0 }}>
        {/* <StatusBar barStyle="light-content" /> */}
        <Text>hello</Text>
      </Container>
    );
  }

}

const mapStateToProps = (state:IStoreState) => ({
  token: state.app.token,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
