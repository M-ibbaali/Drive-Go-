import React from 'react';
import { FaCar, FaUsers, FaMoneyBillWave, FaTimes } from 'react-icons/fa';

function Filter({ price, setPrice, types, capacities, priceRange, handleTypeChange, handleCapacityChange, onClose }) {
    return (
        <div className="w-full bg-white rounded-xl p-6">
            {/* Mobile Close Button */}
            {onClose && (
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <FaCar className="mr-3 text-blue-500" />
                    Car Types
                </h2>
                <div className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-2">
                    {types.map((type, index) => (
                        <label 
                            key={index} 
                            className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 mr-3"
                                onChange={() => handleTypeChange(type.type)}
                            />
                            <span className="text-gray-700">{type.type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <FaUsers className="mr-3 text-blue-500" />
                    Passenger Capacity
                </h2>
                <div className="space-y-2 grid grid-cols-2 md:grid-cols-1 gap-2">
                    {capacities.map((capacity, index) => (
                        <label 
                            key={index} 
                            className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                        >
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 mr-3"
                                onChange={() => handleCapacityChange(capacity.passengers)}
                            />
                            <span className="text-gray-700">{capacity.passengers} Persons</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <FaMoneyBillWave className="mr-3 text-blue-500" />
                    Price Range
                </h2>
                <div className="flex flex-col">
                    <input
                        type="range"
                        min={priceRange.min_price}
                        max={priceRange.max_price}
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>{priceRange.min_price}</span>
                        <span className="font-bold text-blue-600">{price}</span>
                        <span>{priceRange.max_price}</span>
                    </div>
                </div>
            </div>

            {/* Mobile Apply Button */}
            {onClose && (
                <button 
                    onClick={onClose}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 md:hidden"
                >
                    Apply Filters
                </button>
            )}
        </div>
    );
}

export default Filter;

