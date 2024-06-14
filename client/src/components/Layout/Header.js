import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white border-b dark:bg-indigo-950 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://res.cloudinary.com/dsvgtprgh/image/upload/v1717304747/zwsxaoib2bt3kmb9oszv.png"
            className="h-10 w-10 rounded-full"
            alt="Logo"
          />
          <span className="text-2xl font-bold dark:text-white">
            Daily Needs & Services
          </span>
        </NavLink>
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-controls="navbar-user"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 000 2h14a1 1 0 100-2H3zM3 10a1 1 0 000 2h14a1 1 0 100-2H3zM3 15a1 1 0 000 2h14a1 1 0 100-2H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block w-full md:w-auto`}
          id="navbar-user"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 md:items-center text-lg">
            <SearchInput />
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-3 text-blue-500 border-b-2 border-blue-500"
                    : "py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown relative">
              <Link
                className="nav-link dropdown-toggle text-white hover:text-blue-700 dark:hover:text-blue-500"
                to={"/categories"}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </Link>
              <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                <li className="group">
                  <Link
                    className="block px-4 py-2 text-sm text-white-900 hover:bg-gray-200"
                    to={"/categories"}
                  >
                    All Categories
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c._id} className="group">
                    <Link
                      className="block px-4 py-2 text-sm text-white-900 hover:bg-gray-200"
                      to={`${process.env.REACT_APP_API}/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "py-2 px-3 text-blue-500 border-b-2 border-blue-500"
                        : "py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                    }
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "py-2 px-3 text-blue-500 border-b-2 border-blue-500"
                        : "py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-x-2 py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                >
                  {auth.user.name}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
            <li>
              <Badge count={cart?.length} showZero>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-3 text-blue-500 border-b-2 border-blue-500"
                    : "py-2 px-3 text-gray-900 dark:text-white hover:text-blue-700 dark:hover:text-blue-500"
                }
              >
                Cart
              </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
