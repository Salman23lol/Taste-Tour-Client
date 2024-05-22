import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen bg-gray-100 text-gray-500 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold py-4">Page Not Found</h1>
      <Link to="/" className="text-base hover:text-gray-700">Click here to go back</Link>
    </div>
  );
};

export default NotFound;
