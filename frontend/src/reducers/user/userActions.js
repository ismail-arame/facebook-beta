import { userActionTypes } from "./userTypes";

export const login = (userData) => ({
  type: userActionTypes.LOGIN,
  payload: userData,
});
