import { IAssignTubesState, IAction } from "../../types";
import {
  SET_PARTS,
  SET_LOADING_PARTS,
} from "./actions";


const INITIAL_STATE = {
  parts:[],
  loadingParts: true,
};

export default function basketReducer (state:IAssignTubesState = INITIAL_STATE, action:IAction):IAssignTubesState {
  switch (action.type) {
    case SET_LOADING_PARTS:
      return {
        ...state,
        loadingParts: action.data,
      }
    case SET_PARTS:
      return {
        ...state,
        parts: action.data.map((v:any)=>({...v, barcodes:[]})),
        loadingParts: false,
      }
    default:
      return state
  }
};