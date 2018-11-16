import {all, fork} from 'redux-saga/effects'

import appSaga from './reducers/app/saga'
import basketSaga from './reducers/basket/saga'
import assignTubes from './screens/AssignTubes/saga'

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(basketSaga),
    fork(assignTubes),
  ]);
}