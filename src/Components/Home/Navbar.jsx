import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaHotjar,
  FaList,
  FaUser,
} from "react-icons/fa";
import { RiLoginBoxFill, RiRegisteredFill } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userData");
    if (userDataFromStorage) {
      setUserData(JSON.parse(userDataFromStorage));
    }
  }, [])

  const handelProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };

  return (
    <div className="w-full h-[50px]">
      <div className="w-full h-full flex items-center justify-between px-6">
        <Link
          to="/"
          className="w-auto h-auto bg-orange-500 bg-opacity-40 hover:bg-opacity-60 cursor-pointer text-gray-700 p-2 hover:text-white duration-100 ease-in-out"
        >
          <h1 className="text-base font-semibold ">Crusty Crank</h1>
        </Link>
        <div className="w-auto h-full hidden md:flex items-center justify-between gap-3 px-2 py-1 rounded-sm">
          <Link
            to="/"
            className="w-32 h-10 bg-orange-700 bg-opacity-30 hover:bg-opacity-60 flex items-center justify-center gap-2 text-gray-700 hover:text-white duration-100 ease-in-out cursor-pointer"
          >
            <FaHome className="text-xl" />
            <p className="text-base font-semibold ">Home</p>
          </Link>
          <button className="w-32 h-10 bg-orange-700 bg-opacity-30 hover:bg-opacity-60 flex items-center justify-center gap-2 text-gray-700 hover:text-white duration-100 ease-in-out cursor-pointer">
            <FaHotjar className="text-xl" />
            <p className="text-base font-semibold ">Trending</p>
          </button>
          <button className="w-32 h-10 bg-orange-700 bg-opacity-30 hover:bg-opacity-60 flex items-center justify-center gap-2 text-gray-700 hover:text-white duration-100 ease-in-out cursor-pointer">
            <FaHeart className="text-xl" />
            <p className="text-base font-semibold ">Popular</p>
          </button>
        </div>
        {!userData && (
          <div className="w-auto h-full flex items-center justify-between gap-3 px-2 py-1 rounded-sm">
            <Link
              to="/user/login"
              className="w-24 h-10 bg-orange-700 bg-opacity-30 hover:bg-opacity-60 flex items-center justify-center gap-2 text-gray-700 hover:text-white duration-100 ease-in-out cursor-pointer"
            >
              <RiLoginBoxFill className="text-xl" />
              <p className="text-base font-semibold ">Login</p>
            </Link>
            <Link
              to="/user/register"
              className="w-28 h-10 bg-orange-700 bg-opacity-30 hover:bg-opacity-60 flex items-center justify-center gap-2 text-gray-700 hover:text-white duration-100 ease-in-out cursor-pointer"
            >
              <RiRegisteredFill className="text-xl" />
              <p className="text-base font-semibold ">Register</p>
            </Link>
          </div>
        )}
        {userData && (
          <div className="md:relative">
            <div
              onClick={handelProfileModal}
              className="w-auto h-auto py-2 px-4 flex items-center gap-2 border-b border-orange-600 border-opacity-40 cursor-pointer"
            >
              <p className="text-base font-semibold">
                {userData.userData.username}
              </p>
              <img
                src={userData.userData.image}
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <AnimatePresence>
              {isProfileModalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-screen md:w-[260px] md:h-auto bg-gray-500 bg-opacity-90 fixed md:top-16 md:right-8 top-0 right-0 p-2 z-[999] space-y-2"
                >
                  <div className="w-full h-16 md:h-10 bg-gray-400 flex items-center justify-center gap-2 text-white">
                    <FaUser size={19} />{" "}
                    <h1 className="text-lg md:text-sm font-semibold">
                      Profile
                    </h1>
                  </div>
                  <div className="w-full h-16 md:h-10 bg-gray-400 flex items-center justify-center gap-2 text-white">
                    <FaList size={20} />
                    <h1 className="text-lg md:text-sm font-semibold">
                      My Listings
                    </h1>
                  </div>
                  <Link
                    to={`/recipe/create/${userData.userData._id}`}
                    className="w-full h-16 md:h-10 bg-gray-400 flex items-center justify-center gap-2 text-white"
                  >
                    <IoCreate size={24} />
                    <h1 className="text-lg md:text-sm font-semibold">
                      Create Post
                    </h1>
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      window.location.reload();
                    }}
                    className="w-full h-16 md:h-10 bg-gray-400 flex items-center justify-center gap-2 text-white"
                  >
                    <FiLogOut size={24} />
                    <h1 className="text-lg md:text-sm font-semibold">
                      Logout
                    </h1>
                  </button>
                  <button
                    onClick={handelProfileModal}
                    className="absolute bottom-0 left-0 md:hidden w-full h-16 md:h-10 bg-gray-400 flex items-center justify-center gap-2 text-white"
                  >
                    <h1 className="text-lg md:text-sm font-semibold">close</h1>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
