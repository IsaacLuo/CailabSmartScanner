import { IBasketState } from "./types";

import {
  SET_CURRENT_BASKET
} from './actions'

const INITIAL_STATE = {
  allBaskets: [],
  currentBasketId: '0',
  currentBasketContent: [],
};

export default function basketReducer (state:IBasketState = INITIAL_STATE, action:IAction):IBasketState {
  switch (action.type) {
    case SET_CURRENT_BASKET:
      return {
        ...state,
        currentBasketId: action.data,
      }
  
    default:
      return state
  }
};