import { IBasketState, IAction } from "../../types";
import {
  SET_MY_PICKLISTS,
  SET_LOADING_GET_MY_PICKLISTS,
  FILL_PARTS_INTO_PICKLIST,
} from "./actions";


const INITIAL_STATE = {
  pickLists: [],
  defaultPickListId: '',
  loadingGetMyPicklists: true,
};

export default function basketReducer (state:IBasketState = INITIAL_STATE, action:IAction):IBasketState {
  switch (action.type) {
    case SET_MY_PICKLISTS:
      return {
        ...state,
        pickLists: action.data.pickLists,
        defaultPickListId: action.data.defaultPickListId,
      }
    case SET_LOADING_GET_MY_PICKLISTS:
      return {
        ...state,
        loadingGetMyPicklists: action.data,
      }
    case FILL_PARTS_INTO_PICKLIST:
      state.pickLists.forEach(v => {
        if (v._id === action.data._id) {
          v.parts = action.data.parts;
        }
      })
      return {
        ...state,
        pickLists: [...state.pickLists],
      }
    default:
      return state
  }
};