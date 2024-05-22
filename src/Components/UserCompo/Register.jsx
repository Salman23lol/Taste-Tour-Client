import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { Link } from'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleIconClick = (inputId) => {
    document.getElementById(inputId).focus();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URI}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if(response.ok){
      Swal.fire({
        title: "Registered Successful!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-[500px]">
      <form
        onSubmit={handleSubmit}
        className="w-full mx-2 sm:mx-0 sm:w-1/2 h-[80%] bg-orange-500 bg-opacity-30 shadow-md rounded-sm p-4 flex flex-col items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex items-center justify-between gap-2 bg-orange-400 bg-opacity-25 text-gray-500">
            <FaUser
              className="cursor-pointer ml-2"
              onClick={() => handleIconClick("username")}
            />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 w-full outline-none rounded-sm bg-transparent placeholder:text-white"
              placeholder="Username"
              required
            />
          </div>
          <div className="w-full flex items-center justify-between gap-2  bg-orange-400 bg-opacity-25 text-gray-500">
            <FaEnvelope
              className="cursor-pointer ml-2"
              onClick={() => handleIconClick("email")}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 w-full outline-none rounded-sm bg-transparent placeholder:text-white"
              placeholder="Email"
              required
            />
          </div>
          <div className="w-full flex items-center justify-between gap-2  bg-orange-400 bg-opacity-25 text-gray-500">
            <FaLock
              className="cursor-pointer ml-2"
              onClick={() => handleIconClick("password")}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 w-full outline-none rounded-sm bg-transparent placeholder:text-white"
              placeholder="Password"
              required
            />
          </div>
          <div className="w-full flex items-center justify-between gap-2  bg-orange-400 bg-opacity-25 text-gray-500">
            <FaImage
              className="cursor-pointer ml-2"
              onClick={() => handleIconClick("profileImage")}
            />
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 w-full outline-none rounded-sm bg-transparent placeholder:text-white"
              required
            />
          </div>
          </div>
          <Link to="/user/login">Already have Account?</Link>
        <button
          type="submit"
          className="w-full mb-2 bg-orange-600 bg-opacity-30 hover:bg-opacity-50 text-white py-2 rounded-sm focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
