
// types
import {
  IStoreState,
  IReactNavigatingProps,
  IPartDetail,
} from '../../types';
  
// react
import * as React from 'react';
import { Component } from "react";
import { Image, Keyboard } from "react-native";

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
  Header,
  Body,
  Title,
} from "native-base";

// page essentials
import styles from "./style";
import { LOGOUT } from '../../reducers/app/actions';
import RNComponent from '../../components/RNComponent';
import { QUERY_PART_DETAIL } from './actions';

interface IProps extends IReactNavigatingProps {
  loading: boolean,
  partDetail:IPartDetail,
  queryPartDetail:(partId:string)=>void,
}

class PartDetail extends RNComponent<IProps,any> {
  constructor(props:IProps) {
    super(props);
    props.queryPartDetail(this.props.navigation.state.params.partId);
  }

  public componentDidMount() {
    Keyboard.dismiss();
  }
  public componentDidUpdate() {
    Keyboard.dismiss();
  }

  public render() {
    return <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={()=>this.props.navigation.goBack()}
            >
              <Icon type="Entypo" name="chevron-left" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.navigation.state.params.title} Details</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={()=>this.props.queryPartDetail(this.props.navigation.state.params.partId)}
            >
              <Icon type="Entypo" name="cycle" />
            </Button>
          </Right>
        </Header>
        <Content
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          {this.props.loading
          ? 
          <Text>loading</Text>
          :
          this.createPartDetailComponents()}
        </Content>
      </Container>
  }

  private createPartDetailComponents() {
    const p = this.props.partDetail;
    let data:any[] = [
      {key:'id', value:p._id},
      {key:'lab name', value:p.labName},
      {key:'personal name', value:p.personalName},
      {key:'sample type', value:p.sampleType},
      {key:'comment', value:p.comment},
      {key:'created at', value:p.createdAt},
      {key:'updated at', value:p.updatedAt},
      {key:'date', value:p.date},
      {key:'tags', value:p.tags},
    ];
    if(p.content) {
      data.push({key:'seqeunce', value:p.content.sequence});
      data.push({key:'orientation', value:p.content.orientation});
      data.push({key:'meltingTemperature', value:p.content.meltingTemperature});
      data.push({key:'concentration', value:p.content.concentration});
      data.push({key:'vendor', value:p.content.vendor});
      data.push({key:'plasmidName', value:p.content.plasmidName});
      data.push({key:'hostStrain', value:p.content.hostStrain});
      data.push({key:'parents', value:p.content.parents && p.content.parents.join(';')});
      data.push({key:'genotype', value:p.content.genotype && p.content.genotype.join(';')});
      data.push({key:'plasmidType', value:p.content.plasmidType});
      data.push({key:'markers', value:p.content.markers});
    }

    if (this.props.partDetail) {
      return data.filter(v=>v.value).map( v =>
      <List key={v.key}><ListItem><Text>{v.key} : {v.value}</Text></ListItem></List>
      )
    }
  }
}
const mapStateToProps = (state:IStoreState) => ({
  // username: state.app.username,
  partDetail: state.partDetail.partDetail,
  loading: state.partDetail.loading,
});

const mapDispatchToProps = (dispatch :Dispatch) => ({
  // logout: ()=>dispatch({type:LOGOUT}),
  queryPartDetail: (partId:string)=>dispatch({type:QUERY_PART_DETAIL, data:partId}),
})
export default connect(mapStateToProps, mapDispatchToProps)(PartDetail);

