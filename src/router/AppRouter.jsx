import {useEffect} from "react";

import {useDispatch, useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";

import {onAuthStateChanged} from "firebase/auth";

import {AuthRoutes} from "../auth/routes/AuthRoutes";
import {JournalRoutes} from "../journal/routes/JournalRoutes";
import {CheckingAuth} from "../ui";
import {FirebaseAuth} from "../firebase/index.js";
import {login, logout} from "../store/auth/index.js";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const {status} = useSelector(state => state.auth);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())

      const {uid, email, displayName, photoUrl} = user;
      dispatch(login({uid, email, displayName, photoUrl}));
    })

  }, []);


  if (status === 'checking') {
    return <CheckingAuth/>
  }

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path='/*' element={<JournalRoutes/>}/>
          : <Route path='/auth/*' element={<AuthRoutes/>}/>
      }

      <Route path='/*' element={<Navigate to={'/auth/login'}/>}/>
    </Routes>
  );
}