import {useState, useEffect} from "react"

function Filter({ car, types, capacities, priceRange }) {
    const carData = car[0]
    const [selectedType, setSelectedType] = useState([])
    const [selectedCapacity, setSelectedCapacity] = useState([])

    useEffect(() => {
        if (carData) {
            setSelectedType([carData.type])
            setSelectedCapacity([`${carData.passengers} Person`])
        }
    }, [carData])

    return (
        <div className="w-1/6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Type</h2>
            {(!types || types.length === 0) ? (
                <div className="text-center text-gray-500">
                    <p>Car type not available</p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {types.map((type, index) => (
                        <li key={index}>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedType.includes(type?.type?.split(" ")[0])}
                                    onChange={() => {alert("You can't check !")}}
                                    className="mr-2"
                                />
                                {type.type}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
            
            <h2 className="text-xl font-bold mt-6 mb-4">Capacity</h2>
            {(!capacities || capacities.length === 0) ? (
                <div className="text-center text-gray-500">
                    <p>Car capacity not available</p>
                </div>
            ) : (
                <ul className="space-y-2">
                    {capacities.map((capacity, index) => {
                        const capacityValue = `${capacity.passengers} Person`
                        return (
                            <li key={index}>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedCapacity.includes(capacityValue)}
                                        onChange={() => {alert("You can't check !")}}
                                        className="mr-2"
                                    />
                                    {capacityValue}
                                </label>
                            </li>
                        )
                    })}
                </ul>
            )}
            
            <h2 className="text-xl font-bold mt-6 mb-4">Price</h2>
            {priceRange.min_price !== undefined && priceRange.max_price !== undefined ? (
                <>
                    <input
                        type="range"
                        min={priceRange.min_price}
                        max={priceRange.max_price}
                        value={carData.price || priceRange.min_price}
                        onChange={() => {alert("You can't chnage the price !")}}
                        className="w-full"
                    />
                    <p className="text-gray-700 mt-2">
                        Max. ${carData.price || priceRange.max_price}
                    </p>
                </>
            ) : (
                <div className="text-center text-gray-500">
                    <p className="text-gray-500">Price range not available</p>
                </div>
            )}
        </div>
    )
}

export default Filter
