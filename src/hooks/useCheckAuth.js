import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {onAuthStateChanged} from "firebase/auth";
import {FirebaseAuth} from "../firebase/index.js";

import {login, logout} from "../store/auth/index.js";

export const useCheckAuth = () => {
  const {status} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  console.log(status)

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())

      const {uid, email, displayName, photoUrl} = user;
      dispatch(login({uid, email, displayName, photoUrl}));
    })

  }, []);

  return status;
}