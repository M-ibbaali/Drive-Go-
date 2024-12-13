import React from 'react'

function SearchBar({ location, pickUp, DropOff, cities }) {
    return (
        <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-around items-center mb-4">
                <div className="flex flex-col items-start w-[40%]">
                    {/* Pick-Up Section */}
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="radio"
                            name="pickUp"
                            id="pick"
                            checked
                            readOnly
                            className="cursor-pointer"
                        />
                        <label htmlFor="pick" className="block text-sm font-semibold cursor-pointer">Pick-Up</label>
                    </div>
                    <select
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        value={location}
                        disabled
                    >
                        <option value="">Select your city</option>
                        {cities.map((city, index) => (
                            <option
                                key={index}
                                value={city.location}
                            >
                                {city.location}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="datePick" className="block text-sm font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        id="datePick"
                        value={pickUp || ''}
                        readOnly
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                </div>

                <div className="flex flex-col items-start w-[40%]">
                    {/* Drop-Off Section */}
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="radio"
                            name="DropOff"
                            id="drop"
                            checked
                            readOnly
                            className="cursor-pointer"
                        />
                        <label htmlFor="drop" className="block text-sm font-semibold cursor-pointer">Drop-Off</label>
                    </div>
                    <select
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        value={location}
                        disabled
                    >
                        <option value="">Select your city</option>
                        {cities.map((city, index) => (
                            <option
                                key={index}
                                value={city.location}
                            >
                                {city.location}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="dateDrop" className="block text-sm font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        id="dateDrop"
                        value={DropOff || ''}
                        readOnly
                        className="border rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchBar
