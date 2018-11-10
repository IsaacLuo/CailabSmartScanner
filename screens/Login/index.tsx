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
  submitUserBarcode: (barcode:string)=>void,
}
interface IState {
  userBarcode: string,
}

class Home extends React.Component<IProps,IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      userBarcode: '',
    }
  }
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.userBarcodeContainer}>
          <Form>
            <Item inlineLabel>
              <Label>User Barcode</Label>
              <Input onChangeText={(userBarcode) => this.setState({userBarcode})}
                value={this.state.userBarcode}
                autoFocus={true}
                onSubmitEditing={()=>{this.props.submitUserBarcode(this.state.userBarcode)}}
                />
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
  submitUserBarcode: (barcode:string) => dispatch({type:'SUBMIT_USER_BARCODE', data:barcode}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
