// types
import {IAction, IAppState} from './types'

// redux
import { combineReducers } from 'redux'
import {
  SET_USER,
  SET_MESSAGE,
  SHOW_DRAWER,
  HIDE_DRAWER,
  } from './actions';
import { routeReducer } from './routeReducer';

const INITIAL_STATE = {
  message: 'test message',
  username: 'guest',
  token: '',
  drawerVisible: false,
};

const appReducer = (state:IAppState = INITIAL_STATE, action:IAction):IAppState =>  {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.data,
      }
    case 'HAHAH':
      return {
        ...state,
        message: 'hahah',
      }
    case SET_USER:
      return {
        ...state,
        username: action.data.username,
        token: action.data.token,
      }

    case SHOW_DRAWER:
      return {
        ...state,
        drawerVisible: true,
      }

    case HIDE_DRAWER:
      return {
        ...state,
        drawerVisible: false,
      }
    default:
      return state
  }
};

export default combineReducers({
  app: appReducer,
  route: routeReducer,
});