import React from 'react'

function RentalSummary() {
    return (
        <div className="w-1/3 p-5 rounded-lg bg-white shadow-lg ml-5">
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
    )
}

export default RentalSummary
