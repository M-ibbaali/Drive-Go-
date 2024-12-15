import React, { useState, useEffect, useRef } from "react"
import { FaCog, FaSignOutAlt } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

function Settings({ isLoggedIn, setIsLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()

    const theme = localStorage.getItem('theme')
    
    useEffect(() => {
        document.documentElement.className = theme === 'Dark' ? 'dark' : ''
    }, [theme])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("userId")
        setIsLoggedIn(false)
        navigate("/login")
    }

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border rounded-full cursor-pointer"
            >
            <FaCog
                className={`w-4 h-4 ${theme === 'Dark' ? 'text-gray-200' : 'text-gray-700'} cursor-pointer hover:text-blue-500 ${isOpen ? "rotate-90" : "rotate-0"}`}
            />
            </div>
            {isOpen && (
                <div
                    ref={menuRef}
                    className={`absolute right-0 mt-2 w-40 ${theme === 'Dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} border ${theme === 'Dark' ? 'border-gray-700' : 'border-gray-200'} rounded-lg shadow-lg z-50`}
                >
                    <ul className="py-1">
                    {isLoggedIn && (
                        <Link to="/profile">
                        <li className={`px-4 py-2 ${theme === 'Dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}>
                            Profile
                        </li>
                        </Link>
                    )}
                    <Link to="/aide">
                        <li className={`px-4 py-2 ${theme === 'Dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}>
                            Help
                        </li>
                    </Link>
                    <Link to="/aboutus">
                        <li className={`px-4 py-2 ${theme === 'Dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}>
                            About
                        </li>
                    </Link>
                    {!isLoggedIn && (
                        <Link to="/profile">
                        <li className={`px-4 py-2 ${theme === 'Dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}>
                            Settings
                        </li>
                        </Link>
                    )}
                    {isLoggedIn && (
                        <li
                            onClick={handleLogout}
                            className={` flex items-center gap-3 px-4 py-2 ${theme === 'Dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} cursor-pointer`}
                        >
                            <FaSignOutAlt /> Logout
                        </li>
                    )}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default Settings
