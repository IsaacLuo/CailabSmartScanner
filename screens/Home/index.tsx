import * as React from "react";
import { ImageBackground, View, StatusBar } from "react-native";
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
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            <ImageBackground source={launchscreenLogo} style={styles.logo} />
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>The Scanner for lims system</H3>
            <View style={{ marginTop: 8 }} />
            <Text style={styles.version}>v0.1.1115 alpha</Text>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={()=> {
                if (this.props.token) {
                  console.log('token=', this.props.token);
                  this.props.navigation.openDrawer();
                } else {
                  this.props.navigation.navigate('Login');
                }
              }}
            >
              <Text>Lets Go!</Text>
            </Button>
          </View>
        </ImageBackground>
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
