import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiLogoSpotify, BiPlus } from "react-icons/bi";
import { CiTrash } from "react-icons/ci";
import { FaCheck, FaRegFolder } from "react-icons/fa6";
import { LuRadio } from "react-icons/lu";
import { MdIosShare } from "react-icons/md";
import { RiAlbumLine, RiUserReceived2Fill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { server } from "../main";
import { IoMdAnalytics } from "react-icons/io";

const PlaylistSongItem = ({ song, i }) => {
  const [duration, setDuration] = useState(null);
  const [menu, setMenu] = useState(false);

  const { id } = useParams();

  const deleteSong = () => {
    axios
      .delete(`${server}/api/v1/playlist/remove/${id}/${song.id}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  useEffect(() => {
    const audio = new Audio(song.url);
    const getDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", getDuration);
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", getDuration);
    };
  }, [song.url]);

  return (
    <div className="phover w-full hover min-h-16 p-2 grid grid-col-l-5 items-center pr-5 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
      <div className="font-semibold text-zinc-400">{i + 1}</div>
      <div className="w-full flex items-center">
        <div className="flex gap-2 items-center">
          <div className="w-12 overflow-hidden h-12 rounded-md bg-l flex items-center justify-center">
            <img src={song.img} alt="" />
          </div>
          <div className="flex flex-col">
            <Link className="font-semibold hover:underline">{song.title}</Link>
            <Link className="text-sm text-zinc-400 hover:underline font-semibold">
              {song.artist}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full font-bold text-sm text-zinc-400">
        {song?.artist}
      </div>
      <div className="w-full font-bold text-sm text-zinc-400">
        {moment(song?.createdAt).fromNow()}
      </div>
      <div className="w-full flex relative items-center justify-between">
        {menu && (
          <div className="w-[17rem] p-1 bg-[#282828] shadow rounded-md absolute z-[999] top-8 right-0 text-zinc-300 flex flex-col">
            <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
              <BiPlus className="text-lg" /> Add to playlist
            </button>
            <button
              onClick={deleteSong}
              className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
            >
              <CiTrash className="text-lg" /> Remove from this playlist
            </button>
            <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
              <LuRadio className="text-lg" /> Go to song radio
            </button>
            <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
              <RiUserReceived2Fill  className="text-lg" /> Go to artist
            </button>
            <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
              <RiAlbumLine  className="text-xl" /> Go to album
            </button>
            <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
              <IoMdAnalytics  className="text-lg" /> View credits
            </button>
            <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
              <MdIosShare className="text-lg" /> Share
            </button>
            <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
              <BiLogoSpotify className="text-lg" /> Open in Desktop app
            </button>
          </div>
        )}
        <button className="check text-xs opacity-0 p-1 rounded-full bg-green-600 text-black">
          <FaCheck className="text-xs" />
        </button>
        <span className="text-sm font-bold text-zinc-400">
          {formatTime(duration)}
        </span>
        <button
          onClick={() => setMenu(!menu)}
          className="btn opacity-0 flex gap-0.5 py-3"
        >
          <span className="w-[3px] h-[3px] rounded-full bg-white"></span>
          <span className="w-[3px] h-[3px] rounded-full bg-white"></span>
          <span className="w-[3px] h-[3px] rounded-full bg-white"></span>
        </button>
      </div>
    </div>
  );
};

export default PlaylistSongItem;
