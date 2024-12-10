import React from 'react'
import { Link } from 'react-router-dom'

function BillingInfo({ userData }) {
    return (
        <div className="w-full p-5 rounded-lg bg-white shadow-lg">
            {userData.length === 0 ? (
                <>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Notice</h1>
                        <p className="text-gray-600 mb-6">
                            Sorry, but you're not logged in, so you can't continue. 
                            Click on the button below to login and come back.
                        </p>
                        <Link
                            to="/login"
                            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Login First
                        </Link>
                    </div>
                </>
            ) : (
                    <>
                        <p className="text-gray-500 mb-1 text-right">Step 1 of 4</p>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Billing Info</h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={userData.full_name}
                                    readOnly
                                    placeholder="Your name"
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="number"
                                    value={userData.phone_number}
                                    readOnly
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
                                    value={userData.address}
                                    readOnly
                                    placeholder="Address"
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">CIN</label>
                                <input
                                    type="text"
                                    value={userData.cin}
                                    readOnly
                                    placeholder="Enter CIN"
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default BillingInfo
