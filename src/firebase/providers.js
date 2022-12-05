import {GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import {FirebaseAuth} from "./config.js";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log(credentials);

    const {displayName, email, photoURL, uid} = result.user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    }
  }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName}) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const {uid, photoURL} = resp.user;

    await updateProfile(FirebaseAuth.currentUser, {displayName});

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (e) {
    return {
      ok: false,
      errorMessage: e.message
    }
  }
}

export const loginWithEmailPassword = async ({ email, password}) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const {uid, photoURL, displayName, email} = resp.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (e) {
    return {
      ok: false,
      errorMessage: e.message
    }
  }
}