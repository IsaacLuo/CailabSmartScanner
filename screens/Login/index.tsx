import * as React from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Form, Item, Label, Input } from "native-base";
import {Link} from 'react-router-native';

import {IStoreState} from '../../types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import styles from "./styles";

const launchscreenBg = require("../../assets/mib.jpg");
const launchscreenLogo = require("../../assets/title.png");

interface IProps {
  onPressStart: ()=>void,
}

class Home extends React.Component<any,any> {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.userBarcodeContainer}>
          <Form>
            <Item inlineLabel>
              <Label>User Barcode</Label>
              <Input />
            </Item>
          </Form>
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#999999", alignSelf: "center" }}
              onPress={()=> {
                this.props.navigation.navigate('Home');
              }}
            >
              <Text>Cancel</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }

}

const mapStateToProps = (state:IStoreState) => ({
});

const mapDispatchToProps = (dispatch :Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
