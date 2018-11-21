
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
import styles from "./style";
import { LOGOUT } from '../../reducers/app/actions';

const drawerCover = require("../../assets/sidbar-title.jpg");
const drawerImage = require("../../assets/title.png");
const datas = [
  {
    name: "Home",
    routeName: "Home",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Assgin Tubes",
    routeName: "AssignTubes",
    icon: "navigate",
    bg: "#BE6F50"
  },
  {
    name: "Test1",
    routeName: "Test1",
    icon: "navigate",
    bg: "#BE6F50"
  },
];

interface IProps extends IReactNavigatingProps {
  username: string,
  logout:()=>void,
}

class SideBar extends Component<IProps,any> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return <Container>
        <Content
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Image source={drawerCover} style={styles.drawerCover} />
          <Image square style={styles.drawerImage} source={drawerImage} />
          <Text>{this.props.username}</Text>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => {this.props.navigation.navigate(data.routeName)}}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
              </ListItem>
              }
          />
          <Button
              style={{ backgroundColor: "#333333", alignSelf: "center", marginTop: 10}}
              onPress={()=> {
                this.props.logout();
                this.props.navigation.navigate('Home');
              }}
            >
              <Text>logout</Text>
            </Button> 
        </Content>
      </Container>
  }
}
const mapStateToProps = (state:IStoreState) => ({
  username: state.app.username,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  logout: ()=>dispatch({type:LOGOUT}),
})
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

