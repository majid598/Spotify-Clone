import { FaPause, FaPlay, FaRegFolder } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../states/Reducers/SongReducer";
import useAudioPlayer from "./useAudioPlayer";
import { MdAddchart, MdIosShare } from "react-icons/md";
import { LuListMusic, LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import { BiLogoSpotify, BiPlus } from "react-icons/bi";
import { TbMusicPlus } from "react-icons/tb";
import { FaUserPen } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { IoRadio } from "react-icons/io5";
import { RiAlbumLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Card = ({ song }) => {
  const dispatch = useDispatch();
  const { togglePlayPause } = useAudioPlayer();
  const navigate = useNavigate();
  const menuRef = useRef();

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const { currentSong, isPlaying } = useSelector((state) => state.songs);

  const handlePlay = () => {
    if (currentSong && currentSong.id === song.id && isPlaying) {
      togglePlayPause();
    } else {
      dispatch(setCurrentSong(song));
    }
  };

  const handleClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [contextMenu]);

  if (!song) return null;

  return (
    <div
      onContextMenu={handleRightClick}
      className="card w-[11rem] inline-block p-4 px-3 col-span-1 overflow-hidden rounded-md transition-all duration-300 hover:bg-[#2c2c2c] cursor-pointer group"
    >
      {contextMenu.visible && (
        <div
          style={{ top: contextMenu.y, left: contextMenu.x }}
          className="w-[17rem] p-1 bg-[#282828] shadow rounded-md fixed z-[999] text-zinc-300 flex flex-col"
          ref={menuRef}
        >
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <BiPlus className="text-lg" /> Add to playlist
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <LuPlusCircle className="text-lg" /> Save to your liked songs
          </button>
          <button
            className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
          >
            <IoRadio className="text-lg" />
            Go to song radio
          </button>
            
          <button onClick={() => navigate(`/user/${song?.artist}`)} className="w-full p-3 rounded-sm cursor-default text-start hover:underline hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <FaUserPen className="text-lg" />
            Go to artist
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:underline hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <RiAlbumLine className="text-xl" />
            Go to album
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <LuListMusic className="text-lg" /> View credits
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <MdIosShare className="text-lg" />
            Share
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <BiLogoSpotify className="text-lg" /> Open in Desktop app
          </button>
        </div>
      )}
      <div className="h-36 rounded-md w-full overflow-hidden relative bg-no-repeat bg-center bg-cover">
        <img
          className="w-full h-full object-cover object-center"
          src={song.img}
          alt={song.title}
        />
        <button
          onClick={handlePlay}
          className="play bg-green-600 p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 absolute bottom-[-5%] right-3 rounded-full hover:scale-110"
        >
          {currentSong?.id === song.id && isPlaying ? (
            <FaPause className="text-black" />
          ) : (
            <FaPlay className="text-black" />
          )}
        </button>
      </div>
      <div className="mt-3">
        <span className="font-semibold truncate block">{song.title}</span>
        <p className="text-sm mt-2 text-zinc-400 truncate">{song.artist}</p>
      </div>
    </div>
  );
};

export default Card;
