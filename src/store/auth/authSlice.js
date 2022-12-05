import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.status = 'authenticated';
    },
    logout: (state, action) => {
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.status = 'not-authenticated';
      state.errorMessage = action.payload?.errorMessage;
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

export const {login, logout, checkingCredentials} = authSlice.actions