import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center bg-gray-100 p-4 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold mb-4">Admin Panel</h4>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard/admin/create-category"
          className="text-blue-500 hover:text-blue-700"
          activeClassName="font-bold text-blue-700"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="text-blue-500 hover:text-blue-700"
          activeClassName="font-bold text-blue-700"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="text-blue-500 hover:text-blue-700"
          activeClassName="font-bold text-blue-700"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="text-blue-500 hover:text-blue-700"
          activeClassName="font-bold text-blue-700"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="text-blue-500 hover:text-blue-700"
          activeClassName="font-bold text-blue-700"
        >
          Users
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminMenu;
