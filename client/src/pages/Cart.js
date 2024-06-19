import React from 'react';
import Layout from './../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toFixed(2);
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentSuccess = async (details, data) => {
    const { paymentID, payerID } = data;
    const totalAmount = totalPrice();
    const userId = auth?.user?._id;

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/payment/execute-payment`, {
        paymentID,
        payerID,
        cart,
        totalAmount,
        userId,
      });

      if (res.data.message === 'Payment successful') {
        setCart([]);
        localStorage.removeItem('cart');
        navigate('/success');
      } else {
        navigate('/failure');
      }
    } catch (error) {
      console.error('Error executing payment: ', error);
      navigate('/failure');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-center text-3xl font-bold mb-4">
            Hello {auth?.token && auth?.user?.name}
          </h1>
          <h4 className="text-center mb-4">
            {cart?.length
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? '' : ', please login to checkout'
                }`
              : 'Your cart is empty'}
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cart?.map((p) => (
                    <tr key={p._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img
                              className="h-16 w-16 rounded-md object-cover"
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              alt={p.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {p.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {p.description.substring(0, 30)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between">
              <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Cart Summary</h2>
                <hr className="my-2" />
                <div className="flex justify-between items-center my-2">
                  <span className="font-medium">Total:</span>
                  <span className="font-semibold">${totalPrice()}</span>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-4">
                {auth?.user?.address ? (
                  <>
                    <h2 className="text-xl font-bold mb-2">Delivery Address</h2>
                    <p>{auth?.user?.address}</p>
                    <button
                      className="mt-2 text-blue-600 hover:text-blue-800"
                      onClick={() => navigate('/dashboard/user/profile')}
                    >
                      Update Address
                    </button>
                  </>
                ) : (
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() =>
                      auth?.token
                        ? navigate('/dashboard/user/profile')
                        : navigate('/login', {
                            state: '/cart',
                          })
                    }
                  >
                    {auth?.token ? 'Update Address' : 'Login to Checkout'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <PayPalScriptProvider
              options={{
                'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
                currency: 'USD',
              }}
            >
              <PayPalButtons
                createOrder={async (data, actions) => {
                  const totalAmount = totalPrice();
                  const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/payment/create-payment`, {
                    cart,
                    totalAmount,
                  });
                  return res.data.paymentID;
                }}
                onApprove={async (data, actions) => {
                  return handlePaymentSuccess(data);
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
