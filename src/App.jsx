// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserRoutes from "./Routes/userRoutes";
import RecipeRoutes from "./Routes/recipeRoutes";
import HomePage from "./Components/Home/HomePage";
import Navbar from "./Components/Home/Navbar";
import LiveAuth from "./Middleware/LiveAuth";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LiveAuth>
              <Navbar />
              <HomePage />
            </LiveAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/recipe/*" element={<RecipeRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
