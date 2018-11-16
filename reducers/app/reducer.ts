// types
import {IAction, IAppState} from '../../types'

import {
  SET_USER,
  SET_MESSAGE,
  LOGOUT,
  } from './actions';

const INITIAL_STATE = {
  message: 'test message',
  username: 'guest',
  token: '',
  drawerVisible: false,
};

const appReducer = (state:IAppState = INITIAL_STATE, action:IAction):IAppState =>  {
  console.debug('Action = ', action.type);
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.data,
      }
    case SET_USER:
      return {
        ...state,
        username: action.data.username,
        token: action.data.token,
      }
    case LOGOUT:
      return {
        ...state,
        username: 'guest',
        token: '',
      }
    default:
      return state
  }
};

export default appReducer