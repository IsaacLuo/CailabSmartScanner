import {
  IRouteState,
  IAction } from "./types";

const INITIAL_STATE = {
  path: '/',
}

export function routeReducer (state:IRouteState = INITIAL_STATE, action:IAction) {
  switch (action.type) {
    case 'GOTO':
      return {
        ...state,
        path: action.data,
      }
    default:
      return state
  }
};