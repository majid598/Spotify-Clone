import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdAddchart } from "react-icons/md";
import { RiMusic2Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../main";
import { FaRegFolder } from "react-icons/fa6";
import { BsPinFill } from "react-icons/bs";
import axios from "axios";
import { LuMinusCircle } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import { TbMusicPlus } from "react-icons/tb";
import { BiPlus } from "react-icons/bi";

const PlaylistItem = ({ playlist }) => {
  const navigate = useNavigate();
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

  const deleteList = () => {
    axios
      .delete(`${server}/api/v1/playlist/delete/${playlist?._id}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contextMenu]);
  return (
    <div className="relative">
      {contextMenu.visible && (
        <div className="w-[17rem] p-1 bg-[#282828] shadow rounded-md fixed z-[999] top-8 left-10 text-zinc-300 flex flex-col">
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <MdAddchart className="text-lg" /> Add to queue
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <CgProfile className="text-lg" /> Remove from profile
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <FiEdit2 className="text-lg" />
            Edit details
          </button>
          <button
            onClick={deleteList}
            className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
          >
            <LuMinusCircle className="text-lg" />
            Delete
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <TbMusicPlus className="text-xl" />
            Create playlist
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <BiPlus className="text-lg" /> Create folder
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <LuMinusCircle className="text-lg" />
            Exclude from your taste profile
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <FaRegFolder className="text-lg" /> Move to folder
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <BsPinFill className="text-lg" /> Pin playlist
          </button>
          <button className="w-full p-3 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <MdIosShare className="text-lg" /> Share
          </button>
        </div>
      )}
      <Link
        onContextMenu={handleRightClick}
        to={`/playlist/${playlist?._id}`}
        className={`w-full ${
          location.pathname === `/playlist/${playlist?._id}`
            ? "bg-[#232323] hover:bg-[#393939]"
            : "hover:bg-[#1A1A1A]"
        } min-h-16 p-2 flex items-center gap-2 rounded-md relative cursor-pointer`}
      >
        <div className="w-12 h-12 rounded-md bg-[#282828] flex items-center overflow-hidden justify-center">
          {playlist?.songs?.length > 0 ? (
            <img src={playlist?.songs[0]?.img} className="w-full h-full" />
          ) : (
            <RiMusic2Line className="text-2xl text-zinc-400" />
          )}
        </div>
        <div>
          <h2 className="font-semibold">{playlist?.name}</h2>
          <div className="mt-1 text-zinc-400 font-semibold text-sm flex items-center">
            Playlist{" "}
            <span className="w-1 h-1 mx-1 rounded-full bg-zinc-400 inline-block"></span>
            {playlist?.user?.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistItem;
