import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="flex flex-col sm:flex-row">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-300"
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500 transition duration-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
