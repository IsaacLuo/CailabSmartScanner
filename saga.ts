import {call, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {Notification} from 'element-react'
import { IAction } from './types';
import watchMergeLightCyclerReport from './pages/MergeLightCyclerReport/sagas'
import watchTestLongTask from './pages/TestLongTask/sagas'
import watchTaskManager from './pages/TaskManager/sagas'
import { SET_USER } from './actions';

import { NavigationActions } from 'react-navigation'

import pickListSaga from './pickListSaga'

const redirectRoute = (name:string) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: name })
  ]
})

function* submitUserBarcode(action:IAction) {
  // send user barcode to backend
  // set redux
  yield put({type:SET_USER, data:{username:'guest', token:'guest'}});
  yield put(NavigationActions.navigate({ routeName: 'Dashboard' }))
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