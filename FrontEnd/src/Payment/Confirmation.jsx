import React from 'react'

function Confirmation() {
    return (
        <div className="w-full p-6 rounded-lg bg-white shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Confirmation</h1>
            <p className="text-gray-500 mb-4">Step 4 of 4</p>
            <p className="text-gray-600 mb-4">We are getting to the end. Just a few clicks and your rental is ready!</p>

            <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" /> I agree with sending marketing and newsletter emails. No spam, promised!
            </label>
            <label className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" /> I agree with the terms and conditions and privacy policy.
            </label>

            <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Rent Now</button>
            <h3 className="text-lg font-semibold text-gray-700 mt-4">All your data are safe</h3>
            <p className="text-gray-500">We are using the latest encryption technology to keep your data secure!</p>
        </div>
    )
}

export default Confirmation
