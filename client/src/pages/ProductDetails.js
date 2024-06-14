import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-lg mx-auto mb-6">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              className="rounded-lg shadow-lg"
              alt={product.name}
            />
          </div>
          <div className="max-w-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">{product.name}</h1>
            <p className="text-lg mb-4">{product.description}</p>
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl font-semibold">Rs. {product.price}</span>
              <button
                onClick={() => {} /* Handle Add to Cart */}
                className="ml-4 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md shadow-md"
              >
                ADD TO CART
              </button>
            </div>
            <p className="text-lg text-center mb-4">Category: {product?.category?.name}</p>
            <button
              onClick={() => navigate(`/product/${product.slug}`)}
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md mx-auto"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
      <hr className="my-8" />
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <div key={p._id} className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md">
              <img
                className="w-full h-48 object-cover"
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />
              <div className="px-6 py-4">
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <p className="text-gray-700 text-base">
                  {p.description.substring(0, 100)}...
                </p>
                <p className="text-gray-800 font-semibold mt-2">Rs. {p.price}</p>
              </div>
              <div className="px-6 py-4">
                <button
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 shadow-md"
                >
                  More Details
                </button>
                <button
                  onClick={() => {} /* Handle Add to Cart */}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
          {relatedProducts.length === 0 && (
            <p className="text-center col-span-full">No similar products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
