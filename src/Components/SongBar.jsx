import { AiOutlineFullscreen } from "react-icons/ai";
import { BiRepeat } from "react-icons/bi";
import { CgMiniPlayer } from "react-icons/cg";
import { FaCheck, FaPause, FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { HiOutlineQueueList } from "react-icons/hi2";
import { LuMic2, LuPlaySquare } from "react-icons/lu";
import { MdDevices, MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RxSpeakerLoud } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAudioPlayer from "./useAudioPlayer";
import { useEffect, useRef, useState } from "react";

const SongBar = ({ elementRef }) => {
  const { user } = useSelector((state) => state.auth);
  const { currentSong, isPlaying } = useSelector((state) => state.songs);
  const { currentTime, duration, setCurrentTime, volume, setVolume, audioRef } = useAudioPlayer();

  const handleSliderChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
  };

  const handleSliderMouseUp = () => {
    const audio = audioRef.current;
    audio.currentTime = currentTime;
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  // Handle volume change
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };
  const handleFullScreen = () => {
    // if (elementRef.current && elementRef.current.requestFullscreen) {
    elementRef.current.requestFullscreen();
    // } else {
    //   alert("Your browser does not support fullscreen mode.");
    // }
  };

  return (
    <div className={`fixed bottom-0 z-[999] left-0 ${user ? "h-24" : "h-20"} w-full`}>
      {user ? (
        <div className="grid grid-col-3 w-full h-full bg-black p-5 py-3">
          <div className="w-full h-full flex gap-4 items-center">
            <div className="w-16 h-16 rounded-sm overflow-hidden">
              <img src={currentSong?.img} className="w-full h-full" alt="" />
            </div>
            <div>
              <h2 className="font-semibold">{currentSong?.title}</h2>
              <h5 className="text-sm font-semibold text-zinc-400">
                {currentSong?.artist}
              </h5>
            </div>
            <div className="ml-10">
              <button className="text-xs p-1 rounded-full bg-green-600 text-black">
                <FaCheck className="text-xs" />
              </button>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-between items-center">
            <div className="flex gap-4">
              <button className="text-zinc-400">
                <FaShuffle />
              </button>
              <button className="text-3xl">
                <MdSkipPrevious />
              </button>
              <button className="p-3 bg-white text-sm rounded-full text-black">
                {currentSong && isPlaying ? (
                  <FaPause className="text-black" />
                ) : (
                  <FaPlay className="text-black" />
                )}
              </button>
              <button className="text-3xl">
                <MdSkipNext />
              </button>
              <button className="text-xl text-zinc-400">
                <BiRepeat />
              </button>
            </div>
            <div className="w-full items-center flex gap-2">
              <span className="text-sm text-zinc-400">
                {formatTime(currentTime)}
              </span>
              <div className="w-10/12">
                <input
                  type="range"
                  className="w-full"
                  value={currentTime}
                  max={duration}
                  onChange={handleSliderChange}
                  onMouseUp={handleSliderMouseUp}
                />
              </div>
              <span className="text-sm text-zinc-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>
          <div className="w-full flex gap-3 h-full">
            <button className="text-zinc-400 hover:text-white">
              <LuPlaySquare className="text-lg" />
            </button>
            <button className="text-zinc-400 hover:text-white">
              <LuMic2 className="text-lg" />
            </button>
            <button className="text-zinc-400 hover:text-white">
              <HiOutlineQueueList className="text-lg" />
            </button>
            <button className="text-zinc-400 hover:text-white">
              <MdDevices className="text-lg" />
            </button>
            <div className="flex gap-2">
              <button className="text-zinc-400 hover:text-white">
                {/* RxSpeakerQuiet  */}
                {/* RxSpeakerOff  */}
                {/* RxSpeakerModerate  */}
                <RxSpeakerLoud className="text-lg" />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="bg-transparent"
              />
            </div>
            <button className="text-zinc-400 hover:text-white">
              <CgMiniPlayer className="text-lg" />
            </button>
            <button
              onClick={handleFullScreen}
              className="text-zinc-400 hover:text-white"
            >
              <AiOutlineFullscreen className="text-lg" />
            </button>
          </div>
        </div>
      ) : (
        <Link
          to={"/signup"}
          className="w-full bg-gradient-to-r from-[#A337A2] to-[#5E89E6] h-full flex justify-between items-center px-5"
        >
          <div>
            <h4 className="text-sm font-bold">Preview of Spotify</h4>
            <p className="font-semibold">
              Sign up to get unlimited songs and products with occasional ads.
              No credit card needed
            </p>
          </div>
          <button className="bg-white font-bold text-black rounded-full px-8 py-3">
            Sign up Free
          </button>
        </Link>
      )}
    </div>
  );
};

export default SongBar;
