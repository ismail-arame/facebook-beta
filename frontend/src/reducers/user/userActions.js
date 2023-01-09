import { userActionTypes } from "./userTypes";

export const login = (userData) => ({
  type: userActionTypes.LOGIN,
  payload: userData,
});

export const verify = (boolVariable) => ({
  type: userActionTypes.VERIFY,
  payload: boolVariable,
});

export const logout = () => ({
  type: userActionTypes.LOGOUT,
});
