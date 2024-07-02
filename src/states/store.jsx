import { configureStore } from "@reduxjs/toolkit";
import { songReducer } from "./Reducers/SongReducer";
import authSlice from "./Reducers/userReducer";

export const store = configureStore({
  reducer: {
    [songReducer.name]: songReducer.reducer,
    [authSlice.name]: authSlice.reducer,
  },
});
