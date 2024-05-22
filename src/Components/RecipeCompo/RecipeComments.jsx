import React from 'react'

const RecipeComments = () => {
  return (
    <div className="w-1/2 pl-8 border-l border-gray-300">
    <h2 className="text-2xl font-bold mb-4">Comments</h2>
    <div className="flex items-center mb-4">
      <FaUserCircle className="text-3xl mr-2" />
      <div>
        <h3 className="text-lg font-semibold">User Name</h3>
        <p>Comment Text Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <input type="text" placeholder="Write a comment..." className="w-3/4 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none">
        <FaPaperPlane className="mr-2" />
        Send
      </button>
    </div>
  </div>
  )
}

export default RecipeComments