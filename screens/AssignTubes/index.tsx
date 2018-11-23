// types
import {
  IStoreState,
  IReactNavigatingProps,
  IBasket,
  IPart,
} from '../../types';

// react
import * as React from 'react';
import {Keyboard} from 'react-native';
// redux
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

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
  Form,
  Picker,
  Spinner,
} from "native-base";
import { GET_MY_PICKLISTS } from '../../reducers/basket/actions';
import { SET_CURRENT_PICKLIST } from './actions';

import style from './style'
import DrawerBaseComponent from '../../components/DrawerBaseComponent';

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
  public componentDidMount() {
    Keyboard.dismiss();
  }
  public componentDidUpdate(){
    Keyboard.dismiss();
  }

  public render() {
    const pickerItems = this.props.pickLists.map(item => <Picker.Item
      label={item.name}
      value={item._id}
      key={item._id}
    />)

    const partsList = this.props.parts.map((item:IPart) => 
    <Card key={item._id}>
      <CardItem>
        <Icon
          name="md-add"
          onPress={()=>{
            console.debug(item.personalName);
            this.props.navigation.navigate('PartDetail', {partId:item._id});
          }}
        />
        <Text>{item.personalName}</Text>
        <Right>
          <Icon name="ios-barcode" />
        </Right>
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
  parts: state.assignTubes.parts,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  dispatchGetMyBaskets: ()=>dispatch({type:GET_MY_PICKLISTS}),
  dispatchSetCurrentBasket: (id:string)=>dispatch({type:SET_CURRENT_PICKLIST, data:id}),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignTubes);
