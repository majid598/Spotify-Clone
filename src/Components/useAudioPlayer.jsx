// useAudioPlayer.js
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingState } from "../states/Reducers/SongReducer";

const useAudioPlayer = () => {
  const audioRef = useRef(new Audio());
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.songs.currentSong);
  const isPlaying = useSelector((state) => state.songs.isPlaying);

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = () => {
      audio.src = currentSong.url;
      audio
        .play()
        .then(() => {
          dispatch(setPlayingState(true));
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          dispatch(setPlayingState(false)); // Ensure state reflects the error
        });
    };

    const pauseAudio = () => {
      audio.pause();
      dispatch(setPlayingState(false));
    };

    if (currentSong) {
      playAudio();
    } else {
      pauseAudio();
    }

    return () => {
      pauseAudio();
    };
  }, [currentSong, dispatch]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(setPlayingState(!isPlaying));
  };

  return {
    isPlaying,
    togglePlayPause,
  };
};

export default useAudioPlayer;
