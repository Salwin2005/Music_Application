import React from "react";
import { NavLink } from "react-router-dom";
import { MdAccountBox, MdAccountCircle } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

const ProfileSidebar = () => {
  return (
    <aside className="basis-[17%] bg-[#e4e4e4] shadow h-[calc(100vh-70px)]">
      <nav className="w-full">
        <ul className="w-full p-5 flex flex-col">
          <li>
            <NavLink
              end
              to="/user/profile"
              className={({ isActive }) =>
                `flex py-2 px-4 rounded-md cursor-pointer items-center gap-2 mb-4 font-semibold ${
                  isActive
                    ? " bg-[#aae5b8] text-black"
                    : "bg-[#cbcaca] text-black hover:bg-[#939393]"
                }`
              }
            >
              <span className="text-xl">
                <MdAccountBox />
              </span>
              <span>My Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/profile/add-profile"
              className={({ isActive }) =>
                `flex py-2 px-4 rounded-md cursor-pointer items-center gap-2 mb-4 font-semibold ${
                  isActive
                    ? " bg-[#aae5b8] text-black"
                    : "bg-[#cbcaca] text-black hover:bg-[#939393]"
                }`
              }
            >
              <span className="text-xl">
                <FaUserPlus />
              </span>
              <span>Add Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/profile/upload-profile-photo"
              className={({ isActive }) =>
                `flex py-2 px-4 rounded-md cursor-pointer items-center gap-2 mb-4 font-semibold ${
                  isActive
                    ? " bg-[#aae5b8] text-black"
                    : "bg-[#cbcaca] text-black hover:bg-[#939393]"
                }`
              }
            >
              <span className="text-xl">
                <MdAddPhotoAlternate />
              </span>
              <span>Add Profile Photo</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/profile/change-password"
              className={({ isActive }) =>
                `flex py-2 px-4 rounded-md cursor-pointer items-center gap-2 mb-4 font-semibold ${
                  isActive
                    ? " bg-[#aae5b8] text-black"
                    : "bg-[#cbcaca] text-black hover:bg-[#939393]"
                }`
              }
            >
              <span className="text-xl">
                <RiLockPasswordFill />
              </span>
              <span>Change Password</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/profile/delete-account"
              className={({ isActive }) =>
                `flex py-2 px-4 rounded-md cursor-pointer items-center gap-2 mb-4 font-semibold ${
                  isActive
                    ? " bg-[#aae5b8] text-black"
                    : "bg-[#cbcaca] text-black hover:bg-[#939393]"
                }`
              }
            >
              <span className="text-xl">
                <MdDelete />
              </span>
              <span>Delete Account</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
