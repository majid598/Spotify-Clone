import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaRegFolder } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { LuMinusCircle } from "react-icons/lu";
import { TbMusicPlus } from "react-icons/tb";
import { TiPinOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import { setFolderName, setFolderOpen, setOpenedFolderId } from "../states/Reducers/SongReducer";

const Folder = ({ folder }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { openedFolderId } = useSelector((state) => state.songs);
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

  const createPlayList = () => {
    axios
      .post(
        `${server}/api/v1/playlist/new/by-folder?folderId=${folder?._id}`,
        { folder: true },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        setMenu(false);
      })
      .catch((err) => console.log(err));
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
  const deleteFolder = () => {
    axios
      .delete(`${server}/api/v1/playlist/delete/folder/${folder?._id}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const pinList = () => {
    axios
      .put(
        `${server}/api/v1/playlist/pin/${playlist?._id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const openFolder = () => {
    dispatch(setOpenedFolderId(folder?._id));
    // dispatch(setFolderOpen(true));
    // dispatch(setFolderName(folder?.name));
    console.log(openedFolderId);
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
        <div className="w-[rem] p-1 bg-[#282828] shadow rounded-md fixed z-[999] top-8 left-10 text-zinc-300 flex flex-col">
          <button className="w-full p-3 pr-10 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <FiEdit2 className="text-lg" />
            Rename
          </button>
          <button
            onClick={deleteFolder}
            className="w-full p-3 pr-10 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
          >
            <LuMinusCircle className="text-lg" />
            Delete
          </button>
          <button
            onClick={pinList}
            className="w-full p-3 pr-10 rounded-sm cursor-default text-start border-b border-[#3E3E3E] hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
          >
            <TiPinOutline className="text-lg" /> Pin Folder
          </button>
          <button
            onClick={createPlayList}
            className="w-full p-3 pr-10 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center"
          >
            <TbMusicPlus className="text-xl" />
            Create playlist
          </button>
          <button className="w-full p-3 pr-10 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <BiPlus className="text-lg" /> Create folder
          </button>
          <button className="w-full p-3 pr-10 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex gap-2 items-center">
            <FaRegFolder className="text-lg" /> Move to folder
          </button>
        </div>
      )}
      <button
        onContextMenu={handleRightClick}
        onClick={openFolder}
        // to={`/playlist/${folder?._id}`}
        className={`w-full ${
          location.pathname === `/playlist/${folder?._id}`
            ? "bg-[#232323] hover:bg-[#393939]"
            : "hover:bg-[#1A1A1A]"
        } min-h-16 p-2 flex items-center gap-2 rounded-md relative cursor-pointer`}
      >
        <div className="w-12 h-12 rounded-md bg-[#282828] flex items-center overflow-hidden justify-center">
          {folder?.playlists?.length > 0 ? (
            <img src={playlist?.songs[0]?.photo} className="w-full h-full" />
          ) : (
            <FaRegFolder className="text-2xl text-zinc-400" />
          )}
        </div>
        <div>
          <h2 className={`font-semibold`}>{folder?.name}</h2>
          <div className="mt-1 text-zinc-400 font-semibold text-sm flex items-center">
            {folder?.PlayLists?.length} Playlists
          </div>
        </div>
      </button>
    </div>
  );
};

export default Folder;
