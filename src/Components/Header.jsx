import axios from "axios";
import { useState } from "react";
import { BiBell } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { server } from "../main";
import { userNotExists } from "../states/Reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
const Header = ({ bgT = false }) => {
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
    <header className="w-full">
      <div
        className={`h-16 w-[56rem] flex ${
          bgT ? "bg-transparent" : "bg-[#101010]"
        } px-4 items-center justify-between fixed top-2 right-2 rounded-tr-md rounded-tl-md z-[98]`}
      >
        <div className="h-full w-24 flex items-center gap-3">
          <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#000000]">
            <FaChevronLeft />
          </button>
          <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#070707]">
            <FaChevronRight />
          </button>
        </div>
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
    </header>
  );
};

export default Header;
