import {checkingCredentials, login, logout} from "./authSlice.js";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle
} from "../../firebase/index.js";
import {clearNotesLogout} from "../journal/index.js";

export const checkingAuthentication = ({email, password}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials({email, password}))
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

export const startCreatingUserWithEmailPassword = (({email, password, displayName}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({email, password, displayName})
    if(!result.ok) {
      return dispatch(logout(result));
    }
    delete result.ok;
    dispatch(login(result));
  }
})

export const startLoginWithEmailPassword = ({email, password}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({email, password});

    if(!result.ok) {
      return dispatch(logout(result));
    }
    delete result.ok;
    dispatch(login(result));
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await logoutFirebase();
      dispatch(clearNotesLogout())
      dispatch(logout());
    } catch (e) {
      dispatch(logout({errorMessage: 'Some error happen'}));
    }
  }
}