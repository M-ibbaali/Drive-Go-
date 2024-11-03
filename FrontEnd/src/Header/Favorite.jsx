import React from 'react'
import { FaHeart} from 'react-icons/fa'

function Favorite() {

    return (
        <>
            <div className="p-2 border rounded-full">
                <FaHeart className="w-4 h-4 text-gray-700 cursor-pointer hover:text-red-500" />
            </div>
        </>
    )
}

export default Favorite
