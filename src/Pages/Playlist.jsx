import axios from "axios";
import { useEffect, useState } from "react";
import { BiLogoSpotify } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { FaPause, FaRegFolder } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { LuClock3, LuMinusCircle } from "react-icons/lu";
import { MdAddchart, MdIosShare } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dialog from "../Components/Dialog";
import Header from "../Components/Header";
import Layout from "../Layout/layout";
import { server } from "../main";
import { songs } from "./Home";
import PlaylistSongItem from "./PlaylistSongItem";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../states/Reducers/SongReducer";
import useAudioPlayer from "../Components/useAudioPlayer";

const Playlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState(null);
  const [name, setName] = useState(playlist?.name);
  const [desc, setDesc] = useState(playlist?.description);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [menu, setMenu] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const { id } = useParams();
  const { currentSong, isPlaying } = useSelector((state) => state.songs);
  const { togglePlayPause } = useAudioPlayer();

  const save = () => {
    axios
      .put(
        `${server}/api/v1/playlist/edit/${id}`,
        { name, description: desc },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        setName("");
        setDesc("");
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteList = () => {
    axios
      .delete(`${server}/api/v1/playlist/delete/${id}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        setMenu(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  const addToPlayList = (song) => {
    axios
      .post(
        `${server}/api/v1/playlist/add-to-playlist/${id}`,
        {
          id: song.id,
          title: song.title,
          artist: song.artist,
          url: song.url,
          img: song.img,
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
        setMenu(false);
      })
      .catch((err) => console.log(err));
  };

  const openSpotify = () => {
    const spotifyUri =
      "spotify:track:https://open.spotify.com/playlist/7dwKZVAukGA6px7xIkXq1f?si=52cbdc855c2b4054&pt=d6a6ea29c00c806a20fbebf940f782a8"; // Example: 'spotify:track:3n3Ppam7vgaVa1iaRUc9Lp'

    // Open Spotify desktop app
    window.location.href = spotifyUri;
  };

  const handlePlayFirstSong = () => {
    if (currentSong && isPlaying) {
      togglePlayPause();
    } else {
      dispatch(setCurrentSong(playlist?.songs[0]));
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/api/v1/playlist/get/${id}`, { withCredentials: true })
      .then(({ data }) => {
        // console.log(data);
        setPlaylist(data.playList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [playlist, axios]);
  return (
    <Layout>
      <div className="lay relative w-[62rem] h-[88vh] bg-gradient-to-b from-[#202020] to-[#121212] overflow-x-hidden overflow-y-scroll ml rounded-md">
        <Header bgT={true} />
        <div className="w-full">
          <div className="w-full px-4 h-[30vh] bg-gradient-to-b pt-20 from-[#525252] to-[#2C2C2C]">
            <div className="flex gap-4 items-end h-full py-4">
              <div className="w-32 h-32 rounded-md bg-[#282828] overflow-hidden">
                {playlist?.songs?.length > 0 && (
                  <img
                    src={playlist?.songs[0]?.img}
                    className="w-full h-full"
                  />
                )}
              </div>
              <div>
                <h4 className="text-xm font-semibold text-zinc-200 ml-1">
                  Playlist
                </h4>
                <button onClick={() => setOpen(true)}>
                  <h1 className="text-8xl tracking-tight font-extrabold mb-3">
                    {playlist?.name}
                  </h1>
                </button>
                {playlist?.description && (
                  <p className="font-bold text-xs text-zinc-400 ml-1 mt-2">
                    {playlist?.description}
                  </p>
                )}
                <div>
                  <Link className="text-sm hover:underline inline-block font-bold ml-1 mt-3">
                    {playlist?.user?.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative py-2 m-5 flex justify- gap-5 items-center">
            {menu && (
              <div className="w-[17rem] p-1 bg-[#282828] shadow rounded-md absolute z-[999] top-12 left-0 text-zinc-300 flex flex-col">
                <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <MdAddchart className="text-lg" /> Add to queue
                </button>
                <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <CgProfile className="text-lg" /> Remove from profile
                </button>
                <button
                  onClick={() => {
                    setOpen(true);
                    setMenu(false);
                  }}
                  className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
                >
                  <FiEdit2 className="text-lg" /> Edit details
                </button>
                <button
                  onClick={deleteList}
                  className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
                >
                  <LuMinusCircle className="text-lg" /> Delete
                </button>
                <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <RiCloseCircleLine className="text-xl" /> Exclude from your
                  taste profile
                </button>
                <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <FaRegFolder className="text-lg" /> Move to folder
                </button>
                <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <MdIosShare className="text-lg" /> Share
                </button>
                <button
                  onClick={openSpotify}
                  className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
                >
                  <BiLogoSpotify className="text-lg" /> Open in Desktop app
                </button>
              </div>
            )}
            {playlist?.songs?.length > 0 && (
              <button
                onClick={handlePlayFirstSong}
                className="play bg-green-600 p-4 rounded-full"
              >
                {isPlaying ? (
                  <FaPause className="text-black text-xl" />
                ) : (
                  <FaPlay className="text-black text-xl" />
                )}
              </button>
            )}
            <button
              onClick={() => setMenu(!menu)}
              className="btn hover:scale-105 flex gap-1 py-3"
            >
              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
              <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
            </button>
          </div>
          <div className="w-full px-5 mt-4">
            <div className="w-full mt-6">
              <div className="w-full grid border-b pb-1 border-zinc-700 px-2 grid-col-5 text-zinc-400 font-bold">
                <div className="w-full text-2xl flex items-center">#</div>
                <div className="w-full flex items-center text-sm">Title</div>
                <div className="w-full flex items-center text-sm">Album</div>
                <div className="w-full flex items-center text-sm">
                  Date added
                </div>
                <div className="w-full flex items-center">
                  <LuClock3 />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                {playlist?.songs?.map((song, i) => (
                  <PlaylistSongItem key={song?.id} i={i} song={song} />
                ))}
              </div>
            </div>
          </div>
          <div className="w-full px-5 mt-20">
            <h1 className="text-2xl font-bold">Recommended</h1>
            <h3 className="text-sm font-bold text-zinc-400">
              Based on the title of this playlist
            </h3>
            <div className="w-full flex flex-col mt-6 pb-40">
              {songs.map(
                (song) =>
                  song.id !== playlist?.songs?.map((item) => item.id) && (
                    <div className="w-full hover min-h-16 p-2 flex items-center justify-between pr-5 rounded-md hover:bg-[#2A2A2A] cursor-pointer">
                      <div className="flex gap-2 items-center">
                        <div className="w-12 overflow-hidden h-12 rounded-md bg-l flex items-center justify-center">
                          <img src={song.img} alt="" />
                        </div>
                        <div className="flex flex-col">
                          <Link
                            to={`/track/${song.id}`}
                            className="font-semibold hover:underline"
                          >
                            {song.title}
                          </Link>
                          <Link className="text-sm text-zinc-400 hover:underline font-semibold">
                            {song.artist}
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={() => addToPlayList(song)}
                        className="px-4 rounded-full py-1.5 text-sm font-bold border border-zinc-400 hover:border-white hover:scale-105"
                      >
                        Add
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
        {open && (
          <Dialog open={open} onClose={() => setOpen(false)}>
            <div className="w-[30rem]">
              <h1 className="text-2xl mb-2 font-bold">Edit details</h1>
              {err && (
                <div className="w-full bg-red-600 py-2 text-xs font-semibold text-zinc-300 px-4 rounded-md">
                  {errMsg}
                </div>
              )}
              <div className="flex w-full gap-4 mt-3">
                <div className="w-2/5 h-48 shadow-sm bg-[#282828] rounded-md"></div>
                <div className="w-3/5 h-48 flex flex-col gap-y-4">
                  <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 px-3 rounded-md focus:bg-[#333333] text-sm focus:border-zinc-600 font-bold placeholder:text-zinc-400 bg-[#3E3E3E] border-2 border-transparent outline-none"
                  />
                  <textarea
                    className="p-2 px-3 resize-none focus:bg-[#333333] h-32 text-sm focus:border-zinc-600 rounded-md placeholder:text-zinc-400 font-bold bg-[#3E3E3E] border-2 border-transparent outline-none"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Add an optional description"
                  ></textarea>
                </div>
              </div>
              <div className="w-full flex justify-end py-2">
                <button
                  onClick={save}
                  className="px-8 rounded-full hover:scale-105 py-3 bg-white text-black font-bold"
                >
                  Save
                </button>
              </div>
              <p className="text-xs font-bold">
                By proceeding, you agree to give Spotify access to the image you
                choose to upload. Please make sure you have the right to upload
                the image.
              </p>
            </div>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default Playlist;
