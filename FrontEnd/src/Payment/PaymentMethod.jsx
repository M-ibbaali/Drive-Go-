import React from 'react'
import { FaPaypal, FaBitcoin } from 'react-icons/fa'

function PaymentMethod() {
    return (
        <div className="w-full p-6 rounded-lg bg-white shadow-lg">
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
    )
}

export default PaymentMethod
