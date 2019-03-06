import { IPartLocationState, IAction } from "../../types";
import {
  SET_PARTS,
  SET_LOADING_PARTS,
} from "./actions";


const INITIAL_STATE = {
  parts:[],
  loadingParts: true,
};

export default function partLocationReducer (state:IPartLocationState = INITIAL_STATE, action:IAction):IPartLocationState {
  switch (action.type) {
    case SET_LOADING_PARTS:
      return {
        ...state,
        loadingParts: action.data,
      }
    case SET_PARTS:
      return {
        ...state,
        parts: action.data,
        loadingParts: false,
      }
    default:
      return state
  }
};