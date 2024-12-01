import { useState } from 'react'

function RentalInfo() {
    const [rentalType, setRentalType] = useState('pickup')

    const handleRentalTypeChange = (event) => {
        setRentalType(event.target.value)
    }

    return (
        <div className="w-full p-6 rounded-lg bg-white shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Rental Info</h1>
            <p className="text-gray-500 mb-4 text-right">Step 2 of 4</p>

            {/* Pick-Up Radio Button */}
            <label className="flex items-center mb-3 bg-gray-100 p-3 rounded-lg">
                <input
                    type="radio"
                    name="rentalType"
                    value="pickup"
                    className="mr-2 border rounded-lg bg-gray-100 text-lg p-3"
                    checked={rentalType === 'pickup'}
                    onChange={handleRentalTypeChange}
                />
                Pick-Up
            </label>

            {/* Pick-Up Fields */}
            {rentalType === 'pickup' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-3 rounded-lg mb-4">
                    <div>
                        <label className="text-gray-700">Locations</label>
                        <select className="w-full p-3 border rounded-lg">
                            <option>Select your city</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-700">Date</label>
                        <input type="date" className="w-full p-3 border rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-700">Time</label>
                        <select className="w-full p-3 border rounded-lg">
                            <option>Select your time</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Drop-Off Radio Button */}
            <label className="flex items-center mb-3 bg-gray-100 p-3 rounded-lg">
                <input
                    type="radio"
                    name="rentalType"
                    value="dropoff"
                    className="mr-2 border rounded-lg bg-gray-100 text-lg p-3"
                    checked={rentalType === 'dropoff'}
                    onChange={handleRentalTypeChange}
                />
                Drop-Off
            </label>

            {/* Drop-Off Fields */}
            {rentalType === 'dropoff' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-3 rounded-lg">
                    <div>
                        <label className="text-gray-700">Locations</label>
                        <select className="w-full p-3 border rounded-lg">
                            <option>Select your city</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-700">Date</label>
                        <input type="date" className="w-full p-3 border rounded-lg" />
                    </div>

                    <div>
                        <label className="text-gray-700">Time</label>
                        <select className="w-full p-3 border rounded-lg">
                            <option>Select your time</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RentalInfo
