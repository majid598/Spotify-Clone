import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/Sidebar";
import SongBar from "../Components/SongBar";
import { useSelector } from "react-redux";
import Header from "../Components/Header";

const layout = ({ children }) => {
  const elementRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { currentSong } = useSelector((state) => state.songs);
  const handleFullScreenChange = () => {
    if (document.fullscreenElement === elementRef.current) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  };
  // console.log(isFullScreen);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      onContextMenu={(e) => e.preventDefault()}
      className="w-full h-screen text-white p-1"
    >
      {isFullScreen && (
        <div className="w-full h-screen bg-red-600 fixed z-[99] top-0 left-0">
          <img src={currentSong?.img} className="w-full h-full" alt="" />
        </div>
      )}
      <Header />
      <div className="flex gap-2 pb-3 h-[calc(100vh-140px)]">
        <Sidebar />
        <div
          className={`${
            currentSong ? "w-[calc(100%-53rem)]" : "w-[calc(100%-28rem)]"
          }`}
        >
          {children}
        </div>
        {currentSong && (
          <div className="w-[25rem] p-5 px-4 h-full rounded-md bg-[#101010]">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">{currentSong?.title}</h1>
              <div className="flex space-x-2 text-gray-400 text-xl">
                <button>⋯</button>
                <button>⛶</button>
              </div>
            </div>

            {/* Poster Image */}
            <img
              src={currentSong?.img}
              alt="Sardaarji3"
              className="w-full rounded-md"
            />

            {/* Song Info */}
            <div>
              <h2 className="text-2xl font-bold">{currentSong?.title}</h2>
              <p className="text-sm text-gray-400">
                Diljit Dosanjh, Zafar Sandhu, MixSingh
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <button className="text-white hover:text-green-500">➕</button>
                <button className="text-white hover:text-green-500">🔗</button>
              </div>
            </div>

            {/* About the Artist */}
            <div className="bg-neutral-900 p-4 rounded-lg space-y-3">
              <h3 className="text-sm uppercase text-gray-400 tracking-wide">
                About the artist
              </h3>
              <img
                src="https://i.scdn.co/image/ab676161000051745ba2d75eb08a2d672f9b69b7"
                alt="Diljit Vogue"
                className="w-full h-40 object-cover rounded-md"
              />
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">{currentSong?.artist}</h4>
                  <button className="bg-white text-black text-xs font-medium px-3 py-1 rounded-full">
                    Follow
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  19,176,824 monthly listeners
                </p>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  Diljit Dosanjh’s achievements over the past two decades are
                  unprecedented and the result of these remarkable
                  achievements...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <SongBar elementRef={elementRef} />
    </div>
  );
};

export default layout;
