// types
import { IStoreState, IReactNavigatingProps, IBasket, IPart, IContainer } from '../../types';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import * as React from 'react';
import { Component } from "react";
import { Image, Platform, StyleSheet } from "react-native";
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
  Spinner,
  View,
  Item,
} from "native-base";
// import { GET_MY_PICKLISTS } from '../../reducers/basket/actions';
import { SET_CURRENT_PICKLIST, GET_MY_PICKLISTS } from './actions';

import style from './style'
import RNComponent from '../../components/RNComponent';
import DrawerBaseComponent from '../../components/DrawerBaseComponent';


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
  pickLists: IBasket[],
  defaultPickListId: string,
  loadingPicklists: boolean,
  loadingParts: boolean,
  parts: IPart[],
  dispatchGetMyBaskets: ()=>void,
  dispatchSetCurrentBasket: (id:string)=>void,
}
interface IState {
  selected: string,
}

class AssignTubes extends DrawerBaseComponent<IProps,IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      selected: props.defaultPickListId,
    };
    this.props.dispatchGetMyBaskets();
  }

  render() {
    const pickerItems = this.props.pickLists.map(item => <Picker.Item
      label={item.name}
      value={item._id}
      key={item._id}
    />)
    console.log('rendering parts', this.props.parts);
    const partsList = this.props.parts.map((part:IPart) => 
    <Card key={part._id}>
      <CardItem header>
        <Left>
          <Icon name="md-add" />
        </Left>
        <Body>
          <Text>{part.personalName}</Text>
        </Body>
        <Right>
          <Icon name="ios-barcode" />
        </Right>
      </CardItem>
      <CardItem>
        <Body>
          {part.containers 
          ? part.containers.map((container:IContainer)=>
            <View key={container._id} style={{width:'100%', marginBottom:20}}>
              <Item>
                <Icon type="Entypo" name="triangle-right" />
                <Text>
                  {container.barcode}
                </Text>
              </Item>
              { container.parentContainer? 
                <Item>
                  <Text>
                      rack:{container.parentContainer.barcode} well:{container.wellName}
                  </Text>
                </Item>
                : undefined
              }

              { container.currentStatus? 
                <Item>
                  <Text>
                      status: {container.currentStatus}
                  </Text>
                </Item>
                : undefined
              }
              <Item>
                <Text>
                {
                  container.location
                  ? `location: ${container.location.barcode}:${container.location.description}`
                  : 'unknown location'
                }
                </Text>
              </Item>
            </View>
          )
          :<Text>no containers</Text>}
        </Body>
        </CardItem>
      </Card>
    )

    return(
    <Container>
      <Header style={style.header}>
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
      {this.props.loadingPicklists ? 
      <Content>
        <Spinner/>
      </Content>
      :    
      <Content>
        <Picker
          note={false}
          mode="dropdown"
          style={{ width: '100%' }}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange.bind(this)}
        >
          {pickerItems}
        </Picker>
        {this.props.loadingParts ? <Spinner/> : partsList}
        {!this.props.loadingParts && partsList.length === 0 && 
        <Text>basket is empty</Text>
        }
      </Content>
      }
    </Container>
    )}

  private onValueChange = (value:string) => {
    this.setState({selected:value});
    this.props.dispatchSetCurrentBasket(value);
  }
  protected onBackButtonPressAndroid () {
    console.log(this.props);
    // this.props.navigation.goBack();
    return true;
  }
}



const mapStateToProps = (state:IStoreState) => ({
  token: state.app.token,
  pickLists: state.basket.pickLists,
  defaultPickListId: state.basket.defaultPickListId,
  loadingPicklists: state.basket.loadingGetMyPicklists,
  loadingParts: state.assignTubes.loadingParts,
  parts: state.partLocation.parts,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  dispatchGetMyBaskets: ()=>dispatch({type:GET_MY_PICKLISTS}),
  dispatchSetCurrentBasket: (id:string)=>dispatch({type:SET_CURRENT_PICKLIST, data:id}),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignTubes);
