import React, { useState, useEffect } from 'react'
import { FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Profile() {
    const theme = localStorage.getItem('theme')
    
    useEffect(() => {
        document.documentElement.className = theme === 'Dark' ? 'dark' : ''
    }, [theme])

    return (
        <>
            <Link to="/profile" className="p-2 border rounded-full">
                <FaUser className={`w-4 h-4 ${theme === 'Dark' ? 'text-gray-200' : 'text-gray-700'} cursor-pointer hover:${theme === 'Dark' ? 'text-blue-500 ' : 'text-black'}`} />
            </Link>
        </>
    )
}

export default Profile
