import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <AdminMenu />
          </div>
          <div className="col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4">All Products List</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="block bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="w-full h-48 object-cover"
                      alt={p.name}
                    />
                    <div className="p-4">
                      <h5 className="text-lg font-semibold">{p.name}</h5>
                      <p className="text-gray-600">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
