import axios from "axios";
import { useEffect, useState } from "react";
import { BiLogoSpotify } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaPlay } from "react-icons/fa";
import { FaHeart, FaRegFolder } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { LuClock3, LuMinusCircle } from "react-icons/lu";
import { MdAddchart, MdIosShare } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dialog from "../Components/Dialog";
import Header from "../Components/Header";
import Layout from "../Layout/layout";
import { server } from "../main";
import { songs } from "./home";
import PlaylistSongItem from "./PlaylistSongItem";
import { useSelector } from "react-redux";

const Collection = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

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

  return (
    <Layout>
      <div className="lay relative w-[62rem] h-[88vh] bg-gradient-to-b from-[#202020] to-[#121212] overflow-x-hidden overflow-y-scroll ml rounded-md">
        <Header bgT={true} />
        <div className="w-full">
          <div className="w-full px-4 h-[30vh] bg-gradient-to-b pt-20 from-[#525252] to-[#2C2C2C]">
            <div className="flex gap-4 items-end h-full py-4">
              <div className="w-32 h-32 rounded-md bg-l flex items-center justify-center">
                <FaHeart className="text-4xl" />
              </div>
              <div>
                <h4 className="text-xm font-semibold text-zinc-200 ml-1">
                  Playlist
                </h4>
                <button onClick={() => setOpen(true)}>
                  <h1 className="text-8xl tracking-tight font-extrabold mb-3">
                    Liked Songs
                  </h1>
                </button>
                <div>
                  <div className="text-zinc-400 font-semibold text-sm flex items-center ml-1">
                    <Link className="text-sm hover:underline inline-block font-bold">
                      {user?.name}
                    </Link>
                    <span className="w-1 h-1 mx-1 rounded-full bg-zinc-400 inline-block"></span>
                    {user?.likedSongs?.length} Songs
                  </div>
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
                <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <BiLogoSpotify className="text-lg" /> Open in Desktop app
                </button>
              </div>
            )}
            {/* {playlist?.songs?.length > 0 && (
              <button className="play bg-green-600 p-4 rounded-full">
                <FaPlay className="text-black text-xl" />
              </button>
            )} */}
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
                {user?.likedSongs?.map((song,i) => (
                  <PlaylistSongItem key={song?.id} i={i} song={song} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Collection;
