import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Components/Sidebar";
import SongBar from "../Components/SongBar";
import { useSelector } from "react-redux";

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
  console.log(isFullScreen);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div ref={elementRef} className="w-full flex h-screen text-white p-2">
      {isFullScreen && (
        <div className="w-full h-screen bg-red-600 fixed z-[99] top-0 left-0">
          <img src={currentSong?.img} className="w-full h-full" alt="" />
        </div>
      )}
      <Sidebar />
      {children}
      <SongBar elementRef={elementRef} />
    </div>
  );
};

export default layout;
