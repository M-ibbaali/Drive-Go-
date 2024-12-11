import React from 'react';
import { FaGasPump, FaCogs, FaUsers, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Car({ index, car, favorites, handleFavoriteToggle }) {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative">
                <img 
                    src={car.first_img} 
                    alt={car.name} 
                    className="w-full h-56 object-contain"
                />
                <div 
                    className="absolute top-4 right-4 bg-white/80 p-2 rounded-full cursor-pointer"
                    onClick={() => handleFavoriteToggle(index, car.vehicle_id)}
                >
                    <FaHeart 
                        className={`text-2xl ${favorites[index] ? 'text-red-500' : 'text-gray-400'}`} 
                    />
                </div>
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{car.name}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {car.type}
                    </span>
                </div>

                <div className="flex justify-between text-gray-600 mb-4">
                    <div className="flex items-center">
                        <FaGasPump className="mr-2" />
                        <span>{car.gas_capacity}</span>
                    </div>
                    <div className="flex items-center">
                        <FaCogs className="mr-2" />
                        <span>{car.gear}</span>
                    </div>
                    <div className="flex items-center">
                        <FaUsers className="mr-2" />
                        <span>{car.passengers} People</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xl font-bold text-blue-600">
                            {car.price} MAD 
                            <span className="text-sm text-gray-500 ml-1">/day</span>
                        </p>
                        {car.last_price && (
                            <p className="text-sm text-gray-400 line-through">
                                {car.last_price} MAD
                            </p>
                        )}
                    </div>
                    <Link 
                        to={`/reservation/${car.vehicle_id}`} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                        Rent Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Car;