import * as React from 'react';
import { Component } from "react";
import { Image } from "react-native";

import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
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

interface IProps {

}

class AssignTubes extends Component<IProps,any> {
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
        </Content>
      </Container>
  }
}

export default AssignTubes;
