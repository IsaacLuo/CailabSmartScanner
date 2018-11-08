// types
import {IAction} from './types'

// redux
import { combineReducers } from 'redux'

const INITIAL_STATE = {
  message: 'test message',
};

const appReducer = (state = INITIAL_STATE, action:IAction) => {
  switch (action.type) {
    case 'SET_APP_MESSAGE':
      return {
        ...state,
        message: action.data,
      }
    case 'HAHAH':
      return {
        ...state,
        message: 'hahah',
      }
    default:
      return state
  }
};

export default combineReducers({
  app: appReducer,
});