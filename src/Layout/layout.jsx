import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/Sidebar";
import SongBar from "../Components/SongBar";
import { useSelector } from "react-redux";
import Header from "../Components/Header";

const layout = ({ children }) => {
  const elementRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { currentSong } = useSelector((state) => state.songs);
  console.log(currentSong)
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
        {currentSong && <div className="w-[25rem] h-full rounded-md bg-[#101010]"></div>}
      </div>
      <SongBar elementRef={elementRef} />
    </div>
  );
};

export default layout;
