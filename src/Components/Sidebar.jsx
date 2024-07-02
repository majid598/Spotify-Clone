import axios from "axios";
import { useEffect, useState } from "react";
import { BiLibrary, BiPlus } from "react-icons/bi";
import { FaArrowRight, FaHeart, FaSearch } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa6";
import { GoHome, GoHomeFill } from "react-icons/go";
import { TbMusicPlus, TbWorld } from "react-icons/tb";
import { TfiMenuAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PlaylistItem from "../Pages/PlaylistItem";
import { server } from "../main";
import { FilledSearchIcon } from "./Dialog";

const sidebar = () => {
 
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);
  const [playlists, setPlaylists] = useState([null]);

  const createPlayList = () => {
    axios
      .get(`${server}/api/v1/playlist/new`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        setMenu(false);
      })
      .catch((err) => console.log(err));
  };

  // console.log(playlists);

  useEffect(() => {
    axios
      .get(`${server}/api/v1/playlist/my`, { withCredentials: true })
      .then(({ data }) => {
        // console.log(data);
        setPlaylists(data.playLists);
      })
      .catch((err) => console.log(err));
  }, [axios, playlists]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="w-[25rem] mr-2 flex flex-col gap-2"
    >
      <div className="uper flex items-center p-5 bg-[#101010] rounded-md w-full">
        <ul className="flex flex-col gap-5">
          {!user && (
            <li className="w-[85px]">
              <Link to="/">
                <img src="./assets/spotify.png" alt="" />
              </Link>
            </li>
          )}
          <Link
            to={"/"}
            className={`flex gap-4 items-end font-bold ${
              location.pathname === "/"
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            } transition-all du\
          `}
          >
            {location.pathname === "/" ? (
              <GoHomeFill className="text-3xl" />
            ) : (
              <GoHome className="text-3xl" />
            )}
            <span className="hover:underline">Home</span>
          </Link>
          <Link
            to={"/search"}
            className={`flex gap-5 items-end transition-all duration-300 ${
              location.pathname === "/search"
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            } font-bold`}
          >
            {location.pathname === "/search" ? (
              <FilledSearchIcon />
            ) : (
              <FaSearch className="text-2xl" />
            )}
            <span className="hover:underline">Search</span>
          </Link>
        </ul>
      </div>
      <div
        className={`down bg-[#101010] overflow-hidden rounded-md w-full ${
          user ? "h-[73.6vh]" : "h-[67.4vh]"
        }`}
      >
        <div className="nav w-full h-14 px-5 flex items-center justify-between">
          <button className="flex font-bold items-end opacity-70 hover:opacity-100 transition-all duration-300">
            <BiLibrary className="text-2xl" />
            <span>Your Library</span>
          </button>
          {user ? (
            <div className="flex gap-1 items-center">
              <div className="relative">
                {menu && (
                  <div className="w-[14rem] absolute right-0 top-10 p-1 rounded-md bg-[#282828] shadow">
                    <button
                      onClick={createPlayList}
                      className="w-full flex items-center gap-x-2 p-3 rounded-md hover:bg-[#3E3E3E] font-semibold text-zinc-200 text-sm cursor-default text-start"
                    >
                      <TbMusicPlus className="text-lg" /> Create a new Playlist
                    </button>
                    <button className="w-full flex items-center gap-x-2 p-3 rounded-md hover:bg-[#3E3E3E] font-semibold text-zinc-200 text-sm cursor-default text-start">
                      <FaRegFolder /> Create a Playlist Folder
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setMenu((prev) => !prev)}
                  className="rounded-full text-zinc-400 transition-all duration-300 hover:text-white hover:bg-[#1E1E1E] h-8 w-8 flex items-center justify-center"
                >
                  <BiPlus className="text-xl font-bold" />
                </button>
              </div>
              <button className="rounded-full text-zinc-400 transition-all duration-300 hover:text-white hover:bg-[#1E1E1E] h-8 w-8 flex items-center justify-center">
                <FaArrowRight />
              </button>
            </div>
          ) : (
            <button className="rounded-full hover:bg-[#1E1E1E] p-1">
              <BiPlus className="text-xl font-bold" />
            </button>
          )}
        </div>
        {user ? (
          <>
            <div className="flex gap-x-2 px-4">
              <button className="px-3 py-1.5 text-sm font-semibold rounded-full bg-[#232323] hover:bg-[#2A2A2A] transition-all duration-300">
                Playlists
              </button>
              <button className="px-3 py-1.5 text-sm font-semibold rounded-full bg-[#232323] hover:bg-[#2A2A2A] transition-all duration-300">
                Artists
              </button>
              <button className="px-3 py-1.5 text-sm font-semibold rounded-full bg-[#232323] hover:bg-[#2A2A2A] transition-all duration-300">
                Albums
              </button>
            </div>
            <div className="flex mt-3 items-center justify-between px-4">
              <button className="rounded-full text-zinc-400 transition-all duration-300 hover:text-white hover:bg-[#1E1E1E] h-8 w-8 flex items-center justify-center">
                <FaSearch />
              </button>
              <button className="flex items-center gap-2 text-zinc-400 text-sm font-semibold hover:scale-105 hover:text-white">
                Recents <TfiMenuAlt />
              </button>
            </div>
            <div
              id="playlists"
              className="w-full h-full pl-3 py-3 flex flex-col overflow-x-hidden overflow-y-scroll"
            >
              <Link
                to={"/collection/tracks"}
                className={`w-full ${
                  location.pathname === `/collection/tracks`
                    ? "bg-[#232323] hover:bg-[#393939]"
                    : "hover:bg-[#1A1A1A]"
                } min-h-16 p-2 flex items-center gap-2 rounded-md relative cursor-pointer`}
              >
                <div className="w-12 h-12 rounded-md bg-l flex items-center justify-center">
                  <FaHeart />
                </div>
                <div>
                  <h2 className="font-semibold">Liked Songs</h2>
                  <div className="flex gap-2 mt-1 items-center">
                    <div className="text-zinc-400 font-semibold text-sm flex items-center">
                      Playlist{" "}
                      <span className="w-1 h-1 mx-1 rounded-full bg-zinc-400 inline-block"></span>
                      {user?.likedSongs?.length} Songs
                    </div>
                  </div>
                </div>
              </Link>
              {playlists?.map((item, i) => (
                <PlaylistItem key={item?._id} playlist={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              id="playlists"
              className="w-full h-[36vh] px-2 py-3 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll"
            >
              <div className="w-full flex flex-col gap-2 bg-[#242424] p-5 rounded-md">
                <h2 className="font-bold">Create your first playlist</h2>
                <span className="font-semibold text-sm opacity-80">
                  it's easy, we'll help you
                </span>
                <button className="px-2 py-1 mt-2 bg-white w-32 text-[#343434] font-bold rounded-full text-sm">
                  Create playlist
                </button>
              </div>
              <div className="w-full flex flex-col gap-2 bg-[#242424] p-5 rounded-md">
                <h2 className="font-bold">
                  Let's find some podcasts to follow
                </h2>
                <span className="font-semibold text-sm opacity-80">
                  We'll keep you updated on new episods
                </span>
                <button className="px-2 py-1 mt-2 bg-white w-32 text-[#343434] font-bold rounded-full text-sm">
                  Browse Podcasts
                </button>
              </div>
            </div>
            <div className="footer p-5 flex flex-col items-start gap-y-3 bg-[#101010]">
              <div className="flex gap-x-5">
                <Link className="text-[11px] font-semibold text-zinc-400">
                  Legal
                </Link>
                <Link className="text-[11px] font-semibold text-zinc-400">
                  Safety & Privacy Center{" "}
                </Link>
              </div>
              <div className="flex gap-x-5">
                <Link className="text-[11px] font-semibold text-zinc-400">
                  Privacy Policy
                </Link>
                <Link className="text-[11px] font-semibold text-zinc-400">
                  Cookies{" "}
                </Link>
                <Link className="text-[11px] font-semibold text-zinc-400">
                  About Ads{" "}
                </Link>
              </div>
              <div className="flex gap-x-5">
                <Link className="text-[11px] font-semibold text-zinc-400">
                  Accessibility
                </Link>
              </div>
              <div className="flex gap-x-5">
                <Link className="text-[11px] font-semibold text-zinc-400">
                  Cookies{" "}
                </Link>
              </div>
              <button className="px-3 mt-5 font-bold text-sm py-1.5 flex gap-1 items-center rounded-full border border-zinc-500 hover:border-white hover:scale-105">
                <TbWorld className="text-xl" /> English
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default sidebar;
