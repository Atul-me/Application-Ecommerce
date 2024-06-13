import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null); // Ensure photo is initialized as null
  const navigate = useNavigate();

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description); // Fixed typo
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) {
        productData.append("photo", photo); // Only append if photo is selected
      }
      productData.append("category", category);
      productData.append("shipping", shipping); // Append shipping

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`, // Fixed URL
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
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
              <h1 className="text-center text-2xl mb-4">Create Product</h1>
              <form onSubmit={handleCreate}>
                <div className="mb-4">
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
                <div className="mb-4">
                  <label className="block">
                    <span className="text-gray-700">Upload Photo</span>
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
                {photo && (
                  <div className="mb-4">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      className="h-48 w-full object-cover mt-2"
                    />
                  </div>
                )}
                <div className="mb-4">
                  <input
                    type="text"
                    value={name}
                    placeholder="Write name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={description}
                    placeholder="Write description"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={price}
                    placeholder="Write Price"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    value={quantity}
                    placeholder="Write quantity"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <Select
                    bordered={false}
                    value={shipping}
                    placeholder="Select Shipping"
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
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Create Product
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

export default CreateProduct;
