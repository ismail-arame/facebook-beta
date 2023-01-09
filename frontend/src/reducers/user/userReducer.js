import { userActionTypes } from "./userTypes";
import Cookies from "js-cookie";

const INITIAL_STATE = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;
export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActionTypes.LOGIN:
      return action.payload;

    case userActionTypes.LOGOUT:
      return null;

    case userActionTypes.VERIFY:
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}
