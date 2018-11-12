import {call, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import { IAction } from './types';
import { SET_USER } from './actions';
import { NavigationActions } from 'react-navigation'
import axios from 'axios';
import conf from './config'

function* getMyPickList(action:IAction) {
  // yield put({type:SET_USER, data:{username:'guest', token:'guest'}});
  // yield put(NavigationActions.navigate({ routeName: 'Dashboard' }))
  try {
    console.log('getMyPickList')
  const res = yield call(axios.get, conf.serverURL+'/api/pickLists/');
  console.log(res.data);
  } catch (err) {
    console.log(err.response.data);
  }
}

export default function* watchPickList() {
  yield takeLatest('GET_MY_PICKLIST', getMyPickList);
}