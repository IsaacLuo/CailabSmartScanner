
// types
import {
  IStoreState,
  IReactNavigatingProps,
} from '../../types';
  
// react
import * as React from 'react';
import { Component } from "react";
import { Image } from "react-native";

// redux
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

// components
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  Button,
} from "native-base";

// page essentials
// import styles from "./style";
import { LOGOUT } from '../../reducers/app/actions';
import RNComponent from '../../components/RNComponent';

interface IProps extends IReactNavigatingProps {
  // partId:string,
}

class PartDetail extends RNComponent<IProps,any> {
  constructor(props:IProps) {
    super(props);
  }

  render() {
    return <Container>
        <Content
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Button
              style={{ backgroundColor: "#333333", alignSelf: "center", marginTop: 10}}
              onPress={()=> {
                this.props.navigation.navigate('Home');
              }}
            >
              <Text>logout</Text>
            </Button> 
            <Text>{this.props.navigation.state.params.partId}</Text>
        </Content>
      </Container>
  }
}
const mapStateToProps = (state:IStoreState) => ({
  // username: state.app.username,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  // logout: ()=>dispatch({type:LOGOUT}),
})
export default connect(mapStateToProps, mapDispatchToProps)(PartDetail);

