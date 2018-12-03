import { IAction, ILoginState } from "../../types";
import {
  SET_MESSAGE,
} from "./actions";


const INITIAL_STATE: ILoginState = {
  message: '',
};

export default function loginReducer(state: ILoginState = INITIAL_STATE, action: IAction): ILoginState {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.data.message,
      }
    default:
      return state
  }
};