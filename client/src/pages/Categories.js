import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container mx-auto mt-24">
        <div className="flex flex-wrap">
          {categories.map((c) => (
            <div className="w-full md:w-1/3 p-3" key={c._id}>
              <div className="card bg-white shadow-md rounded-md p-4">
                <Link
                  to={`/category/${c.slug}`}
                  className="block text-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
