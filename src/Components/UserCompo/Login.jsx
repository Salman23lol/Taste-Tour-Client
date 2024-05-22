import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      sessionStorage.setItem("Token", data.token);

      Swal.fire({
        title: "Login Successful!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/"; // Redirect to homepage
        }
      });
    } catch (error) {
      console.error("Error logging in:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="w-full flex items-center justify-center h-[500px]">
      <form
        onSubmit={handleSubmit}
        className="w-1/2 h-[60%] bg-orange-500 bg-opacity-40 shadow-md rounded-sm p-4 flex flex-col items-center justify-between"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="w-full flex flex-col gap-5">
          <div
            className={`w-full flex items-center justify-between gap-2 ${
              isPasswordFocused ? "bg-green-50" : "bg-orange-50"
            }`}
          >
            <FaEnvelope
              className="text-gray-500 cursor-pointer ml-2"
              onClick={() => handleIconClick("password")}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="p-2 w-full outline-none rounded-sm bg-transparent"
              placeholder="Email"
              required
            />
          </div>
          <div
            className={`w-full flex items-center justify-between gap-2 ${
              isPasswordFocused ? "bg-green-50" : "bg-orange-50"
            }`}
          >
            <FaLock
              className="text-gray-500 cursor-pointer ml-2"
              onClick={() => handleIconClick("password")}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="p-2 w-full outline-none rounded-sm bg-transparent"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <Link to="/user/register">Don't have Account?</Link>
        <button
          type="submit"
          className="w-full mb-2 bg-orange-600 bg-opacity-30 hover:bg-opacity-50 text-white py-2 rounded-sm focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
