// types
import {
  IStoreState,
  IReactNavigatingProps,
  IBasket,
  IPart
} from "../../types";

// react
import * as React from "react";
import { Keyboard, ImageBackground, KeyboardAvoidingView } from "react-native";
// redux
import { Dispatch } from "redux";
import { connect } from "react-redux";

// components,
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
  List,
  ListItem,
  Form,
  Picker,
  Spinner,
  Input,
  View
} from "native-base";
import { GET_MY_PICKLISTS } from "../../reducers/basket/actions";
import {
  SET_CURRENT_PICKLIST,
  APPEND_BARCODE_TO_PART,
  QUERY_APPEND_BARCODE_TO_PART
} from "./actions";

import style from "./style";
import DrawerBaseComponent from "../../components/DrawerBaseComponent";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface IProps extends IReactNavigatingProps {
  selectedBasket: any;
  pickLists: IBasket[];
  defaultPickListId: string;
  loadingPicklists: boolean;
  loadingParts: boolean;
  parts: IPart[];
  focusedPartIndex: number;
  dispatchGetMyBaskets: () => void;
  dispatchSetCurrentBasket: (id: string) => void;
  dispatchAssignBarcodeToPart: (partId: string, barcode: string) => void;
}
interface IState {
  selected: string;
}

const bgPicture = require("../../assets/lab.jpg");

class AssignTubes extends DrawerBaseComponent<IProps, IState> {
  private inputRef:any = undefined;
  constructor(props: IProps) {
    super(props);
    this.state = {
      selected: props.defaultPickListId
    };
    this.props.dispatchGetMyBaskets();
  }
  public componentDidMount() {
    // Keyboard.dismiss();
  }
  public componentDidUpdate() {
    if(this.inputRef) {
      // console.debug(this.inputRef._root);
      this.inputRef._root.focus();
      console.debug('set focus');
    }
    // Keyboard.dismiss();
  }

  public render() {
    const pickerItems = this.props.pickLists.map(item => (
      <Picker.Item label={item.name} value={item._id} key={item._id} />
    ));

    const partsList = this.props.parts.map((item: IPart, index: number) => (
      <List key={item._id} style={style.card}>
        <ListItem style={style.cardItem}>
          <Icon
            name="md-add"
            onPress={() => {
              console.debug(item.personalName);
              this.props.navigation.navigate("PartDetail", {
                partId: item._id,
                title: item.personalName
              });
            }}
          />
          <Text>{item.personalName}</Text>
          <View style={style.barcodeContainer}>
            {
              item.barcodes && item.barcodes.map(v=> <Text key={v}>{v}</Text>)
            }
            {this.props.focusedPartIndex === index && (
              <Input
                style={style.barcodeInput}
                autoFocus={true}
                autoCapitalize="none"
                // onChangeText={(userBarcode) => this.setState({userBarcode})}
                // value={this.state.userBarcode}
                ref = {(ref)=> {this.inputRef = ref}}
                onSubmitEditing={e => {
                  const barcode = e.nativeEvent.text;
                  console.debug("barcode=", barcode);
                  this.props.dispatchAssignBarcodeToPart(item._id, barcode);
                }}
              />
            )}
          </View>
        </ListItem>
      </List>
    ));

    return (
      <Container>
        <ImageBackground source={bgPicture} style={style.imageContainer}>
        <KeyboardAvoidingView behavior="padding" style={{flex:1}}>
          <Header style={style.header}>
            <Left>
              <Button transparent onPress={this.props.navigation.openDrawer}>
                <Icon name="ios-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Header</Title>
            </Body>
            <Right />
          </Header>
          {this.props.loadingPicklists ? (
            <Content>
              <Spinner />
            </Content>
          ) : (
            <Content>
              
              <Picker
                note={false}
                mode="dropdown"
                style={{ width: "100%" }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
              >
                {/* <KeyboardAwareScrollView
                  style={{ backgroundColor: '#4c69a5' }}
                  resetScrollToCoords={{ x: 0, y: 0 }}
                // contentContainerStyle={styles.container}
                  scrollEnabled={false}
                > */}

                  {pickerItems}
                {/* </KeyboardAwareScrollView> */}
              </Picker>
              {this.props.loadingParts ? <Spinner /> : partsList}
              {!this.props.loadingParts && partsList.length === 0 && (
                <Text>basket is empty</Text>
              )}
            </Content>
          )}
          </KeyboardAvoidingView>
        </ImageBackground>
      </Container>
     
    );
  }

  private onValueChange = (value: string) => {
    this.setState({ selected: value });
    this.props.dispatchSetCurrentBasket(value);
  };
  protected onBackButtonPressAndroid = () => {
    console.log(this.props);
    // this.props.navigation.goBack();
    return true;
  };
}

const mapStateToProps = (state: IStoreState) => ({
  token: state.app.token,
  pickLists: state.basket.pickLists,
  defaultPickListId: state.basket.defaultPickListId,
  loadingPicklists: state.basket.loadingGetMyPicklists,
  loadingParts: state.assignTubes.loadingParts,
  parts: state.assignTubes.parts,
  focusedPartIndex: state.assignTubes.focusedPartIndex
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchGetMyBaskets: () => dispatch({ type: GET_MY_PICKLISTS }),
  dispatchSetCurrentBasket: (id: string) =>
    dispatch({ type: SET_CURRENT_PICKLIST, data: id }),
  dispatchAssignBarcodeToPart: (partId: string, barcode: string) =>
    dispatch({
      type: QUERY_APPEND_BARCODE_TO_PART,
      data: { partId, barcode }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignTubes);
