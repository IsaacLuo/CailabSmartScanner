import { IAssignTubesState, IAction } from "../../types";
import {
  SET_PARTS,
  SET_LOADING_PARTS,
  APPEND_BARCODE_TO_PART,
  SET_FOCUSED_PART_INDEX,
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
        parts: action.data.parts.map((v:any)=>({
            ...v,
            assignedBarcodes: (v.containers
              ? v.containers.map((vv:any)=>vv.barcode)
              : []),
            barcodes: [],
          })),
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
    case SET_FOCUSED_PART_INDEX:
      return {
        ...state,
        focusedPartIndex: action.data,
      }
    default:
      return state
  }
};