import React, { useState, useEffect } from "react";
import { FaStar, FaThumbsUp, FaComment } from "react-icons/fa"; // Removed FaEye import
import { motion } from "framer-motion";
import { handleLikeClick, handleRateClick } from "../../Functions/Functions";

const RecipeCard = ({
  title,
  image,
  type,
  rating,
  likes,
  comments,
  recipeId,
}) => {
  const [isLikeHovered, setIsLikeHovered] = useState(false);
  const [isCommentHovered, setIsCommentHovered] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getLoggedinUserInfo = JSON.parse(localStorage.getItem("userData"));
    if (getLoggedinUserInfo) {
      setUserId(getLoggedinUserInfo.userData._id);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(rating) && rating.length > 0) {
      const averageRating =
        rating.reduce((acc, cur) => acc + cur.rating, 0) / rating.length;
      setUserRating(averageRating);
    } else {
      setUserRating(0);
    }
  }, [rating]);

  const handleLike = async () => {
    await handleLikeClick(recipeId, userId, likes);
  };

  const handleRate = async (clickedRating) => {
    if (userId) {
      setUserRating(clickedRating);
      const response = await handleRateClick(recipeId, clickedRating, userId);
      if (!response.ok) {
        setUserRating(rating);
      }
    }
  };

  return (
    <motion.div
      className="w-[260px] h-auto cursor-pointer bg-gray-200 flex flex-col items-center justify-between"
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="w-full h-auto relative"
        onClick={() =>
          window.location.replace(
            `/recipe/recipeDetails/${recipeId}`
          )
        }
        whileHover={{ scale: 1.01 }}
      >
        <img
          src={image}
          className="w-full h-full"
          alt={title}
          whileHover={{ scale: 1.01 }}
        />
        <div
          className="absolute top-2 right-2 bg-orange-500 bg-opacity-70 text-white px-3 py-2 rounded-sm text-base font-base"
          whileHover={{ scale: 1.02 }}
        >
          {type}
        </div>
      </div>
      <motion.div
        className="w-full h-26 p-2 flex flex-col items-start"
        whileHover={{ scale: 1.02 }}
      >
        <motion.h1
          className="text-base font-semibold text-gray-600"
          whileHover={{ scale: 1.02 }}
        >
          {title}
        </motion.h1>
        <motion.div
          className="w-full h-auto flex gap-3 mt-2 items-center justify-between"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="w-full flex items-center text-amber-500"
            whileHover={{ scale: 1.02 }}
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                className={`text-${index < userRating ? "yellow" : "gray"}-500`}
                onClick={() => handleRate(index + 1)}
                whileHover={{ scale: 1.2 }}
              >
                <FaStar />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="w-full flex items-center justify-center gap-3 relative"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-300 duration-150 ease-in-out text-amber-500 rounded-sm"
              onMouseEnter={() => setIsLikeHovered(true)}
              onMouseLeave={() => setIsLikeHovered(false)}
              onClick={handleLike}
              whileHover={{ scale: 1.2 }}
            >
              <FaThumbsUp />
            </motion.button>
            {isLikeHovered && (
              <motion.div
                className="absolute bottom-9 left-9 transform -translate-x-1/2 bg-gray-100 flex items-center justify-center text-amber-500 rounded-md w-8 h-8 text-sm shadow"
                whileHover={{ scale: 1.2 }}
              >
                {likes}
              </motion.div>
            )}
            <motion.button
              onMouseEnter={() => setIsCommentHovered(true)}
              onMouseLeave={() => setIsCommentHovered(false)}
              onClick={() =>
                window.location.replace(
                  `/recipe/recipeDetails/${recipeId}`
                )
              }
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-300 duration-150 ease-in-out text-amber-500 rounded-sm"
              whileHover={{ scale: 1.2 }}
            >
              <FaComment />
            </motion.button>
            {isCommentHovered && (
              <motion.div
                className="absolute bottom-9 left-20 transform -translate-x-1/2 bg-gray-100 flex items-center justify-center text-amber-500 rounded-md w-8 h-8 text-sm shadow"
                whileHover={{ scale: 1.2 }}
              >
                {comments}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RecipeCard;
