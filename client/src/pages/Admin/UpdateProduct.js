import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { Layout, Select } from 'antd';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product?");
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="DNS-Shop Products">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <AdminMenu />
          </div>
          <div className="col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-center text-2xl mb-4 font-bold">Update Product</h1>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <Select
                    bordered={false}
                    placeholder="Select a category"
                    value={category}
                    size="large"
                    showSearch
                    className="w-full"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-gray-700">
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                </div>
                <div>
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    value={name}
                    placeholder="Write name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={description}
                    placeholder="Write description"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={price}
                    placeholder="Write Price"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Write quantity"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    value={shipping}
                    size="large"
                    showSearch
                    className="w-full"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Update Product
                  </button>
                </div>
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    onClick={handleDelete}
                  >
                    Delete Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
