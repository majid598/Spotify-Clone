import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { LuSearch } from "react-icons/lu";
import {BiLibrary, BiPlus} from "react-icons/bi"
import { Link } from 'react-router-dom';

const sidebar = () => {
  return (
    <div className='w-1/4 mr-2 flex flex-col gap-2'>
       <div className="uper flex items-center p-5 bg-[#101010] rounded-md w-full">
         <ul className='flex flex-col gap-5'>
          <li className='w-[85px]'><Link to='/'><img src="./assets/spotify.png" alt="" /></Link></li>
          <li className='flex gap-4 items-end font-bold'><GoHomeFill className='text-[30px]'/><Link className='hover:underline' to='/'>Home</Link></li>
          <li className='flex gap-5 items-end transition-all duration-300 opacity-70 hover:opacity-100 font-bold'><LuSearch className='text-2xl'/><Link className='hover:underline' to='/search'>Search</Link></li>
         </ul>
       </div>
       <div className="down bg-[#101010] overflow-hidden rounded-md w-full h-[65vh]">
          <div className="nav w-full h-14 px-5 flex items-center justify-between">
            <button className='flex font-bold items-end opacity-70 hover:opacity-100 transition-all duration-300'><BiLibrary className='text-2xl'/><span>Your Library</span></button>
            <button className='rounded-full hover:bg-[#1E1E1E] p-1'><BiPlus className='text-xl font-bold'/></button>
          </div>
          <div id='playlists' className="w-full h-[30vh] px-2 py-3 flex flex-col gap-5 overflow-x-hidden overflow-y-scroll">
          <div className="w-full h-[18vh] flex flex-col gap-2 bg-[#242424] p-5 rounded-md">
            <h2 className='font-bold'>Create your first playlist</h2>
            <span className='font-semibold text-sm opacity-80'>it's easy, we'll help you</span>
            <button className='px-2 py-1 mt-2 bg-white w-32 text-[#343434] font-bold rounded-full text-sm'>Create playlist</button>
          </div>
          <div className="w-full h-[18vh] flex flex-col gap-2 bg-[#242424] p-5 rounded-md">
            <h2 className='font-bold'>Let's find some podcasts to follow</h2>
            <span className='font-semibold text-sm opacity-80'>We'll keep you updated on new episods</span>
            <button className='px-2 py-1 mt-2 bg-white w-32 text-[#343434] font-bold rounded-full text-sm'>Create playlist</button>
          </div>
          </div>
          <div className="footer h-[27vh] bg-[#101010]"></div>
       </div>
    </div>
  )
}

export default sidebar