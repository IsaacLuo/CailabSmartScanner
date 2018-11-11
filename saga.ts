import {call, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {Notification} from 'element-react'
import { IAction } from './types';
import watchMergeLightCyclerReport from './pages/MergeLightCyclerReport/sagas'
import watchTestLongTask from './pages/TestLongTask/sagas'
import watchTaskManager from './pages/TaskManager/sagas'
import {
  SET_USER,
  SET_LOGIN_MESSAGE,
 } from './actions';

import { NavigationActions } from 'react-navigation'

import pickListSaga from './pickListSaga'
import axios from 'axios'

const redirectRoute = (name:string) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: name })
  ]
})

function* submitUserBarcode(action:IAction) {
  try {
    // send user barcode to backend
    const response = yield call(axios.post, '/api/scannerSessions/', {barcode:action.data});
    if(response.data.token) {
      // got token
      yield put({type:SET_USER, data:{username:response.data.name, token: response.data.token}});
      yield put(NavigationActions.navigate({ routeName: 'Dashboard' }))
    }
    // set redux
  } catch (err) {
    yield put({type:SET_USER, data:{username:'guest', token:'guest'}});
    yield put({type:SET_LOGIN_MESSAGE, data:'unable to login'});
  }
}

export function* watchSystemMessage() {
  // yield takeLatest('SET_APP_MESSAGE', testSaga);
  yield takeLatest('SUBMIT_USER_BARCODE', submitUserBarcode);
}

export default function* rootSaga() {
  yield all([
    fork(watchSystemMessage),
    fork(pickListSaga),
  ]);
}