import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
};

export const songReducer = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    setPlayingState: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setCurrentSong, setPlayingState } = songReducer.actions;
