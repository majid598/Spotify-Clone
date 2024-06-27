import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Layout from "../../Layout/layout";
import { Link } from "react-router-dom";
import Card from "../Card/card";
import SongBar from "../MasterBar/SongBar";

export const song = {
  id: Math.random() * Date.now(),
  title: "Pehle bhi mein",
  artist: "Emma heesters",
  mp3: new Audio("/assets/mp3/mein.mp3"),
  img: "/assets/images.jpg",
};

export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Pehle bhi mein",
    artist: "Emma heesters",
    url: "/assets/mp3/mein.mp3",
    img: "/assets/images.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Heeriye",
    artist: "Arijit Singh",
    url: "/assets/mp3/heeriye.mp3",
    img: "/assets/Arijit-4.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Pal kesa pal",
    artist: "Arijit Singh",
    url: "/assets/mp3/Mashup.mp3",
    img: "./assets/Arijit-3.jpg",
  },
];

const home = () => {
  return (
    <Layout>
      <div className="lay w-3/4 h-[88vh] bg-[#181818] overflow-x-hidden overflow-y-scroll ml rounded-md">
        <div className="h-16 w-full flex bg-[#101010] px-5 items-center justify-between">
          <div className="h-full w-24 px-3 flex items-center gap-3">
            <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#000000]">
              <FaChevronLeft />
            </button>
            <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#070707]">
              <FaChevronRight />
            </button>
          </div>
          <div>
            <Link
              to="/signup"
              className="rounded-full text-[#8c8c8c] hover:text-white px-7 text-lg py-3 font-bold"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="rounded-full text-black px-7 text-lg py-3 bg-white font-bold"
            >
              Log in
            </Link>
          </div>
        </div>
        <div className="h-14 flex justify-between relative items-center px-4">
          <span className="text-3xl font-bold">Good morning</span>
          <span className="text-sm font-bold opacity-60 absolute bottom-0 right-6">
            Show all
          </span>
        </div>
        <div className="cards w-full h-[70vh] flex flex-wrap gap-6 p-8">
          {songs.map((song) => {
            return <Card key={song.id} song={song} />;
          })}
        </div>
        <div className="h-14 flex justify-between mt-36 relative items-center px-4">
          <span className="text-3xl hover:underline cursor-pointer font-bold">
            Spotify playlists
          </span>
          <span className="text-sm font-bold opacity-60 absolute bottom-0 right-6">
            Show all
          </span>
        </div>
        <div className="cards w-full h-[70vh] grid grid-cols-5 gap-6 p-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <SongBar />
      </div>
    </Layout>
  );
};

export default home;
