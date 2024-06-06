import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CreateProduct = () => {
  return (
    <Layout title="DNS-Shop Products">
        <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <AdminMenu />
          </div>
          <div className="col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className='text-center'>Create Product</h1>
            </div>
          </div>
        </div>
      </div>
    
    </Layout>
  )
}

export default CreateProduct