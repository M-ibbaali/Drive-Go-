import React from "react"

function Filter({ price, setPrice }) {
    return (
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Type</h2>
            <ul className="space-y-2">
                {["Sport (10)", "SUV (12)", "MPV (16)", "Sedan (20)", "Coupe (16)", "Hatchback (12)"].map(type => (
                    <li key={type}>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            {type}
                        </label>
                    </li>
                ))}
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-4">Capacity</h2>
            <ul className="space-y-2">
                {["2 Person (10)", "4 Person (14)", "6 Person (10)", "8 or More (6)"].map(capacity => (
                    <li key={capacity}>
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            {capacity}
                        </label>
                    </li>
                ))}
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-4">Price</h2>
            <input 
                type="range" 
                min="0" 
                max="200" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="w-full" 
            />
            <p className="text-gray-700 mt-2">Max. ${price}</p>
        </div>
    )
}

export default Filter
