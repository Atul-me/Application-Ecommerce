import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className="text-center bg-gray-100 p-4 rounded-lg shadow-md">
    <NavLink to="/dashboard/user" className="text-xl font-semibold mb-4">Dashboard</NavLink>
    <nav className="flex flex-col space-y-2">
      <NavLink
        to="/dashboard/user/profile"
        className="text-blue-500 hover:text-blue-700"
        activeClassName="font-bold text-blue-700"
      >
        Profile
      </NavLink>
      <NavLink
        to="/dashboard/user/orders"
        className="text-blue-500 hover:text-blue-700"
        activeClassName="font-bold text-blue-700"
      >
        Orders
      </NavLink>
    </nav>
  </div>
  )
}

export default UserMenu;