import axios from "axios";
import { useState } from "react";
import { BiBell, BiSearch } from "react-icons/bi";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaHome,
} from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdDownloadForOffline } from "react-icons/md";
import { GoHome, GoHomeFill } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { server } from "../main";
import { userNotExists } from "../states/Reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
const Header = ({ bgT = false }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);
  const logout = () => {
    axios
      .get(`${server}/api/v1/user/logout`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        dispatch(userNotExists(true));
      })
      .catch((err) => console.log(err));
  };
  return (
    <header className="w-full h-[60px]">
      <div
        className={`h-[60px] fixed top-0 left-0 bg-black z-[99] pt-2 pb-1 flex px-4 items-center justify-between w-full`}
      >
        <div className="w-1/3">
          <div className="w-8">
            <img src="/assets/spotify.png" className="w-full h-full" alt="" />
          </div>
        </div>
        {/* <div className="h-full w-24 flex items-center gap-3">
          <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#000000]">
            <FaChevronLeft />
          </button>
          <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#070707]">
            <FaChevronRight />
          </button>
        </div> */}
        <div className="flex gap-2 h-full items-center">
          <Link
            to={"/"}
            className="p-3 h-full flex items-center group transition-all duration-300 justify-center aspect-square rounded-full bg-[#2A2A2A]"
          >
            {pathname === "/" ? (
              <GoHomeFill className="text-2xl" />
            ) : (
              <GoHome className="text-2xl text-zinc-300 transition-all duration-300 group-hover:text-white" />
            )}
          </Link>
          <div className="h-full flex justify-start w-[30rem]">
            <div className="w-full h-full relative">
              <BiSearch className="absolute text-2xl left-3 top-1/2 -translate-y-1/2" />
              <input
                className="h-full w-full bg-[#242424] text-sm text-[#9d9d9d] outline-none focus:ring-2 ring-white ring-inset py-2 p-2 pl-10 border-[1px] border-transparent hover:border-[#565656] rounded-full"
                type="search"
                placeholder="What do you want to listen to ?"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          {user ? (
            <div className="flex gap-3 relative">
              <button className="rounded-full hover:scale-105 text-black px-4 py-2 text-sm bg-white font-bold">
                Explore Premium
              </button>
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
                {user?.profile ? (
                  <img
                    src={user?.profile}
                    alt=""
                    className="w-full rounded-full h-full"
                  />
                ) : (
                  <div className="w-full rounded-full bg-pink-600 h-full flex items-center justify-center text-xl font-bold">
                    M
                  </div>
                )}
              </button>
              {menu && (
                <div className="w-[14rem] p-1 bg-[#282828] shadow rounded-md absolute z-[999] top-12 right-0 text-zinc-300 flex flex-col">
                  <button className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex justify-between items-center">
                    Account <FaArrowUpRightFromSquare />
                  </button>
                  <Link
                    to={"/profile"}
                    className="w-full p-3 rounded-sm cursor-default text-start hover:bg-[#3E3E3E] text-sm font-bold flex justify-between items-center"
                  >
                    Profile
                  </Link>
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
            <div className="flex items-center h-full pb-1">
              <div className="flex h-full items-center gap-2">
                <Link className="inline-block text-[#8c8c8c] font-bold hover:text-white">
                  Premium
                </Link>
                <Link className="inline-block text-[#8c8c8c] font-bold hover:text-white">
                  Support
                </Link>
                <Link className="inline-block text-[#8c8c8c] font-bold hover:text-white">
                  Download
                </Link>
                <div className="h-6 w-0.5 mx-3 bg-[#8c8c8c]" />
                <Link className="flex gap-2 items-center text-[#8c8c8c] font-bold hover:text-white">
                  <MdDownloadForOffline /> Install App
                </Link>
              </div>
              <Link
                to="/signup"
                className="rounded-full inline-block text-[#8c8c8c] hover:text-white px-7 py-3 font-bold"
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
    </header>
  );
};

export default Header;
