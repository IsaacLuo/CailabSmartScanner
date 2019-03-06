import * as React from "react";
import * as ReactNative from "react-native";
import { ImageBackground, View, StatusBar, Platform, Animated, Keyboard, TextInput, StyleSheet } from "react-native";
import { Container, Button, H3, Text, Input } from "native-base";
import {Link} from 'react-router-native';

import {IStoreState, IReactNavigatingProps} from '../types'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'



import RNComponent from "../components/RNComponent";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


interface IProps extends IReactNavigatingProps {
  token: string,
  onPressStart: ()=>void,
}

class MultiInputTest extends RNComponent<IProps,any> {
  private keyboardShowListener:any;
  private keyboardHideListener:any;
  private view:any;
state = {
    keyboardHeight: new Animated.Value(0)
  };

  animateKeyboardHeight = (toValue:any, duration:any) => {
    Animated.timing(
      this.state.keyboardHeight,
      {toValue, duration},
    ).start();
  };

  /**
   * From https://facebook.github.io/react-native/docs/keyboard.html#addlistener
   * "Note that if you set android:windowSoftInputMode to adjustResize or adjustNothing,
   * only keyboardDidShow and keyboardDidHide events will available on Android."
   */
  componentWillMount() {
    if (Platform.OS === "android") {
      this.keyboardShowListener = Keyboard.addListener("keyboardDidShow", ({endCoordinates}) => {
        this.animateKeyboardHeight(endCoordinates.height, 0)
      });
      this.keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
        this.animateKeyboardHeight(0, 300)
      })
    }
  }

  scrollToInput = (reactNode:any) => {
    this.view.scrollToFocusedInput(reactNode)
  };

  handleOnFocus = (e:any) => {
    if (Platform.OS === "android") {
      this.scrollToInput(ReactNative.findNodeHandle(e.target))
    }
  };

  render() {
    const spacer = (
      <View style={styles.spacer}>
        <Text style={styles.text} numberOfLines={24}>
          {"All work and no play makes Jack a dull boy. ".repeat(30)}
        </Text>
        <Text style={styles.text} numberOfLines={24}>
          {"All work and no play makes Jack a dull boy. ".repeat(30)}
        </Text>
        <Text style={styles.text} numberOfLines={24}>
          {"All work and no play makes Jack a dull boy. ".repeat(30)}
        </Text>
      </View>
    );
    return (
      <KeyboardAwareScrollView
        ref={ref => this.view = ref}
        style={styles.container}
        enableOnAndroid
        extraHeight={Platform.OS === "android" ? 10 : undefined}
      >
        {spacer}
        <TextInput
          onFocus={this.handleOnFocus}
          style={styles.input}
        />
        {/*{spacer}*/}
        <Animated.View style={{height: this.state.keyboardHeight}}/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  spacer: {
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Platform.OS === "android" ? "monospace" : "Courier",
  },
  input: {
    borderColor: "grey",
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
  }
});


const mapStateToProps = (state:IStoreState) => ({
  token: state.app.token,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(MultiInputTest);
