import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth/index.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});