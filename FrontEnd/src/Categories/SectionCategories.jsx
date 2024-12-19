// import React, { useState, useEffect } from 'react'
// import Filter from './Filter'
// import Cars from './Cars'
// import { FaFilter } from 'react-icons/fa'


// function SectionCategories() {
//     const [cars, setCars] = useState([])
//     const [error, setError] = useState(null)
//     const [filteredCars, setFilteredCars] = useState([])
//     const [selectedTypes, setSelectedTypes] = useState([])
//     const [selectedCapacities, setSelectedCapacities] = useState([])
//     const [price, setPrice] = useState(0)
//     const [types, setTypes] = useState([])
//     const [capacities, setCapacities] = useState([])
//     const [priceRange, setPriceRange] = useState({})
//     const [loading, setLoading] = useState(true)

//     const [isFilterOpen, setIsFilterOpen] = useState(false)

//     useEffect(() => {
//         const fetchCars = async () => {
//         try {
//             const response = await fetch("http://localhost/drive-go/BackEnd/Cars/cars.php")
//             if (!response.ok) {
//                 throw new Error("Failed to fetch cars data")
//             }
//             const data = await response.json()
//                 if (data.error) {
//                     throw new Error(data.error)
//                 }

//             const carsData = data.data.map((car) => ({
//                 ...car,
//                 price: parseFloat(car.price),
//             }))

//             setPriceRange({
//                 ...data.priceRange,
//                 min_price: parseFloat(data.priceRange.min_price),
//                 max_price: parseFloat(data.priceRange.max_price),
//             })

//             setTypes(data.types)
//             setCapacities(data.capacities)
//             setPriceRange({
//                 min_price: data.priceRange.min_price,
//                 max_price: data.priceRange.max_price,
//             })
//             setFilteredCars(carsData)
//             setPrice(parseFloat(data.priceRange.min_price))

//             setTimeout(() => {
//                 setCars(carsData)
//                 setLoading(false)
//             }, 2000)
//         } catch (error) {
//             setError(error.message)
//         }
//         }

//         fetchCars()
//     }, [])

//     useEffect(() => {
//         const filtered = cars.filter((car) => {
//             const isTypeMatch =
//                 selectedTypes.length === 0 || selectedTypes.includes(car.type)
//             const isCapacityMatch =
//                 selectedCapacities.length === 0 ||
//                 selectedCapacities.includes(car.passengers)
//             const isPriceMatch = car.price >= price
//             return isTypeMatch && isCapacityMatch && isPriceMatch
//         })
//         setFilteredCars(filtered)
//     }, [cars, selectedTypes, selectedCapacities, price])

//     const handleTypeChange = (type) => {
//         setSelectedTypes((prev) =>
//             prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
//         )
//     }

//     const handleCapacityChange = (capacity) => {
//         setSelectedCapacities((prev) =>
//             prev.includes(capacity)
//                 ? prev.filter((c) => c !== capacity)
//                 : [...prev, capacity]
//         )
//     }

//     const toggleFilter = () => {
//         setIsFilterOpen(!isFilterOpen)
//     }

//     return (
//         <>
//             <div className=" mx-auto py-6 px-4">
//                 <div className="md:hidden flex justify-end mb-4">
//                     <button 
//                         onClick={toggleFilter}
//                         className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     >
//                         <FaFilter className="mr-2" /> 
//                         {isFilterOpen ? 'Close' : 'Open'} Filters
//                     </button>
//                 </div>

//                 <div className="flex flex-col md:flex-row gap-3 relative">
//                     {/* Filter for Desktop */}
//                     <div className="hidden md:block">
//                         <Filter
//                             price={price}
//                             setPrice={setPrice}
//                             types={types}
//                             capacities={capacities}
//                             priceRange={priceRange}
//                             handleTypeChange={handleTypeChange}
//                             handleCapacityChange={handleCapacityChange}
//                         />

//                     </div>

//                     {/* Mobile Filter - Overlay */}
//                     {isFilterOpen && (
//                         <div className="fixed inset-0 z-50 md:hidden">
//                             <div 
//                                 className="absolute inset-0 bg-black opacity-50"
//                                 onClick={toggleFilter}
//                             ></div>
//                             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-2xl">
//                                 <Filter
//                                     price={price}
//                                     setPrice={setPrice}
//                                     types={types}
//                                     capacities={capacities}
//                                     priceRange={priceRange}
//                                     handleTypeChange={handleTypeChange}
//                                     handleCapacityChange={handleCapacityChange}
//                                     onClose={toggleFilter}
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex-1 flex flex-col items-center gap-5">
//                         {filteredCars ? (
//                         loading ? (
//                             <div className="flex items-center justify-center mt-4">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
//                             </div>
//                         ) : (
//                             <Cars cars={filteredCars} error={error} />
//                         )
//                         ) : loading ? (
//                             <div className="flex items-center justify-center mt-4">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
//                             </div>
//                         ) : (
//                             <Cars cars={cars} error={error} />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SectionCategories
import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Cars from './Cars'
import { FaFilter } from 'react-icons/fa'
import Filter_Date from './Filter_Date'

