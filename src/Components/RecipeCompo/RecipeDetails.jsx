import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRegHeart,
  FaEye,
  FaStar,
  FaClock,
  FaTypo3,
  FaArrowDown,
  FaCommentAlt,
  FaShoppingBasket,
} from "react-icons/fa";
import { IoClose, IoFootsteps } from "react-icons/io5";
import Comment from "./RecipeComment";
import { handleLikeClick } from "../../Functions/Functions";
import Loading from "../Home/Loading";

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [recipeComments, setRecipeComments] = useState();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getLoggedinUserInfo = JSON.parse(localStorage.getItem("userData"));
    if (getLoggedinUserInfo) {
      setUserId(getLoggedinUserInfo.userData._id);
    }
  }, []);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const url = window.location.href;
        const recipeId = url.substring(url.lastIndexOf("/") + 1);
        setRecipeId(recipeId);
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/recipe/recipeById/${recipeId}`
        );
        if (response.ok) {
          const data = await response.json();
          setRecipe(data);
          setRecipeComments(data.comment.Comments);
        } else {
          console.error("Failed to fetch recipe details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRecipeDetails(); 
  }, []);

  const calculateTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);
    const timeDifference = currentTime.getTime() - createdAtTime.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    if (secondsDifference < 60) {
      return "Just now";
    } else if (secondsDifference < 3600) {
      return `${Math.floor(secondsDifference / 60)}m ago`;
    } else if (secondsDifference < 86400) {
      return `${Math.floor(secondsDifference / 3600)}h ago`;
    } else if (secondsDifference < 2592000) {
      return `${Math.floor(secondsDifference / 86400)}d ago`;
    } else if (secondsDifference < 31536000) {
      return `${Math.floor(secondsDifference / 2592000)}M ago`;
    } else {
      return `${Math.floor(secondsDifference / 31536000)}Y ago`;
    }
  };

  const handleCommentModal = () => {
    setIsCommentModalOpen(!isCommentModalOpen);
  };

  const handleLike = async () => {
    await handleLikeClick(recipeId, userId); // Use the imported handleLikeClick function
  };

  if (!recipe) {
    return (
      <div className="w-full mt-32 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-auto md:h-[90.1vh] flex flex-col md:flex-row relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full md:w-[46.3%] h-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={recipe.image} className="w-full h-auto" alt={recipe.title} />
      </motion.div>
      <motion.div
        className="w-full h-full flex flex-col p-2 overflow-y-scroll"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-xl font-semibold text-gray-600 text-center p-2">
          {recipe.title}
        </h1>
        <p className="text-sm font-normal text-gray-400 text-center w-1/2 mx-auto p-1">
          {recipe.description}
        </p>
        <div className="w-full flex items-center justify-center gap-2 mt-5">
          <div className="w-full flex items-center justify-center gap-2 mt-5">
            <motion.button
              onClick={handleLike}
              className="px-3 py-2 cursor-pointer rounded-sm bg-orange-300 bg-opacity-50 flex items-center gap-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaRegHeart className="text-red-500" />
              <span>{recipe.like.likeCount}</span>
            </motion.button>
            <motion.button
              onClick={handleCommentModal}
              className="px-3 py-2 rounded-sm bg-orange-300 bg-opacity-50 flex items-center gap-3"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaCommentAlt className="text-blue-500" />
              <span>{recipe.comment.CommentCount}</span>
            </motion.button>
            <div className="px-3 py-2 rounded-sm bg-orange-300 bg-opacity-50 flex items-center gap-3">
              <FaStar className="text-amber-500" />
              <span>{recipe.rateMeta.ratedCount}</span>
            </div>
            <div className="px-3 py-2 rounded-sm bg-orange-300 bg-opacity-50 flex items-center gap-3">
              <FaClock className="text-orange-500" />
              <span>{calculateTimeAgo(recipe.createdAt)}</span>
            </div>
            <div className="px-3 py-2 rounded-sm bg-orange-300 bg-opacity-50 flex items-center gap-3">
              <FaTypo3 className="text-orange-500" />
              <span>{recipe.type}</span>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col p-4">
          <div className="w-full flex flex-col items-start">
            <div className="w-full flex items-center gap-2 font-semibold text-gray-600 my-5">
              <FaShoppingBasket className="text-3xl" />{" "}
              <span className="text-xl">Ingredients</span>
              <FaArrowDown />
            </div>
            <div className="w-full h-auto flex flex-col gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index}>
                  <span className="text-base">{index + 1}</span> - {ingredient}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-auto flex flex-col mt-6">
            <h2 className="text-lg font-semibold text-gray-600 flex items-center gap-2 my-4">
              <IoFootsteps className="text-3xl" /> Steps: <FaArrowDown />
            </h2>
            <div className="w-full h-auto flex flex-col items-start gap-4 my-3">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-base">{index + 1}</span> <span>-</span>{" "}
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      {isCommentModalOpen && (
        <motion.div
          className="w-full h-full fixed top-0 right-0 bg-gray-400 bg-opacity-80 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={handleCommentModal}
            className="absolute top-2 right-2 bg-gray-200 text-xl w-8 h-8 flex items-center justify-center"
          >
            <IoClose />
          </button>
          <Comment recipeId={recipeId} recipeComments={recipeComments} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecipeDetails;
