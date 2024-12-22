import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaSlidersH } from 'react-icons/fa'
import { useSearchContext } from '../Categories/SearchContext'

function Search() {
    const theme = localStorage.getItem('theme')
    const { searchQuery, setSearchQuery } = useSearchContext()

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="relative flex items-center w-full">
            <FaSearch className={`absolute left-4 w-5 h-5 ${
                theme === 'Dark' ? 'text-gray-300' : 'text-gray-400'
            }`} />
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search cars by name or type..."
                className={`pl-12 pr-12 py-2 w-full border rounded-full text-lg 
                    focus:outline-none focus:ring-2 ${
                    theme === 'Dark'
                        ? 'bg-gray-800 border-gray-600 text-white focus:ring-blue-400'
                        : 'bg-white border-gray-300 text-black focus:ring-blue-500'
                }`}
            />
            <Link to="/categories" className="absolute right-4">
                <FaSlidersH className={`w-5 h-5 transition-transform transform 
                    hover:scale-110 cursor-pointer ${
                    theme === 'Dark'
                        ? 'text-gray-300 hover:text-blue-400'
                        : 'text-gray-400 hover:text-blue-600'
                }`} />
            </Link>
        </div>
    )
}

export default Search