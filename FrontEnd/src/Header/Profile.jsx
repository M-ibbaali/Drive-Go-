import React from 'react'
import { FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Profile() {

    return (
        <>
            <Link to="/profile">
                <FaUserCircle className="w-10 h-10 text-gray-700 cursor-pointer hover:text-black" />
            </Link>
        </>
    )
}

export default Profile
