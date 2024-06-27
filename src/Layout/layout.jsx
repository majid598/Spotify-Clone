import React from 'react'
import Sidebar from '../Components/Sidebar/sidebar'

const layout = ({children}) => {
  return (
    <div className='w-full flex h-screen text-white p-2'>
        <Sidebar/>
        {children}
    </div>
  )
}

export default layout