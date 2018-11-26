import { IAssignTubesState, IAction } from "../../types";
import {
  SET_PARTS,
  SET_LOADING_PARTS,
  APPEND_BARCODE_TO_PART,
} from "./actions";


const INITIAL_STATE = {
  parts:[],
  loadingParts: true,
  focusedPartIndex: 0,
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
        focusedPartIndex: 0,
      }
    case APPEND_BARCODE_TO_PART:
      return {
        ...state,
        focusedPartIndex: state.focusedPartIndex + 1,
        parts: state.parts.map(v=>{
          if (v._id === action.data.partId && v.barcodes!==undefined && v.barcodes.indexOf(action.data.barcode) < 0) {
            return {...v, barcodes: [...v.barcodes, action.data.barcode]};
          } else if(v.barcodes === undefined) {
            return {...v, barcodes: [action.data.barcode]};
          } else {
            return v;
          }
        }),
        
      }
    default:
      return state
  }
};