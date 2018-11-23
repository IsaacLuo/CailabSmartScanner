import { IPartDetailState, IAction } from "../../types";
import {
  SET_LOADING_PART_DETAIL,
  SET_PART_DETAIL,
} from "./actions";


const INITIAL_STATE:IPartDetailState = {
  loading: true,
  partDetail: undefined,
};

export default function basketReducer (state:IPartDetailState = INITIAL_STATE, action:IAction):IPartDetailState {
  switch (action.type) {
    case SET_LOADING_PART_DETAIL:
      return {
        ...state,
        loading: action.data,
      }
    case SET_PART_DETAIL:
      return {
        ...state,
        partDetail: action.data,
        loading: false,
      }
    default:
      return state;
  }
};