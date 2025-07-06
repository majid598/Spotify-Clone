import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingState } from "../states/Reducers/SongReducer";

const useAudioPlayer = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = useSelector((state) => state.songs.currentSong);
  const isPlaying = useSelector((state) => state.songs.isPlaying);

  // Only create the Audio object once
  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
    };
  }, []);

  // Load new song when currentSong changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong?.url) return;

    if (audio.src !== currentSong.url) {
      audio.pause();
      audio.src = currentSong.url;
      audio.load();

      audio.addEventListener("canplaythrough", () => {
        if (isPlaying) {
          audio.play().catch((err) => {
            console.error("Playback error:", err);
            dispatch(setPlayingState(false));
          });
        }
      }, { once: true });

      setCurrentTime(0);
    }
  }, [currentSong, isPlaying, dispatch]);

  // Handle play/pause toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && audio.src) {
      if (audio.readyState >= 3) {
        audio.play().catch((err) => {
          console.error("Playback error:", err);
          dispatch(setPlayingState(false));
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, dispatch]);

  // Handle time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  // Handle song end
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => dispatch(setPlayingState(false));
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [dispatch]);

  // Manual toggle function
  const togglePlayPause = () => {
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
