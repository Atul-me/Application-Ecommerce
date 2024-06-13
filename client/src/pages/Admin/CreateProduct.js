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
  const [photo, setPhoto] = useState("");
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
      productData.append("descritpion", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
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
              <h1 className="text-center">Create Product</h1>
              <div className="m-1 w-72">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  value={category}
                  size="large"
                  showSearch
                  className=""
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="">
                  <label htmlFor="uploadimages" className="">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name=""
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className=""
                  />
                </div>
              </div>
              <div className="">
                <input
                  type="text"
                  value={name}
                  placeholder="Write name"
                  className=""
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  value={description}
                  placeholder="Write description"
                  className=""
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  value={price}
                  placeholder="Write Price"
                  className=""
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Write quantity"
                  className=""
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="">
                <Select
                  bordered={false}
                  value={shipping}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className=""
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="">
                <button className="" onClick={handleCreate}>
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
