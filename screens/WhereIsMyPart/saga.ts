import {IStoreState, IAction, IPart, IContainer} from '../../types'
import {call, select, all, fork, put, take, takeLatest, takeEvery} from 'redux-saga/effects'
import {
  SET_CURRENT_PICKLIST,
  SET_PARTS,
  SET_LOADING_PARTS,
  GET_MY_PICKLISTS,
  GET_PICKLIST_TUBE_LOCATIONS,
 } from './actions';

import { NavigationActions, StackActions} from 'react-navigation'
import axios from 'axios';
import conf from '../../config'
import {getAuthHeader} from '../../helpers'
import { GET_MY_PICKLISTS as GET_MY_PICKLISTS_ROOT } from '../../reducers/basket/actions';

const redirectRoute = (routeName:string) => StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, })],
});

function* getPickListTubeLocations(action:IAction) {
  const pickListId:string = action.data.data;
  try {
    const token = yield select((store:IStoreState) => store.app.token);
    yield put({type:SET_LOADING_PARTS, data:true});

    const res = yield call(axios.get, conf.serverURL+`/api/pickList/${pickListId}/partLocations`, getAuthHeader(token));
    // yield put({type:FILL_PARTS_INTO_PICKLIST, data:res2.data});

    // set rack location to tube Location
    const {parts} = res.data;
    parts.forEach( (part:IPart) => {
      part.containers.forEach((container:IContainer) => {
        if (container.parentContainer) {
          container.location = container.parentContainer.location;
        }
      })
    });
    yield put({type:SET_PARTS, data:parts});
  } catch (err) {
    yield put({type:SET_LOADING_PARTS, data:false});
    if (err.response) {
      // console.log(err.response.status);
      // yield put(redirectRoute('Drawer'));
      yield put(NavigationActions.navigate({ routeName: 'Home'}));
      // yield put(NavigationActions.navigate({ routeName: 'Drawer'}));
    } else {
      console.error('axios error' + err.message);
    }
  }

  
}



function* setMyPickLists(action:IAction) {
  yield put({
    type:GET_MY_PICKLISTS_ROOT,
    data:{
      next: [GET_PICKLIST_TUBE_LOCATIONS],
    },
  });
}

export default function* watchAssignTubes() {
  yield takeLatest(GET_MY_PICKLISTS, setMyPickLists);
  yield takeLatest(GET_PICKLIST_TUBE_LOCATIONS, getPickListTubeLocations);
}