import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form.js/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  //handle form
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name})
      if(data?.success){
        toast.success(`${data.name} is created`);
      }else{
        toast.error(data.message);
      }
    }catch(error){
      console.log(error)
      toast.error('Something went wrong in input form')
    }
  }

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
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
  return (
    <Layout title="DNS-Shop Category">
      <div className="container mx-auto p-4 ">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <AdminMenu />
          </div>
          <div className="col-span-9 w-5/6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-center">Manage Category</h1>
              <div className="">
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
                      <tr className="bg-white border-b dark:bg-gray-200 dark:border-gray-200">
                        {categories?.map((c) => (
                          <>
                            <tr>
                              <td key={c._id}>{c.name}</td>
                                <td>
                                  <button
                                    onClick={() => {}}
                                    className="bg-indigo-400 w-14 h-6 rounded-sm text-neutral-50"
                                  >
                                    Edit
                                  </button>
                                </td>
                            </tr>
                          </>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
