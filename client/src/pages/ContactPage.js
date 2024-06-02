import React from 'react'
import Layout from '../components/Layout/Layout'
import { FaInstagram, FaFacebook } from 'react-icons/fa'

const ContactPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Get in touch</h1>
        <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
          {/* Image on the left */}
          <div className="md:w-1/2">
            <img
              src="https://res.cloudinary.com/dsvgtprgh/image/upload/v1717322793/y1mbpi9umlpa4xuzfoav.webp"
              alt="Contact"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          {/* Form & additional info on the right */}
          <div className="md:w-1/2 space-y-4">
            <form
              action="https://formspree.io/f/{your-form-id}"
              method="POST"
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-900 text-white font-semibold rounded-md hover:bg-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row sm:space-x-8 mt-8">
              <div className="sm:w-1/2">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">Our Socials: </h2>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-2xl text-pink-600 hover:text-pink-800" />
                  </a>
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-2xl text-blue-600 hover:text-blue-800" />
                  </a>
                </div>
              </div>
              <div className="sm:w-1/2 mt-8 sm:mt-0">
                <h2 className="text-xl font-semibold text-indigo-700 mb-4">Address: </h2>
                <p>B-11124, Golghar Road</p>
                <p>Hyderabad, Andhra Pradesh, 116161</p>
                <p>India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactPage
