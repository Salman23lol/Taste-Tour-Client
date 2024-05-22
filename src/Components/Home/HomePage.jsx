import React, { useState, useEffect } from "react";
import RecipeCard from "../RecipeCompo/RecipeCard";
import Header from "./Header";
import { motion } from "framer-motion";
import Loading from "./Loading";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/recipe/all`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <motion.div
      className="w-full h-[91vh] overflow-y-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      {isLoading ? ( // Conditional rendering based on isLoading state
        <div className="w-full h-screen flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <motion.div
          className="w-full h-auto mt-5 p-3 flex flex-wrap gap-4 items-center justify-evenly"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              title={recipe.title}
              image={recipe.image}
              type={recipe.type}
              rating={recipe.rate}
              likes={recipe.like.likeCount}
              comments={recipe.comment.CommentCount}
              views={recipe.views}
              recipeId={recipe._id}
            />
          ))}
        </motion.div>
      )}
      <motion.p
        className="text-sm font-semibold text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        All Rights Reserved to Crusty Crank
      </motion.p>
    </motion.div>
  );
};

export default HomePage;
