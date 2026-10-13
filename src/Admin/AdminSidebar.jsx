import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiFolderMusicFill } from "react-icons/ri";


const AdminSidebar = () => {
  return (
    <aside className="basis-[17%] min-h-[calc(100vh-70px)] bg-[#e4e4e4] text-white ">
        <nav className='w-full'>
            <ul className='w-full p-6 '>
                <li>
                    <NavLink 
                    to={"create-album"}
                    className={(isActive)=>`px-4 py-2 flex items-center gap-2 hover:bg-[#a5a5a5] rounded-md cursor-pointer ${isActive?"bg-[#b5b5b5] text-black" : "bg-[#cbcaca] text-black "}` }>
                        <span className='text-lg'><RiFolderMusicFill/></span>
                        <span className='font-semibold '>Create Album</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    </aside>
  )
}

export default AdminSidebar