function SectionCategories() {
    const [cars, setCars] = useState([])
    const [error, setError] = useState(null)
    const [filteredCars, setFilteredCars] = useState([])
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedCapacities, setSelectedCapacities] = useState([])
    const [price, setPrice] = useState(0)
    const [types, setTypes] = useState([])
    const [capacities, setCapacities] = useState([])
    const [priceRange, setPriceRange] = useState({})
    const [loading, setLoading] = useState(true)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    // Add new state for date filtering
    const [pickupLocation, setPickupLocation] = useState('Rabat')
    const [dropoffLocation, setDropoffLocation] = useState('Rabat')
    const [pickupDate, setPickupDate] = useState('12/18/2024')
    const [dropoffDate, setDropoffDate] = useState('12/25/2024')

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch("http://localhost/drive-go/BackEnd/Cars/cars.php")
                if (!response.ok) {
                    throw new Error("Failed to fetch cars data")
                }
                const data = await response.json()
                if (data.error) {
                    throw new Error(data.error)
                }

                const carsData = data.data.map((car) => ({
                    ...car,
                    price: parseFloat(car.price),
                }))

                setPriceRange({
                    ...data.priceRange,
                    min_price: parseFloat(data.priceRange.min_price),
                    max_price: parseFloat(data.priceRange.max_price),
                })

                setTypes(data.types)
                setCapacities(data.capacities)
                setPriceRange({
                    min_price: data.priceRange.min_price,
                    max_price: data.priceRange.max_price,
                })
                setFilteredCars(carsData)
                setPrice(parseFloat(data.priceRange.min_price))

                setTimeout(() => {
                    setCars(carsData)
                    setLoading(false)
                }, 2000)
            } catch (error) {
                setError(error.message)
            }
        }

        fetchCars()
    }, [])

    useEffect(() => {
        const filtered = cars.filter((car) => {
            const isTypeMatch =
                selectedTypes.length === 0 || selectedTypes.includes(car.type)
            const isCapacityMatch =
                selectedCapacities.length === 0 ||
                selectedCapacities.includes(car.passengers)
            const isPriceMatch = car.price >= price
            
            // Add date and location filtering logic here if needed
            // For now, we're just passing through the date/location filters
            // You might want to add actual availability checking logic here
            const isLocationMatch = true // Implement based on your needs
            const isDateAvailable = true // Implement based on your needs

            return isTypeMatch && isCapacityMatch && isPriceMatch && isLocationMatch && isDateAvailable
        })
        setFilteredCars(filtered)
    }, [cars, selectedTypes, selectedCapacities, price, pickupLocation, dropoffLocation, pickupDate, dropoffDate])

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        )
    }

    const handleCapacityChange = (capacity) => {
        setSelectedCapacities((prev) =>
            prev.includes(capacity)
                ? prev.filter((c) => c !== capacity)
                : [...prev, capacity]
        )
    }

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    return (
        <>
            <div className="mx-auto py-6 px-4">
                <div className="md:hidden flex justify-end mb-4">
                    <button 
                        onClick={toggleFilter}
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        <FaFilter className="mr-2" /> 
                        {isFilterOpen ? 'Close' : 'Open'} Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-3 relative">
                    {/* Filter for Desktop */}
                    <div className="hidden md:block">
                        <Filter
                            price={price}
                            setPrice={setPrice}
                            types={types}
                            capacities={capacities}
                            priceRange={priceRange}
                            handleTypeChange={handleTypeChange}
                            handleCapacityChange={handleCapacityChange}
                            // Add new date filter props
                            pickupLocation={pickupLocation}
                            setPickupLocation={setPickupLocation}
                            dropoffLocation={dropoffLocation}
                            setDropoffLocation={setDropoffLocation}
                            pickupDate={pickupDate}
                            setPickupDate={setPickupDate}
                            dropoffDate={dropoffDate}
                            setDropoffDate={setDropoffDate}
                        />
                    </div>

                    {/* Mobile Filter - Overlay */}
                    {isFilterOpen && (
                        <div className="fixed inset-0 z-50 md:hidden">
                            <div 
                                className="absolute inset-0 bg-black opacity-50"
                                onClick={toggleFilter}
                            ></div>
                            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-2xl">
                                <Filter
                                    price={price}
                                    setPrice={setPrice}
                                    types={types}
                                    capacities={capacities}
                                    priceRange={priceRange}
                                    handleTypeChange={handleTypeChange}
                                    handleCapacityChange={handleCapacityChange}
                                    onClose={toggleFilter}
                                    // Add new date filter props
                                    pickupLocation={pickupLocation}
                                    setPickupLocation={setPickupLocation}
                                    dropoffLocation={dropoffLocation}
                                    setDropoffLocation={setDropoffLocation}
                                    pickupDate={pickupDate}
                                    setPickupDate={setPickupDate}
                                    dropoffDate={dropoffDate}
                                    setDropoffDate={setDropoffDate}
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex-1 flex flex-col items-center gap-5">
                        <Filter_Date></Filter_Date>
                        {filteredCars ? (
                            loading ? (
                                <div className="flex items-center justify-center mt-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                                </div>
                            ) : (
                                <Cars cars={filteredCars} error={error} />
                            )
                        ) : loading ? (
                            <div className="flex items-center justify-center mt-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <Cars cars={cars} error={error} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionCategories
