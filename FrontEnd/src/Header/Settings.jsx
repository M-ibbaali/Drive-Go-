import React, { useState, useEffect, useRef } from 'react'
import { FaCog} from 'react-icons/fa'

function Settings() {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return (
        <>
            <div onClick={toggleMenu} className="p-2 border rounded-full cursor-pointer">
                <FaCog className={`w-4 h-4 text-gray-700 cursor-pointer hover:text-blue-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </div>
            {isOpen && (
                <div ref={menuRef} className="absolute right-20 mt-52 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-1">
                        <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Profile</li>
                        <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Aide</li>
                        <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Settings</li>
                        <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Logout</li>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Settings
