import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-indigo-950 text-gray-100 p-3 ">
      <p className="text-center footer mt-3  text-xl">
        <Link to='/about' className="px-2 text-blue-400">About</Link> |
        <Link to='/contact' className="px-2 text-blue-400">Contact</Link> |
        <Link to='/policy' className="px-2 text-blue-400">Privacy Policy</Link> 
      </p>
      <h4 className="text-center footer text-sm mt-3">All Rights Reserved <span className="text-emerald-200">&copy;Curiousdev01</span></h4>
    </div>
  );
};

export default Footer;
