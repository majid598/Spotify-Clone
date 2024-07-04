import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  playlistId: null,
  folderOpen: false,
  folderName: "New Folder",
  openedFolderId: "",
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
    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
    },
    setFolderOpen: (state, action) => {
      state.folderOpen = action.payload;
    },
    setFolderName: (state, action) => {
      state.folderName = action.payload;
    },
    setOpenedFolderId: (state, action) => {
      state.openedFolderId = action.payload;
    },
  },
});

export const {
  setCurrentSong,
  setPlayingState,
  setPlaylistId,
  setFolderOpen,
  setFolderName,
  setOpenedFolderId,
} = songReducer.actions;
