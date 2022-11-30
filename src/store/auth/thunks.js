import {checkingCredentials, login, logout} from "./authSlice.js";
import {singInWithGoogle} from "../../firebase/index.js";

export const checkingAuthentication = ({email, password}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if(!result.ok) {
      return dispatch(logout(result));
    }
    delete result.ok;
    dispatch(login(result));
  }
}