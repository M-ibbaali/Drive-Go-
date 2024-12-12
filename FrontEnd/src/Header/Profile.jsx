import React from 'react'
import { FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Profile() {

    return (
        <>
            <Link to="/profile" className="p-2 border rounded-full">
                <FaUser className="w-4 h-4 text-gray-700 cursor-pointer hover:text-black" />
            </Link>
        </>
    )
}

export default Profile
