import {IStoreState, IAction} from '../../types'
import {call, select, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {
  GET_MY_PICKLISTS,
  SET_MY_PICKLISTS,
  SET_LOADING_GET_MY_PICKLISTS,
  FILL_PARTS_INTO_PICKLIST,
  GET_PICKLIST,
 } from './actions';

 import {
   SET_PARTS,
 } from '../../screens/AssignTubes/actions';

import { NavigationActions, StackActions} from 'react-navigation'
import axios from 'axios';
import conf from '../../config'
import {getAuthHeader} from '.././../helpers'

const redirectRoute = (routeName:string) => StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, })],
});

function* getMyPickLists(action:IAction) {
  try {
    const {next} = action.data;
    const token = yield select((store:IStoreState) => store.app.token);

    yield put({type:SET_LOADING_GET_MY_PICKLISTS, data:true});
    // get all baskets
    const res = yield call(axios.get, conf.serverURL+'/api/pickLists/', getAuthHeader(token));
    yield put({type:SET_MY_PICKLISTS, data:res.data});
    const {defaultPickListId} = res.data;
    
    if (next && next[0]) {
      yield put({type:next[0], data: {data:defaultPickListId, next: next.splice(1)}});
    }

    // // get content of default basket
    // const res2 = yield call(axios.get, conf.serverURL+`/api/pickList/${defaultPickListId}`, getAuthHeader(token));
    // yield put({type:FILL_PARTS_INTO_PICKLIST, data:res2.data});
    // yield put({type:SET_PARTS, data:res2.data.parts});
    
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      // yield put(redirectRoute('Home'));
      yield put(NavigationActions.navigate({ routeName: 'Home'}));
    } else {
      console.error('axios error' + err.message);
    }
  }

  yield put({type:SET_LOADING_GET_MY_PICKLISTS, data:false});
}

function* getPickList(action:IAction) {
  try {
    const {id, next} = action.data;
    const token = yield select((store:IStoreState) => store.app.token);
    // get content of default basket
    const res2 = yield call(axios.get, conf.serverURL+`/api/pickList/${id}`, getAuthHeader(token));
    yield put({type:FILL_PARTS_INTO_PICKLIST, data:res2.data});
    
    if (next && next[0]) {
      yield({type:next[0], data: {data:res2.data, next: next.splice(1)}});
    }
    
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      // yield put(redirectRoute('Home'));
      yield put(NavigationActions.navigate({ routeName: 'Home'}));
    } else {
      console.error('axios error' + err.message);
    }
  }
}

export default function* watchPickList() {
  yield takeLatest(GET_MY_PICKLISTS, getMyPickLists);
  yield takeEvery(GET_PICKLIST, getPickList);
}