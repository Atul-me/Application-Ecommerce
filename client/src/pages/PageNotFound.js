import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className="flex flex-col items-center justify-center min-h-screen mb-4 ">
        <img
          src="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg"
          alt="404 Error"
          className="w-6/12 h-4/12"
        />
        <Link
          to="/"
          className="mt-10 px-12 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
