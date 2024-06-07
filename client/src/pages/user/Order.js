import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Order = () => {
  return (
    <Layout title="DNS-Shop Orders">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <UserMenu />
          </div>
          <div className="col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-center">Orders</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Order;