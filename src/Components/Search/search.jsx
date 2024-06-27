import React from 'react'
import Layout from '../../Layout/layout'
import { BiSearch } from 'react-icons/bi';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom'

const search = () => {
  return (
    <Layout>
         <div className='w-3/4 h-[88vh] bg-[#181818] rounded-md'>
         <div className="h-16 w-full flex bg-[#101010] px-5 items-center justify-between">
     <div className="h-full w-24 px-3 flex items-center gap-3">
      <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#000000]"><FaChevronLeft/></button>
      <button className="h-8 w-8 p-2 rounded-full cursor-pointer text-white bg-[#070707]"><FaChevronRight/></button>
     </div>
     <div className="h-full py-2 flex justify-start w-[50vw]">
        <div className="w-full h-full relative">
            <BiSearch className='absolute text-2xl left-3 top-1/2 -translate-y-1/2'/>
     <input 
     className='h-full w-[22vw] bg-[#242424] text-sm text-[#9d9d9d] outline-none focus:ring-2 ring-white ring-inset py-2 p-2 pl-10 border-[1px] border-transparent hover:border-[#565656] rounded-full' 
     type="search" 
     placeholder='What do you want to listen to ?'
     />
     </div>
     </div>
     <div>
      <Link to='/signup' className="rounded-full text-[#8c8c8c] hover:text-white px-7 text-lg py-3 font-bold">Sign up</Link>
      <Link to='/login' className="rounded-full text-black px-7 text-lg py-3 bg-white font-bold">Log in</Link>
     </div>
     </div>
         </div>
    </Layout>
  )
}

export default search