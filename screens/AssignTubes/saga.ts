import {IStoreState, IAction} from '../../types'
import {call, select, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {
  SET_CURRENT_PICKLIST,
  SET_PARTS,
  SET_LOADING_PARTS,
 } from './actions';

import {
  SET_LOADING_GET_MY_PICKLISTS,
  FILL_PARTS_INTO_PICKLIST,
} from '../../reducers/basket/actions';

import { NavigationActions, StackActions} from 'react-navigation'
import axios from 'axios';
import conf from '../../config'
import {getAuthHeader} from '../../helpers'

const redirectRoute = (routeName:string) => StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, })],
});

function* setCurrentPickList(action:IAction) {
  const pickListId:string = action.data;
  console.debug('new picklist = ', pickListId);
  try {
    const token = yield select((store:IStoreState) => store.app.token);
    yield put({type:SET_LOADING_PARTS, data:true});

    const res2 = yield call(axios.get, conf.serverURL+`/api/pickList/${pickListId}`, getAuthHeader(token));
    yield put({type:FILL_PARTS_INTO_PICKLIST, data:res2.data});
    yield put({type:SET_PARTS, data:res2.data.parts});
  } catch (err) {
    yield put({type:SET_LOADING_PARTS, data:false});
    if (err.response) {
      console.log(err.response.status);
      // yield put(redirectRoute('Drawer'));
      yield put(NavigationActions.navigate({ routeName: 'Home'}));
      // yield put(NavigationActions.navigate({ routeName: 'Drawer'}));
    } else {
      console.error('axios error' + err.message);
    }
  }

  
}

export default function* watchAssignTubes() {
  yield takeLatest(SET_CURRENT_PICKLIST, setCurrentPickList);
}