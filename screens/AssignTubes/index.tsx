// types
import { IStoreState, IReactNavigatingProps } from '../../types';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as React from 'react';
import { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content,
  Text,
  Card,
  CardItem,
  Form,
  Picker,
} from "native-base";
import styles from "./style";


const drawerCover = require("../../assets/sidbar-title.jpg");
const drawerImage = require("../../assets/title.png");
const datas = [
  {
    name: "Assgin Tubes",
    route: "/assignTubes",
    icon: "navigate",
    bg: "#BE6F50"
  },
];

interface IProps extends IReactNavigatingProps {
  selectedBasket:any,
  dispatchGetMyBaskets: ()=>void,
}
interface IState {
  loading: boolean,
  selected: string,
}

class AssignTubes extends Component<IProps,IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      loading: true,
      selected: 'key0',
    };
    this.props.dispatchGetMyBaskets();
  }

  render() {
    return(
    <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.props.navigation.openDrawer}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
    <Content>
            <Picker
              note={false}
              mode="dropdown"
              style={{ width: '100%' }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Wallet" value="key0" />
              <Picker.Item label="ATM Card" value="key1" />
              <Picker.Item label="Debit Card" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
          
      <Card>
        <CardItem>
          <Icon active name="logo-googleplus" />
          <Text>Google Plus</Text>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
         </CardItem>
       </Card>
    </Content>
  </Container>
    )}

    private onValueChange = (value:string) => {
      this.setState({selected:value});
    }
}

const mapStateToProps = (state:IStoreState) => ({
  token: state.app.token,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  dispatchGetMyBaskets: ()=>dispatch({type:'GET_MY_PICKLIST'})
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignTubes);
