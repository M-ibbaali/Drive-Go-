import React from 'react'

function RentalInfo() {
    return (
        <div className="w-full p-6 rounded-lg bg-white shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Rental Info</h1>
            <p className="text-gray-500 mb-4">Step 2 of 4</p>

            <label className="flex items-center mb-3">
                <input type="radio" name="rentalType" className="mr-2" defaultChecked /> Pick-Up
            </label>
            <div className="flex flex-col gap-3 mb-4">
                <label className="text-gray-700">Locations</label>
                <select className="p-2 border border-gray-300 rounded-md bg-gray-100">
                    <option>Select your city</option>
                </select>

                <label className="text-gray-700">Date</label>
                <input type="date" className="p-2 border border-gray-300 rounded-md bg-gray-100" />

                <label className="text-gray-700">Time</label>
                <select className="p-2 border border-gray-300 rounded-md bg-gray-100">
                    <option>Select your time</option>
                </select>
            </div>

            <label className="flex items-center mb-3">
                <input type="radio" name="rentalType" className="mr-2" /> Drop-Off
            </label>
            <div className="flex flex-col gap-3">
                <label className="text-gray-700">Locations</label>
                <select className="p-2 border border-gray-300 rounded-md bg-gray-100">
                    <option>Select your city</option>
                </select>

                <label className="text-gray-700">Date</label>
                <input type="date" className="p-2 border border-gray-300 rounded-md bg-gray-100" />

                <label className="text-gray-700">Time</label>
                <select className="p-2 border border-gray-300 rounded-md bg-gray-100">
                    <option>Select your time</option>
                </select>
            </div>
        </div>
    )
}

export default RentalInfo
