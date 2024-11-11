import React from 'react'
import { FaCcVisa, FaCcMastercard, FaBitcoin, FaPaypal } from 'react-icons/fa'

function Payment() {
    return (
        <>
            <div className="flex flex-col items-start p-5 bg-gray-50">
                {/* Step 1: Billing Info */}
                <div className="flex gap-6 w-full max-w-6xl mb-5">
                    <div className="w-3/5 p-5 rounded-lg bg-white shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Billing Info</h2>
                        <p className="text-gray-500 mb-1">Step 1 of 4</p>
                        <p className="text-gray-600 mb-6">Please enter your billing info</p>

                        <label className="block text-gray-700 mb-2">Name</label>
                        <input type="text" placeholder="Your name" className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-100" />

                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input type="number" placeholder="Phone number" className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-100" />

                        <label className="block text-gray-700 mb-2">Address</label>
                        <input type="text" placeholder="Address" className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-100" />

                        <label className="block text-gray-700 mb-2">Town/City</label>
                        <input type="text" placeholder="Town or City" className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-100" />
                    </div>

                    <div className="w-2/5 p-5 rounded-lg bg-white shadow-lg ml-5">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Rental Summary</h1>
                        <p className="text-gray-600 mb-6">Prices may change depending on the length of the rental and the price of your rental car</p>
                        <img src="/Pictures/Audi.jfif" alt="Car" className="w-full max-w-xs rounded-md mb-4" />

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Nissan GT - R</h3>
                            <p className="text-yellow-500">⭐ 440+ Reviewer</p>
                        </div>
                        <hr className="my-4" />

                        <div className="text-gray-700">
                            <p className="mb-2">Subtotal: $80.00</p>
                            <p className="mb-2">Tax: $0</p>
                            <button className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">Apply Promo Code</button>
                            <strong className="block text-lg mt-4">Total Rental Price: $80.00</strong>
                        </div>
                    </div>
                </div>

                {/* Step 2: Rental Info */}
                <div className="w-full max-w-2xl p-6 rounded-lg bg-white shadow-lg mb-5">
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

                {/* Step 3: Payment Method */}
                <div className="w-full max-w-2xl p-6 rounded-lg bg-white shadow-lg mb-5">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Payment Method</h1>
                    <p className="text-gray-500 mb-4">Step 3 of 4</p>

                    <label className="flex items-center mb-3">
                        <input type="radio" name="payment" className="mr-2" defaultChecked /> Credit Card
                    </label>
                    <div className="grid gap-4 mb-4">
                        <label className="text-gray-700">Card Number</label>
                        <input type="text" placeholder="Card Number" className="p-2 border border-gray-300 rounded-md bg-gray-100" />

                        <label className="text-gray-700">Expiration Date</label>
                        <input type="text" placeholder="MM/YY" className="p-2 border border-gray-300 rounded-md bg-gray-100" />

                        <label className="text-gray-700">Card Holder</label>
                        <input type="text" placeholder="Card Holder" className="p-2 border border-gray-300 rounded-md bg-gray-100" />

                        <label className="text-gray-700">CVC</label>
                        <input type="text" placeholder="CVC" className="p-2 border border-gray-300 rounded-md bg-gray-100" />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center">
                            <input type="radio" name="payment" className="mr-2" /> PayPal
                            <FaPaypal className="ml-2 text-xl" />
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="payment" className="mr-2" /> Bitcoin
                            <FaBitcoin className="ml-2 text-xl" />
                        </label>
                    </div>
                </div>

                {/* Step 4: Confirmation */}
                <div className="w-full max-w-2xl p-6 rounded-lg bg-white shadow-lg">
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
            </div>
        </>
    )
}

export default Payment
