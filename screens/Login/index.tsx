import conf from '../../config'

import * as React from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import { Container, Button, H3, Text, Form, Item, Label, Input } from "native-base";
import {Link} from 'react-router-native';

import {IStoreState} from '../../types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import styles from "./styles";
import axios from 'axios';
import RNComponent from '../../components/RNComponent';

const launchscreenBg = require("../../assets/mib.jpg");
const launchscreenLogo = require("../../assets/title.png");

interface IProps {
  loggedin: boolean,
  onPressStart: ()=>void,
  submitUserBarcode: (barcode:string)=>void,
}
interface IState {
  userBarcode: string,
}

class Home extends RNComponent<IProps,IState> {
  private inputRef:any = undefined;

  constructor(props:IProps) {
    super(props);
    this.state = {
      userBarcode: '',
    }
  }
  public componentDidMount() {
    // console.debug('mount will focus');
    // this.inputRef._root.focus();
  }
  public componentWillUnmount() {
    // this.inputRef._root.blur();
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
              <Input
                onChangeText={(userBarcode) => this.setState({userBarcode})}
                value={this.state.userBarcode}
                autoFocus={true}
                blurOnSubmit={false}
                autoCapitalize={'none'}
                ref = {(ref)=> {
                  this.inputRef = ref}}
                onSubmitEditing={()=>{
                  this.props.submitUserBarcode(this.state.userBarcode);
                  // console.debug('submitEditing')
                  // this.inputRef._root.blur(); 
                  this.setState({
                    userBarcode:'',
                  });
                  // this.inputRef._root.focus();
                  // }
                }}
                onEndEditing = {
                  (x:any)=>{
                    // console.debug('onEndEditing', x, this.state.userBarcode, this.props.loggedin);
                    if (!this.props.loggedin) {
                      // console.debug('focus again');
                      console.debug('mount will focus');
                      this.inputRef._root.focus();
                    }
                  }
                }/>
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

  protected onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  }

}

const mapStateToProps = (state:IStoreState) => ({
  loggedin: state.app.token !== '',
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  submitUserBarcode: (barcode:string) => dispatch({type:'SUBMIT_USER_BARCODE', data:barcode}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
