import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Layout from '../../components/Layout/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [auth, setAuth] = useAuth()

  const navigate = useNavigate();
  const location = useLocation();

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
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        formData
      );
      if (response && response.data.success) {
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth",JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.data.message);
      }
      console.log(response.data);
    } catch (error) {
      toast.error('Login failed!');
      console.error(error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await axios.post('https://localhost:5000/auth/google', {
        tokenId: credentialResponse.credential,
      });
      toast.success('Google login successful!');
      console.log(result.data);
    } catch (error) {
      toast.error('Google login failed!');
      console.error(error);
    }
  };

  const handleGoogleFailure = (error) => {
    toast.error('Google login failed!');
    console.error(error);
  };

  return (
    <Layout title="Login">
      <div className="flex flex-col md:flex-row h-screen justify-center items-center bg-gray-100 p-4">
        <div className="w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0">
          <img
            src="https://res.cloudinary.com/dsvgtprgh/image/upload/v1717434861/pncvywfnny27numupokt.jpg"
            alt="Login"
            className="object-cover h-full w-full md:w-10/12 rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-lg">
        <h4 className='text-center font-semibold'>Welcome Back</h4>
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
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {navigate('/forgot-password')}}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
            >
              Forgot Password
            </button>
          </form>
          <div className="mt-6 w-full flex justify-center">
            <GoogleOAuthProvider clientId="your-google-client-id">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
