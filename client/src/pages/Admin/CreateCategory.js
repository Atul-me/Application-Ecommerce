import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form.js/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {
        name: updatedName,
      });
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Handle category deletion
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="DNS-Shop Category">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <AdminMenu />
          </div>
          <div className="col-span-9 w-5/6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-center text-xl">Manage Category</h1>
              <div className="mt-5">
                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>
              <div className="mt-5">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((c) => (
                        <tr key={c._id} className="bg-white border-b dark:bg-gray-200 dark:border-gray-200">
                          <td className="px-6 py-4 text-center">{c.name}</td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                              className="bg-indigo-400 px-4 py-2 rounded-md text-white hover:bg-indigo-500 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(c._id)}
                              className="bg-red-400 px-4 py-2 ml-2 rounded-md text-white hover:bg-red-500 transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
