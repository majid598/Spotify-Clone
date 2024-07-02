import React, { useState } from "react";
import Layout from "../Layout/layout";
import { BiBell, BiSearch } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userNotExists } from "../states/Reducers/userReducer";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { server } from "../main";

const search = () => {
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
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DodgerBlue",
    "FireBrick",
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

  const alphabetColors = [
    "Aqua",
    "Beige",
    "Coral",
    "DeepSkyBlue",
    "Eggshell",
    "FloralWhite",
    "Gainsboro",
    "Honeydew",
    "Ivory",
    "Jasmine",
    "Khaki",
    "Lavender",
    "MintCream",
    "NavajoWhite",
    "OldLace",
    "PeachPuff",
    "Quartz",
    "Rose",
    "Seashell",
    "Thistle",
    "Ultramarine",
    "Vanilla",
    "WhiteSmoke",
    "Xanadu",
    "Yellow",
    "Zinc",
  ];

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
        <div className="px-4 py-10">
          <h1 className="text-2xl font-bold">Browse All</h1>
          <div className="w-full grid grid-cols-4 gap-4 py-5">
            {colors.map((color) => (
              <div
                style={{ backgroundColor: color }}
                className="w-full h-[16vh] rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default search;
