import React from 'react'
import { FaSearch, FaHeart, FaUserCircle, FaCog, FaSlidersH, FaBell} from 'react-icons/fa'

function Header() {

    return (
        <>
            <header className="flex justify-between items-center p-4 bg-white shadow">
                <h1 className="text-3xl font-semibold text-blue-600 cursor-pointer">DriveGo</h1>
                
                {/* Search Input with Icon */}
                <div className="relative flex items-center w-1/2 max-w-lg ml-[-50rem]">
                    <FaSearch className="absolute left-4 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search something here"
                        className="pl-12 pr-12 py-2 w-full border rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-4">
                        <FaSlidersH className="w-5 h-5 text-gray-500 transition-transform transform hover:scale-110 hover:text-blue-600 cursor-pointer" />
                    </button>
                </div>

                {/* Icons on the right with borders */}
                <div className="flex items-center gap-4">
                    <div className="p-2 border rounded-full">
                        <FaHeart className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-500" />
                    </div>
                    
                    {/* Notification Icon with Red Dot */}
                    <div className="relative p-2 border rounded-full">
                        <FaBell className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-500" />
                        <span className="absolute top-0 -right-1 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    </div>
                    
                    <div className="p-2 border rounded-full">
                        <FaCog className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-500" />
                    </div>
                    <FaUserCircle className="w-10 h-10 text-gray-500 cursor-pointer hover:text-black" />
                </div>
            </header>
        </>
    )
}

export default Header
