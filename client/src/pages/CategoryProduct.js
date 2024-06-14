import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null); // Changed to null for better handling

  useEffect(() => {
    if (params?.slug) {
      getProductsByCat();
    }
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-6 px-4">
        <h4 className="text-3xl font-bold text-center mb-4">
          Category - {category?.name}
        </h4>
        <h6 className="text-lg text-center mb-6">
          {products?.length} products found
        </h6>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((p) => (
            <div key={p._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                className="w-full h-64 object-cover"
                alt={p.name}
              />
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{p.name}</h5>
                <p className="text-gray-700 text-base mb-2">
                  {p.description.substring(0, 100)}...
                </p>
                <p className="text-gray-800 font-semibold">${p.price}</p>
                <div className="mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
                    onClick={() => navigate(`${process.env.REACT_APP_API}/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
