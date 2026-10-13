import React from "react";
import { BiSolidAlbum } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const AlbumLandingSidebar = () => {
  return (
    <aside className="basis-[17%] bg-[#e4e4e4] text-white min-h-[calc(100vh-70px)]">
      <nav className="w-full px-5 py-3">
        <ul className="w-full flex flex-col  ">
          <li className="py-2 px-6 bg-[#b8b8b8] text-black mb-3 rounded flex items-center gap-3">
            <span className="text-xl">
              <GiHamburgerMenu />
            </span>
            <span className="text-lg tracking-wider">Explore</span>
          </li>
          <li>
            <NavLink
            to={"/"}
              end
              className={({ isActive }) =>
                `${
                  isActive ? "bg-[#8e8e8e] hover:bg-[gray] text-black" : ""
                } py-2 px-6 bg-[#b8b8b8] hover:bg-[gray] text-black cursor-pointer flex items-center gap-2 rounded `
              }
            >
              <BiSolidAlbum />
              <span >Popular albums</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AlbumLandingSidebar;