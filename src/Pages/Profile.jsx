import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { LuClock3 } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Layout from "../Layout/layout";
import Dialog from "../Components/Dialog";
import axios from "axios";
import { server } from "../main";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name);

  const save = () => {
    axios
      .put(
        `${server}/api/v1/user/me/profile/edit`,
        { name },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        setName("");
        setOpen(false);
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
              <div className="w-32 h-32 rounded-md bg-[#282828]"></div>
              <div>
                <h4 className="text-xm font-semibold text-zinc-200 ml-1">
                  Profile
                </h4>
                <button onClick={() => setOpen(true)}>
                  <h1 className="text-8xl tracking-tight font-extrabold mb-3">
                    {user?.name}
                  </h1>
                </button>
                <div>
                  <div className="text-zinc-300 mt-4 font-semibold text-sm flex items-center ml-1">
                    <Link className="text-sm hover:underline inline-block font-bold">
                      {user?.playLists?.length} Public playlists
                    </Link>
                    <span className="w-1 h-1 mx-1 rounded-full bg-zinc-400 inline-block"></span>
                    0 Following
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full relative py-2 m-5 flex justify- gap-5 items-center">
            {menu && (
              <div className="p-1 bg-[#282828] shadow rounded-md absolute z-[999] top-12 left-0 text-zinc-300 flex flex-col">
                <button
                  onClick={() => {
                    setOpen(true);
                    setMenu(false);
                  }}
                  className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
                >
                  <FiEdit2 className="text-lg" /> Edit profile
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
      {open && (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="w-[30rem]">
            <h1 className="text-2xl mb-2 font-bold">Edit details</h1>
            <div className="flex w-full gap-4 mt-3">
              <div className="w-2/5 flex items-center h-48 shadow-sm rounded-full bg-[#282828]"></div>
              <div className="w-3/5 h-48 flex flex-col items-end justify-center gap-y-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 px-3 w-full rounded-md focus:bg-[#333333] text-sm focus:border-zinc-600 font-bold placeholder:text-zinc-400 bg-[#3E3E3E] border-2 border-transparent outline-none"
                />
                <button
                  onClick={save}
                  className="px-8 rounded-full hover:scale-105 py-3 bg-white text-black font-bold"
                >
                  Save
                </button>
              </div>
            </div>
            <p className="text-xs font-bold mt-3">
              By proceeding, you agree to give Spotify access to the image you
              choose to upload. Please make sure you have the right to upload
              the image.
            </p>
          </div>
        </Dialog>
      )}
    </Layout>
  );
};

export default Profile;
