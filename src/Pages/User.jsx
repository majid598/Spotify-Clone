import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCopy, FaUserPlus } from "react-icons/fa";
import { LuClock3, LuMinusCircle } from "react-icons/lu";
import { MdOutlineReport } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import Dialog from "../Components/Dialog";
import Header from "../Components/Header";
import Layout from "../Layout/layout";
import { server } from "../main";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

const User = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const { user: me } = useSelector((state) => state.auth);

  const save = () => {};
  const follow = () => {
    axios
      .get(`${server}/api/v1/user/follow/${id}`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        setMenu(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/get/${id}`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <Layout>
      <div className="lay relative w-[62rem] h-[88vh] bg-gradient-to-b from-[#202020] to-[#121212] overflow-x-hidden overflow-y-scroll ml rounded-md">
        <Header bgT={true} />
        <div className="w-full">
          <div className="w-full px-4 h-[30vh] bg-gradient-to-b pt-20 from-[#525252] to-[#2C2C2C]">
            <div className="flex gap-4 items-end h-full py-4">
              <div className="w-32 h-32 rounded-full bg-[#282828] overflow-hidden">
                {user?.profile && (
                  <img src={user?.profile} className="w-full h-full" alt="" />
                )}
              </div>
              <div>
                <h4 className="text-xm font-semibold text-zinc-200 ml-1">
                  Profile
                </h4>
                <h1 className="text-8xl tracking-tight font-extrabold mb-3">
                  {user?.name}
                </h1>
                <div>
                  <div className="text-zinc-300 mt-8 font-semibold text-sm flex items-center ml-1">
                    <Link className="text-sm hover:underline inline-block font-bold">
                      {user?.playLists?.length} Public playlists
                    </Link>
                    <span className="w-1 h-1 mx-1 rounded-full bg-zinc-400 inline-block"></span>
                    {user?.followers?.length} followers
                    <span className="w-1 h-1 mx-1 rounded-full bg-zinc-400 inline-block"></span>
                    {user?.following?.length} Following
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative py-2 m-5 flex justify- gap-5 items-center">
            <button
              onClick={follow}
              className="rounded-full border border-zinc-500 hover:scale-105 hover:border-white px-4 font-bold text-sm py-1.5"
            >
              {user?.followers?.includes(me?._id) ? "Following" : "Follow"}
            </button>
            {menu && (
              <div
                onClick={follow}
                className="p-1 bg-[#282828] shadow rounded-md absolute z-[999] top-12 left-24 text-zinc-300 flex flex-col"
              >
                <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  {user?.followers?.includes(me?._id) ? (
                    <>
                      <IoMdClose className="text-lg text-[#1ED760]" /> Unfollow
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="text-lg" /> Follow
                    </>
                  )}
                </button>
                <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <LuMinusCircle className="text-lg" /> Block
                </button>
                <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <MdOutlineReport className="text-lg" /> Report
                </button>
                <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
                  <FaRegCopy className="text-lg" /> Copy link to profile
                </button>
              </div>
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
                {/* {playlist?.songs?.map((song,i) => (
                  <PlaylistSongItem key={song?.id} i={i} song={song} />
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
