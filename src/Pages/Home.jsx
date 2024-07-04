import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import SongBar from "../Components/SongBar";
import Card from "../Components/Card";
import Layout from "../Layout/layout";
import { server } from "../main";
import { setCurrentSong, setPlaylistId } from "../states/Reducers/SongReducer";
import { userNotExists } from "../states/Reducers/userReducer";
import ArtistCard from "../Components/ArtistCard";
import { FaHeart, FaPause, FaPlay } from "react-icons/fa";
import useAudioPlayer from "../Components/useAudioPlayer";

export const song = {
  id: 1234567890,
  title: "Pehle bhi mein",
  artist: "Emma heesters",
  mp3: new Audio("/asets/mp3/mein.mp3"),
  img: "/assets/images.jpg",
};

export const songs = [
  {
    id: "1234567412340",
    title: "Pehle bhi mein",
    artist: "Emma heesters",
    url: "/assts/mp3/mein.mp3",
    img: "/assets/images.jpg",
  },
  {
    id: "12345316785590",
    title: "Heeriye",
    artist: "Arijit Singh",
    url: "/assets/mp3/heeriye.mp3",
    img: "/assets/Arijit-4.jpg",
  },
  {
    id: "1425431544567890",
    title: "Pal kesa pal",
    artist: "Arijit Singh",
    url: "/assets/mp3/pal.mp3",
    img: "/assets/Arijit-3.jpg",
  },
  {
    id: "12fasd72435890",
    title: "Kalnak - Title Track",
    artist: "Arijit Singh",
    url: "/assets/mp3/kalank.mp3",
    img: "/assets/kalank.jpeg",
  },
];

export const artists = [
  {
    id: Math.random(),
    name: "Arijit singh",
    profile: "/assets/Arijit-3.jpg",
  },
  {
    id: Math.random(),
    name: "Emma heesters",
    profile: "/assets/images.jpg",
  },
];

const Home = ({ user }) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [all, setAll] = useState(true);
  const [music, setMusic] = useState(false);
  const { currentSong, isPlaying, playlistId } = useSelector(
    (state) => state.songs
  );
  const { togglePlayPause } = useAudioPlayer();
  const [playlists, setPlaylists] = useState([null]);

  const logout = () => {
    axios
      .get(`${server}/api/v1/user/logout`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        dispatch(userNotExists(true));
      })
      .catch((err) => console.log(err));
  };

  const handlePlay = () => {
    if (currentSong && currentSong.id === user?.likedSongs[0].id && isPlaying) {
      togglePlayPause();
    } else {
      dispatch(setCurrentSong(user?.likedSongs[0]));
      dispatch(setPlaylistId("likeSongs"));
    }
  };

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
    <Layout>
      <div className="lay relative w-[62rem] h-[88vh] pt-20 bg-[#181818] overflow-x-hidden overflow-y-scroll pb-40 rounded-md">
        <Header />
        <div className="flex fixed px-4 gap-2">
          <button
            onClick={() => {
              setAll(true);
              setMusic(false);
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
              setMusic(true);
            }}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 ${
              music ? "bg-white text-black" : "bg-[#232323] hover:bg-[#353535]"
            }`}
          >
            Music
          </button>
        </div>
        <div className="grid grid-cols-2 mt-16 gap-2 px-4">
          <button
            to={"/collection/tracks"}
            className={`like w-full hover:bg-[#] overflow-hidden bg-[#333333] h-12 flex pr-2 items-center justify-between rounded-md relative cursor-pointer`}
          >
            <div className="flex items-center gap-x-2 h-full">
              <div className="w-14 h-full bg-l flex items-center justify-center">
                <FaHeart />
              </div>
              <h2 className="font-bold text-sm">Liked Songs</h2>
            </div>
            <button>
              <button
                onClick={handlePlay}
                className="play bg-green-600 p-2.5 transition-all duration-300 opacity-0 rounded-full"
              >
                {isPlaying && playlistId === "likeSongs" ? (
                  <FaPause className="text-black" />
                ) : (
                  <FaPlay className="text-black" />
                )}
              </button>
            </button>
          </button>
          <button
            to={"/collection/tracks"}
            className={`like w-full hover:bg-[#] overflow-hidden bg-[#333333] h-12 flex pr-2 items-center justify-between rounded-md relative cursor-pointer`}
          >
            <div className="flex items-center gap-x-2 h-full">
              <div className="w-14 h-full flex items-center justify-center">
                <img
                  src={playlists?.length > 0 && playlists[0]?.songs[0]?.img}
                  className="w-full h-full"
                  alt=""
                />
              </div>
              <h2 className="font-bold text-sm">
                {playlists?.length > 0 && playlists[0]?.name}
              </h2>
            </div>
            <button>
              <button
                onClick={() => {
                  if (
                    currentSong &&
                    currentSong.id === playlists?.length > 0 &&
                    playlists[0]?.songs[0].id &&
                    isPlaying
                  ) {
                    togglePlayPause();
                  } else {
                    dispatch(
                      setCurrentSong(
                        playlists?.length > 0 && playlists[0]?.songs[0]
                      )
                    );
                    dispatch(
                      setPlaylistId(playlists?.length > 0 && playlists[0]?._id)
                    );
                  }
                }}
                className="play bg-green-600 p-2.5 transition-all duration-300 opacity-0 rounded-full"
              >
                {isPlaying &&
                playlistId === playlists?.length > 0 &&
                playlists[0]?._id ? (
                  <FaPause className="text-black" />
                ) : (
                  <FaPlay className="text-black" />
                )}
              </button>
            </button>
          </button>
          <div className="w-full h-12 rounded-md bg-red-600"></div>
          <div className="w-full h-12 rounded-md bg-red-600"></div>
        </div>
        {music && (
          <>
            <div className="cards w-full grid grid-cols-5 p-8 px-0">
              {songs.map((song) => {
                return <Card key={song.id} song={song} />;
              })}
            </div>
          </>
        )}
        {all && (
          <>
            <div className="h-14 flex justify-between mt-8 relative items-center px-4">
              <span className="text-2xl font-bold">Made For {user?.name}</span>
              <span className="text-sm font-bold opacity-60">Show all</span>
            </div>
            <div className="cards w-full grid grid-cols-5 px-0">
              {songs.map((song) => {
                return <Card key={song.id} song={song} />;
              })}
            </div>
            <div className="h-14 flex justify-between mt-8 relative items-center px-4">
              <span className="text-2xl font-bold">Popular Artists</span>
              <span className="text-sm font-bold opacity-60">Show all</span>
            </div>
            <div className="cards w-full grid grid-cols-5 px-0">
              {artists.map((artist) => {
                return <ArtistCard key={artist.id} artist={artist} />;
              })}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
