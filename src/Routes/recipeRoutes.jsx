import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
import RecipeDetails from "../Components/RecipeCompo/RecipeDetails";
import LiveAuth from "../Middleware/LiveAuth";
import Navbar from "../Components/Home/Navbar";
import NotFound from "../Components/NotFound";
import RecipeForm from "../Components/RecipeCompo/RecipeFrom";

const RecipeRoutes = () => {
  return (
    <Routes>
      <Route
        path="/recipeDetails/:id"
        element={
          <LiveAuth>
            <Navbar />
            <RecipeDetails />
          </LiveAuth>
        }
      />
      <Route
      path="/create/:id"
      element={
        <LiveAuth>
          <Navbar />
          <RecipeForm />
        </LiveAuth>
      }
    />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RecipeRoutes;
