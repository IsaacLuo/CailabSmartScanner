import { IStoreState, IAction } from "../../types";
import {
  call,
  select,
  all,
  fork,
  put,
  take,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import {
  QUERY_PART_DETAIL,
  SET_LOADING_PART_DETAIL,
  SET_PART_DETAIL
} from "./actions";

import { NavigationActions, StackActions } from "react-navigation";
import axios from "axios";
import conf from "../../config";
import { getAuthHeader } from "../../helpers";

function* queryPartDetail(action: IAction) {
  const partId: string = action.data;
  try {
    const token = yield select((store: IStoreState) => store.app.token);
    yield put({ type: SET_LOADING_PART_DETAIL, data: true });
    const res = yield call(
      axios.get,
      conf.serverURL + `/api/part/${partId}`,
      getAuthHeader(token)
    );
    yield put({ type: SET_PART_DETAIL, data: res.data });
  } catch (err) {
    yield put({ type: SET_LOADING_PART_DETAIL, data: false });
    if (err.response) {
      console.log(err.response.status);
      // yield put(redirectRoute('Drawer'));
      // yield put(NavigationActions.navigate({ routeName: 'Home'}));
      // yield put(NavigationActions.navigate({ routeName: 'Drawer'}));
    } else {
      console.error("axios error" + err.message);
    }
  }
}

export default function* watch() {
  yield takeLatest(QUERY_PART_DETAIL, queryPartDetail);
}
