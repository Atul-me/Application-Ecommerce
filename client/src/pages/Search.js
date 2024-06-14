import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mt-6">Search Results</h1>
          <h6 className="text-xl mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="flex flex-wrap justify-center mt-6">
            {values?.results.map((p) => (
              <div className="card m-4 w-72 bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="w-full h-48 object-cover"
                  alt={p.name}
                />
                <div className="p-4">
                  <h5 className="text-lg font-bold">{p.name}</h5>
                  <p className="text-gray-700 text-base">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="text-xl text-green-500 font-semibold">₹ {p.price}</p>
                  <div className="mt-4 flex justify-between">
                    <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700">
                      More Details
                    </button>
                    <button className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-700">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
