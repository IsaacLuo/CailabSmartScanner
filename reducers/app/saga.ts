import {call, select, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import { IAction, IStoreState } from '../../types';
import conf from '../../config'
import {
  SET_USER,
  SET_LOGIN_MESSAGE,
  SUBMIT_USER_BARCODE,
  VERIFY_CURRENT_USER,
} from './actions';

import { NavigationActions, StackActions } from 'react-navigation'

import axios from 'axios'
import { getAuthHeader } from '../../helpers';

const redirectRoute = (routeName:string) => StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, })],
});

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
    yield put({type:SET_USER, data:{username:'guest', token:''}});
    yield put({type:SET_LOGIN_MESSAGE, data:{message:'unable to login', err:err.message}});
  }
}

function* verifyCurrentUser(action:IAction) {
  try {
    const token = yield select((store:IStoreState) => store.app.token);
    
    const response = yield call(axios.get, conf.serverURL+'/api/currentUser/', getAuthHeader(token));
    console.debug('response=', response.data)
    if(response.data.token) {
      // got token
      yield put({type:SET_USER, data:{username:response.data.name, token: response.data.token}});
      console.debug('got new token');
    }
    if(response.data.id === 'guest') {
      yield put({type:SET_USER, data:{username:'guest', token:''}});  
      console.debug('token expired');
      // yield put(redirectRoute('Drawer'));
      yield put(NavigationActions.navigate({ routeName: 'Home'}));
    }
    // set redux
  } catch (err) {
    console.error('failed in verify current user');
    yield put({type:SET_USER, data:{username:'guest', token:''}});
  }
  // yield call(delay,60000);
  // yield put({type:VERIFY_CURRENT_USER});
}

export default function* watchSystemMessage() {
  // yield takeLatest('SET_APP_MESSAGE', testSaga);
  yield takeLatest(SUBMIT_USER_BARCODE, submitUserBarcode);
  yield takeLatest(VERIFY_CURRENT_USER, verifyCurrentUser);
}
