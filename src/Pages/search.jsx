import React, { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import { BiBell, BiSearch } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userNotExists } from "../states/Reducers/userReducer";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { server } from "../main";
import { songs } from "./Home";
import Card from "../Components/Card";
import ArtistCard from "../Components/ArtistCard";

const search = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";
  const [searchTerm, setSearchTerm] = useState("");
  const [all, setAll] = useState(true);
  const [songs, setSongs] = useState(false);
  const [playlists, setPlaylists] = useState(false);
  const [albums, setAlbums] = useState(false);
  const [artists, setArtists] = useState(false);
  const [profiles, setProfiles] = useState(false);
  const [genres, setGenres] = useState(false);
  const [users, setUsers] = useState([null]);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    navigate(`/search?${type}=${event.target.value}`);
  };

  // const filteredSongs = songs.filter((song) => {
  //   song.title.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  const filteredSongs = [];

  const logout = () => {
    axios
      .get(`${server}/api/v1/user/logout`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        dispatch(userNotExists(true));
      })
      .catch((err) => console.log(err));
  };
  const colors = [
    "pink",
    "yellow",
    "red",
    "blue",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Green",
  ];

  const filteredUsers = users.filter((user) => {
    return user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/get/all`, { withCredentials: true })
      .then(({ data }) => {
        setUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [users]);

  return (
    <Layout>
      <div className="lay relative w-[62rem] h-[88vh] bg-[#181818] overflow-x-hidden overflow-y-scroll ml rounded-md">
        <div className="h-16 w-full flex bg-[#101010] px-5 items-center justify-between">
          <div className="h-full w-24 px-3 flex items-center gap-3">
            <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#000000]">
              <FaChevronLeft />
            </button>
            <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#070707]">
              <FaChevronRight />
            </button>
          </div>
          <div className="h-full py-2 flex justify-start w-[60vw]">
            <div className="w-full h-full relative">
              <BiSearch className="absolute text-2xl left-3 top-1/2 -translate-y-1/2" />
              <input
                className="h-full w-full bg-[#242424] text-sm text-[#9d9d9d] outline-none focus:ring-2 ring-white ring-inset py-2 p-2 pl-10 border-[1px] border-transparent hover:border-[#565656] rounded-full"
                type="search"
                placeholder="What do you want to listen to ?"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            {user ? (
              <div className="flex gap-3 relative">
                <button className="rounded-full hover:scale-105 flex gap-2 items-center bg-[#242424] px-4 py-2 text-sm text-white font-bold">
                  <FaDownload /> Install App
                </button>
                <button className="rounded-full hover:scale-110 bg-[#242424] p-2 text-white font-bold">
                  <BiBell className="text-xl" />
                </button>
                <button
                  onClick={() => setMenu(!menu)}
                  className="rounded-full w-9 h-9 hover:scale-110 p-1 bg-[#242424] overflow-hidden"
                >
                  <img
                    src="/assets/favicon.ico"
                    alt=""
                    className="w-full h-full"
                  />
                </button>
                {menu && (
                  <div className="w-[14rem] p-2 bg-[#282828] shadow rounded-md absolute z-[999] top-12 right-0 text-zinc-300 flex flex-col">
                    <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex justify-between items-center">
                      Account <FaArrowUpRightFromSquare />
                    </button>
                    <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex justify-between items-center">
                      Profile
                    </button>
                    <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex justify-between items-center">
                      Upgrade to Premium <FaArrowUpRightFromSquare />
                    </button>
                    <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-gray-500 hover:bg-[#3E3E3E] text-sm font-bold flex justify-between items-center">
                      Settings
                    </button>
                    <button
                      onClick={logout}
                      className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex justify-between items-center"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link
                  to="/signup"
                  className="rounded-full text-[#8c8c8c] hover:text-white px-7 py-3 font-bold"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="rounded-full inline-block hover:scale-105 text-black px-6 py-3 bg-white font-bold"
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
        {searchTerm.length > 0 && (
          <div className="flex fixed px-4 gap-2">
            <button
              onClick={() => {
                setAll(true);
                setSongs(false);
                setPlaylists(false);
                setAlbums(false);
                setArtists(false);
                setProfiles(false);
                setGenres(false);
              }}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                all ? "bg-white text-black" : "bg-[#232323] hover:bg-[#353535]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setAll(false);
                setSongs(true);
                setPlaylists(false);
                setAlbums(false);
                setArtists(false);
                setProfiles(false);
                setGenres(false);
                setType("tracks")
                navigate(`/search?tracks=${searchTerm}`);
              }}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                songs
                  ? "bg-white text-black"
                  : "bg-[#232323] hover:bg-[#353535]"
              }`}
            >
              Songs
            </button>
            <button
              onClick={() => {
                setAll(false);
                setSongs(false);
                setPlaylists(true);
                setAlbums(false);
                setArtists(false);
                setProfiles(false);
                setGenres(false);
                setType("playlists")
                navigate(`/search?playlists=${searchTerm}`);
              }}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                playlists
                  ? "bg-white text-black"
                  : "bg-[#232323] hover:bg-[#353535]"
              }`}
            >
              Playlists
            </button>
            <button
              onClick={() => {
                setAll(false);
                setSongs(false);
                setPlaylists(false);
                setAlbums(true);
                setArtists(false);
                setProfiles(false);
                setGenres(false);
                setType("albums")
                navigate(`/search?albums=${searchTerm}`);
              }}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                albums
                  ? "bg-white text-black"
                  : "bg-[#232323] hover:bg-[#353535]"
              }`}
            >
              Albums
            </button>
            <button
              onClick={() => {
                setAll(false);
                setSongs(false);
                setPlaylists(false);
                setAlbums(false);
                setArtists(true);
                setProfiles(false);
                setGenres(false);
                setType("artists")
                navigate(`/search?artists=${searchTerm}`);
              }}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                artists
                  ? "bg-white text-black"
                  : "bg-[#232323] hover:bg-[#353535]"
              }`}
            >
              Artists
            </button>
            <button
              onClick={() => {
                setAll(false);
                setSongs(false);
                setPlaylists(false);
                setAlbums(false);
                setArtists(false);
                setProfiles(false);
                setGenres(true);
                setType("genres")
                navigate(`/search?genres=${searchTerm}`);
              }}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                genres
                  ? "bg-white text-black"
                  : "bg-[#232323] hover:bg-[#353535]"
              }`}
            >
              Genres & Moods
            </button>
            <button
              onClick={() => {
                setAll(false);
                setSongs(false);
                setPlaylists(false);
                setAlbums(false);
                setArtists(false);
                setProfiles(true);
                setGenres(false);
                setType("users")
                navigate(`/search?users=${searchTerm}`)
              }}
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
                profiles
                  ? "bg-white text-black"
                  : "bg-[#232323] hover:bg-[#353535]"
              }`}
            >
              Profiles
            </button>
          </div>
        )}
        <div className="px-4">
          <h1 className="text-2xl font-bold mt-16">Browse All</h1>
          <div className="w-full grid grid-cols-4 gap-4 py-5">
            {filteredSongs.map((item) => (
              <Card song={item} />
            ))}
            {profiles &&
              filteredUsers?.map((item, i) => (
                <ArtistCard artist={item} role="profile" />
              ))}
            {/* {colors.map((color) => (
              <div
                style={{ backgroundColor: color }}
                className="w-full h-[16vh] rounded-xl"
              ></div>
            ))} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default search;
