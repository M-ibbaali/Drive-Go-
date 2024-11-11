import React from 'react'
import { FaSearch, FaSlidersH} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Search() {
    
    return (
        <>
            <div className="relative flex items-center w-1/2 max-w-lg ml-[-30rem]">
                <FaSearch className="absolute left-4 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search something here"
                    className="pl-12 pr-12 py-2 w-full border rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-4">
                    <Link to="/categories">
                        <FaSlidersH className="w-5 h-5 text-gray-400 transition-transform transform hover:scale-110 hover:text-blue-600 cursor-pointer" />
                    </Link>
                </button>
            </div>
        </>
    )
}

export default Search
