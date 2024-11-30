import React, { useState, useEffect, useRef } from 'react'
import { FaBell} from 'react-icons/fa'

function Notification({ notifications = [] }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef(null)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <>
            <div onClick={toggleMenu} className="relative p-2 border rounded-full cursor-pointer">
                <FaBell className="w-4 h-4 text-gray-700 cursor-pointer hover:text-blue-500" />
                <span className="absolute top-0 -right-1 inline-block w-4 h-4 bg-red-500 rounded-full text-xs text-white text-center">{notifications.length}</span>
            </div>
            {isOpen && (
                <div ref={menuRef} className="absolute right-[11rem] mt-[21.5rem] w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-1">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <li key={index} className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                                    {notification}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-800 cursor-pointer">No notifications</li>
                        )}
                    </ul>
                </div>
            )}
        </>
    )
}

export default Notification
