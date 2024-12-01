import React from 'react'

function BillingInfo() {
    return (
        <div className="w-full p-5 rounded-lg bg-white shadow-lg">
            <p className="text-gray-500 mb-1 text-right">Step 1 of 4</p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Billing Info</h2>
            <p className="text-gray-600 mb-6">Please enter your billing info</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        className="w-full p-3 border rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Phone Number</label>
                    <input
                        type="number"
                        placeholder="Phone number"
                        className="w-full p-3 border rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full p-3 border rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Town/City</label>
                    <input
                        type="text"
                        placeholder="Town or City"
                        className="w-full p-3 border rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
        </div>
    )
}

export default BillingInfo
