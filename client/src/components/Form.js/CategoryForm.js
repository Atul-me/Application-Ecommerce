import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            className="Category"
            placeholder="Enter new Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="ml-4 bg-slate-300 rounded-sm">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
