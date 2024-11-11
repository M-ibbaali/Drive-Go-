import React from 'react'
import { Link } from 'react-router-dom'

function ContentHome() {

    return (
        <>
            <div className="bg-tertiary flex justify-center gap-4 p-8">
                <div className="bg-blue-500 p-6 rounded text-white flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold">The Best Platform for Car Rental</h2>
                    <p>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
                    <Link to="reservation">
                        <button className="mt-4 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded">Rental Car</button>
                    </Link>
                    {/* <img src="/Pictures/Porcshe.jfif" alt="" className="object-cover rounded-l-lg w-full"/> */}
                </div>
                <div className="bg-blue-700 p-6 rounded text-white flex flex-col items-center text-center">
                    <h2 className="text-2xl font-semibold">Easy way to rent a car at a low price</h2>
                    <p>Providing cheap car rental services and safe and comfortable facilities.</p>
                    <Link to="reservation">
                        <button className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Rental Car</button>
                    </Link>
                    {/* <img src="/Pictures/Porcshe.jfif" alt="" className="object-cover rounded-l-lg w-full"/> */}
                </div>
            </div>
        </>
    )
}

export default ContentHome
