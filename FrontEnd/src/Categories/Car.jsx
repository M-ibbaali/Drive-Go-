import React from 'react'
import { FaGasPump, FaCogs, FaUsers, FaHeart} from 'react-icons/fa'

function Car({index, car, favorites, handleFavoriteToggle}) {
    return (
        <>
            <div key={index} className="bg-primary p-4 rounded">
                <h3 className="text-lg font-semibold flex items-center">
                    {car.name}
                    <FaHeart 
                        className={`cursor-pointer ml-auto ${favorites[index] ? 'text-red-600' : 'text-gray-500'}`} 
                        onClick={() => handleFavoriteToggle(index)} 
                    />
                </h3>
                <p className="text-gray-500">{car.type}</p>
                <img src={car.img} alt={car.name} className="w-max h-48 object-cover rounded" />
                <div className="flex mt-2 text-gray-700">
                    <p className="mr-5"><FaGasPump className="inline-block mr-2" />{car.gas}</p>
                    <p className="mr-5"><FaCogs className="inline-block mr-2" />{car.gear}</p>
                    <p className="mr-5"><FaUsers className="inline-block mr-2" />{car.passengers} People</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-black font-bold">
                        {car.price} /<span className="text-gray-300 font-semibold">day</span>
                    </p>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">Rent Now</button>
                </div>
                <p className="text-gray-500 line-through">{car.lastPrice}</p>
            </div>
        </>
    )
}

export default Car
