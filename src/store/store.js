import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./auth/index.js";
import {journalSlice} from "./journal/index.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  }
});