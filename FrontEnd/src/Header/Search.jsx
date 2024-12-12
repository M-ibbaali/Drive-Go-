import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaSlidersH, FaCog, FaHeart, FaBell, FaUser, FaSignInAlt } from 'react-icons/fa';

function Search (){
  return (
    <div className="relative flex items-center w-full">
      <FaSearch className="absolute left-4 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search something here"
        className="pl-12 pr-12 py-2 w-full border rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Link to="/categories" className="absolute right-4">
        <FaSlidersH className="w-5 h-5 text-gray-400 transition-transform transform hover:scale-110 hover:text-blue-600 cursor-pointer" />
      </Link>
    </div>
  );
};

export default Search
