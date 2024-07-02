// useAudioPlayer.js
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingState } from "../states/Reducers/SongReducer";

const useAudioPlayer = () => {
  const audioRef = useRef(new Audio());
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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
  useEffect(() => {
    const audio = audioRef.current;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [currentSong]);

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
    currentTime,
    duration,
    setCurrentTime,
    audioRef,
  };
};

export default useAudioPlayer;
