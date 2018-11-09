import {call, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import {Notification} from 'element-react'
import { IAction } from './types';
import watchMergeLightCyclerReport from './pages/MergeLightCyclerReport/sagas'
import watchTestLongTask from './pages/TestLongTask/sagas'
import watchTaskManager from './pages/TaskManager/sagas'

function* testSaga() {
  // console.debug({a:'b'})
  // yield put({type:'HAHAH'})
}

export function* watchSystemMessage() {
  // yield takeLatest('SET_APP_MESSAGE', testSaga);
}

export default function* rootSaga() {
  yield all([
    fork(watchSystemMessage),
  ]);
}