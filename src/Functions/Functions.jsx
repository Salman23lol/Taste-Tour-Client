import Swal from "sweetalert2";

export const resizeImage = async (file, targetSizeInKB) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      const img = new Image();
      img.src = base64Image;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxWidth = 800; // Maximum width for resizing
        const maxHeight = 600; // Maximum height for resizing
        const targetSizeInBytes = targetSizeInKB * 1024;

        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (img.width > maxWidth || img.height > maxHeight) {
          const scaleFactor = Math.min(
            maxWidth / img.width,
            maxHeight / img.height
          );
          width *= scaleFactor;
          height *= scaleFactor;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas content to base64 with reduced quality
        let quality = 1;
        let resizedBase64 = canvas.toDataURL("image/jpeg", quality);
        while (resizedBase64.length > targetSizeInBytes && quality > 0.1) {
          quality -= 0.1;
          resizedBase64 = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(resizedBase64);
      };
    };
    reader.onerror = (error) => reject(error);
  });
};

export const handleRateClick = async (recipeId, rating, userId) => {
  if (userId) {
    const url = `${import.meta.env.VITE_API_URI}/recipe/rate/${recipeId}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, rating }), // This is where we are sending the data
    });

    if (response.ok) {
      Swal.fire({
        title: "Success",
        text: "Rating updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchRecipes(); // Refresh recipes after rating
        }
      });
    } else {
      try {
        const JsonRes = await response.json();
        Swal.fire({
          title: "Failed",
          text: JsonRes.error || "Unknown error occurred",
          icon: "error",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          title: "Failed",
          text: "Failed to parse server response",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }
};

export const handleLikeClick = async (
  recipeId,
  userId,
  setLikeTooltip,
  likes
) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/recipe/like/${recipeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });

    if (res.ok) {
      Swal.fire({
        title: "Liked Successfully!",
        text: "You have successfully Liked The Post.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setLikeTooltip(likes + 1);
    } else {
      const response = await res.json(); // Parse the error response as JSON
      Swal.fire({
        title: "Failed Liked Successfully!",
        text: response.error,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } catch (error) {
    
  }
};
