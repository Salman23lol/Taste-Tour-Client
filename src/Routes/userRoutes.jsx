// UserRoutes.js
import React from 'react';
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
import Login from "../Components/UserCompo/Login";
import Register from "../Components/UserCompo/Register";
import NotFound from '../Components/NotFound';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
