import {call, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import { IAction } from './types';
import conf from './config'
import {
  SET_USER,
  SET_LOGIN_MESSAGE,
 } from './actions';

import { NavigationActions } from 'react-navigation'

import basketSaga from './reducers/basket/saga'
import assignTubes from './screens/AssignTubes/saga'
import axios from 'axios'

const redirectRoute = (name:string) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: name })
  ]
})

function* submitUserBarcode(action:IAction) {
  try {
    console.log('action ',action.type);
    // send user barcode to backend
    const response = yield call(axios.post, conf.serverURL+'/api/scannerSessions/', {barcode:action.data});
    if(response.data.token) {
      // got token
      yield put({type:SET_USER, data:{username:response.data.name, token: response.data.token}});
      yield put(NavigationActions.navigate({ routeName: 'Dashboard' }))
    }
    // set redux
  } catch (err) {
    yield put({type:SET_USER, data:{username:'guest', token:'guest'}});
    yield put({type:SET_LOGIN_MESSAGE, data:{message:'unable to login', err:err.message}});
  }
}

export function* watchSystemMessage() {
  // yield takeLatest('SET_APP_MESSAGE', testSaga);
  yield takeLatest('SUBMIT_USER_BARCODE', submitUserBarcode);
}

export default function* rootSaga() {
  yield all([
    fork(watchSystemMessage),
    fork(basketSaga),
    fork(assignTubes),
  ]);
}