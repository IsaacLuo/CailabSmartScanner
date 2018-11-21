import * as React from "react";
import { ImageBackground, View, StatusBar, Platform } from "react-native";
import { Container, Button, H3, Text, Input } from "native-base";
import {Link} from 'react-router-native';

import {IStoreState, IReactNavigatingProps} from '../types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'



import RNComponent from "../components/RNComponent";

interface IProps extends IReactNavigatingProps {
  token: string,
  onPressStart: ()=>void,
}

class MultiInputTest extends RNComponent<IProps,any> {
  render() {
    return (
      <Container style={{ flex: 1, marginTop: Platform.OS === 'android' ? 25 : 0 }}>
        {/* <StatusBar barStyle="light-content" /> */}
        <Text>hello</Text>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
        <Input/>

      </Container>
    );
  }

}

const mapStateToProps = (state:IStoreState) => ({
  token: state.app.token,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MultiInputTest);
