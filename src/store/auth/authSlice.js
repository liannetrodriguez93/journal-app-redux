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
        login: (state, /*action*/) => {
          console.log(state)
        },
        logout: () => {

        },
        checkingCredentials: (state) => {

        }
    }
})

export const {login, logout, checkingCredentials} = authSlice.actions