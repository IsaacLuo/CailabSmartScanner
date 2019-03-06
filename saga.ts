import {all, fork} from 'redux-saga/effects'

import appSaga from './reducers/app/saga'
import basketSaga from './reducers/basket/saga'
import assignTubes from './screens/AssignTubes/saga'
import partDetailSaga from './screens/PartDetail/saga'
import whreIsMyPartSaga from './screens/WhereIsMyPart/saga'

export default function* rootSaga() {
  yield all([
    fork(appSaga),
    fork(basketSaga),
    fork(assignTubes),
    fork(partDetailSaga),
    fork(whreIsMyPartSaga),
  ]);
}