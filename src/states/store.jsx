import { configureStore } from "@reduxjs/toolkit";
import { songReducer } from "./Reducers/SongReducer";

export const store = configureStore({
  reducer:{
    [songReducer.name]:songReducer.reducer
  }
})