// types
import {IAction, IAppState} from './types'

// redux
import { combineReducers } from 'redux'
import {
  SET_USER,
  SET_MESSAGE,
  } from './actions';

import basketReducer from './reducers/basket/reducer'
import navigateReducer from './navigateReducer'
import assignTubesReducer from './screens/AssignTubes/reducer'

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
    default:
      return state
  }
};

export default combineReducers({
  app: appReducer,
  basket: basketReducer,
  nav: navigateReducer,
  assignTubes: assignTubesReducer,
});