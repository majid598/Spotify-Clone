import React from "react";
import Sidebar from "../Components/Sidebar";
import SongBar from "../Components/SongBar";

const layout = ({ children }) => {
  return (
    <div className="w-full flex h-screen text-white p-2">
      <Sidebar />
      {children}
      <SongBar />
    </div>
  );
};

export default layout;
