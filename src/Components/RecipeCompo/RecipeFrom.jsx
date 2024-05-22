import React, { useState, useEffect } from "react";
import { FaPlus, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { resizeImage } from "../../Functions/Functions";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    ingredients: [],
    description: "",
    steps: [],
  });

  const [image, setImage] = useState(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const { id } = useParams();
  const userId = id;

  useEffect(() => {
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User ID is required!",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim() === "") {
      return;
    }
    setTodos([...todos, todo]);
    setTodo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert image to base64 and resize it
      const base64Image = await resizeImage(image, 30); // Resize image to 40KB

      // Prepare form data to send to backend
      const formDataToSend = {
        ...formData,
        image: base64Image,
        steps: todos,
        userId: userId,
      };

      // Send form data to backend
      const response = await fetch(`${import.meta.env.VITE_API_URI}/recipe/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Recipe Submitted!",
          text: "Your recipe has been successfully submitted.",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mx-auto my-3">
      <h2 className="text-2xl font-semibold my-4 text-center">
        Add New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block mb-2">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Type:
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-full"
            >
              <option value="">Select Type</option>
              <option value="Mutton">Mutton</option>
              <option value="Beef">Beef</option>
              <option value="Chicken">Chicken</option>
              <option value="Main-Course">Main-Course</option>
              <option value="Meal">Meal</option>
              <option value="Plater">Plater</option>
              <option value="Dessert">Dessert</option>
              <option value="Junk-Food">Junk-Food</option>
              <option value="Street-Food">Street-Food</option>
              <option value="Snacks">Snacks</option>
              <option value="Sweets">Sweets</option>
              <option value="Candy">Candy</option>
              <option value="Soup">Soups</option>
              <option value="Sea-Food">Sea-Food</option>
              <option value="Rice">Rice</option>
              <option value="Drinks">Drinks</option>
              <option value="Milk">Milk</option>
              <option value="Shakes">Shakes</option>
              <option value="Juices">Juices</option>
              <option value="Others">Others</option>
            </select>
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Ingredients (separated by commas):
            <input
              type="text"
              name="ingredients"
              value={formData.ingredients.join(", ")}
              onChange={(e) => {
                const ingredients = e.target.value
                  .split(",")
                  .map((ingredient) => ingredient.trim());
                setFormData({
                  ...formData,
                  ingredients,
                });
              }}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </label>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Add Steps</h3>
          <div className="flex items-center">
            <input
              type="text"
              value={todo}
              onChange={handleTodoChange}
              placeholder="Enter step..."
              className="border rounded-l px-2 py-1 w-full"
            />
            <button
              type="button"
              onClick={handleAddTodo}
              className="bg-orange-500 hover:bg-opacity-70 text-white px-4 py-2 rounded-r flex items-center justify-center"
            >
              <FaPlus />
            </button>
          </div>
          <div className="mt-2">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded px-4 py-2 mt-2 flex items-center justify-between"
              >
                <span>
                  {index + 1}. {todo}
                </span>
                <FaCheckCircle className="text-green-500" />
                <FaTimesCircle className="text-red-500" />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
