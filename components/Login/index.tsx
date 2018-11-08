import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

interface IProps {
  message: string,
  setRandomMessage: ()=>void,
}
class Login extends Component<IProps, any> {
  constructor(props:IProps) {
    super(props);
    this.props.setRandomMessage();
  }
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Text>hello world {this.props.message}</Text>
        </View>
      </Container>
    );
  }
}


const mapStateToProps = (state:IStoreState) => {
  const { message } = state.app;
  return { message }
};

const mapDispatchToProps = (dispatch :Dispatch) => ({
  setRandomMessage: () => dispatch({type:'SET_APP_MESSAGE',data:Math.random().toString(36).substr(2)}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
