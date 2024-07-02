import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import SongBar from "../Components/SongBar";
import Card from "../Components/card";
import Layout from "../Layout/layout";
import { server } from "../main";
import { setCurrentSong } from "../states/Reducers/SongReducer";
import { userNotExists } from "../states/Reducers/userReducer";

export const song = {
  id: Math.random() * Date.now(),
  title: "Pehle bhi mein",
  artist: "Emma heesters",
  mp3: new Audio("/asets/mp3/mein.mp3"),
  img: "/assets/images.jpg",
};

export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Pehle bhi mein",
    artist: "Emma heesters",
    url: "/assts/mp3/mein.mp3",
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
    img: "/assets/Arijit-3.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Kalnak - Title Track",
    artist: "Arijit Singh",
    url: "/assets/mp3/kalank.mp3",
    img: "/assets/kalank.jpeg",
  },
];

const Home = ({ user }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const { currentSong } = useSelector((state) => state.songs);
  const logout = () => {
    axios
      .get(`${server}/api/v1/user/logout`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        dispatch(userNotExists(true));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setCurrentSong(songs[0]));
  }, []);

  return (
    <Layout>
      <div className="lay relative w-[62rem] h-[88vh] pt-20 bg-[#181818] overflow-x-hidden overflow-y-scroll ml rounded-md">
        <Header />
        <div className="h-14 flex justify-between relative items-center px-4">
          <span className="text-3xl font-bold">Good morning {user?.name}</span>
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
      </div>
    </Layout>
  );
};

export default Home;
