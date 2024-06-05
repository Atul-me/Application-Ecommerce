import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        answer:'',
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
            formData
          );
          if (response && response.data.success) {
            toast.success(response.data.message);
            navigate("/login");
          } else {
            toast.error(response.data.message);
          }
          console.log(response.data);
        } catch (error) {
          toast.error('Login failed!');
          console.error(error);
        }
      };
    
  return (
    <Layout title={"ForgotPassword"}>
        <div className="flex flex-col md:flex-row h-screen justify-center items-center bg-gray-100 p-4">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <img
            src="https://res.cloudinary.com/dsvgtprgh/image/upload/v1717434861/pncvywfnny27numupokt.jpg"
            alt="Reset Password"
            className="object-cover h-full w-full md:w-10/12 rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg">
            <h4 className='text-center font-semibold'>Reset Password</h4>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter Your First School Name?
              </label>
              <input
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
          </form>
          </div>
          </div>
    </Layout>
  )
}

export default ForgotPassword;