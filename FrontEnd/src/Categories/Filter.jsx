import React from "react"

function Filter({ price, setPrice, types, capacities, priceRange, handleTypeChange, handleCapacityChange }) {
    return (
        <div className="w-full md:w-1/6 p-4 rounded-lg bg-white shadow-md"> 
    <h2 className="text-xl font-bold mb-4">Type</h2>
    <ul className="space-y-2">
        {types.map((type, index) => (
            <li key={index}>
                <label className="flex items-center">
                    <input 
                        type="checkbox" 
                        className="mr-2 border-gray-300 rounded-sm" 
                    />
                    {type.type}
                </label>
            </li>
        ))}
    </ul>

    <h2 className="text-xl font-bold mt-6 mb-4">Capacity</h2>
    <ul className="space-y-2">
        {capacities.map((capacity, index) => (
            <li key={index}>
                <label className="flex items-center">
                    <input 
                        type="checkbox" 
                        className="mr-2 border-gray-300 rounded-sm" 
                    />
                    {capacity.passengers} Person
                </label>
            </li>
        ))}
    </ul>

    <h2 className="text-xl font-bold mt-6 mb-4">Price</h2>
    <div className="flex items-center">
        <input 
            type="range" 
            min={priceRange.min_price}
            max={priceRange.max_price}
            value={price}
            onChange={(e) => setPrice(e.target.value)} 
            className="w-full" 
        />
        <p className="text-black font-bold ml-2">Min. {price} MAD</p>
    </div>
</div>
    )
}

export default Filter
