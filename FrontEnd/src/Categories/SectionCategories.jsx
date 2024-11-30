import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import SearchBar from '../Home/SearchBar'
import Cars from './Cars'

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

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Cars/cars.php')
                    if (!response.ok) {
                    throw new Error('Failed to fetch cars data')
                }
                const data = await response.json()
                if (data.error) {
                    throw new Error(data.error)
                }

                const carsData = data.data.map(car => ({
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
                    max_price: data.priceRange.max_price
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
        const filtered = cars.filter(car => {
            const isTypeMatch = selectedTypes.length === 0 || selectedTypes.includes(car.type)
            const isCapacityMatch = selectedCapacities.length === 0 || selectedCapacities.includes(car.passengers)
            const isPriceMatch = car.price >= price
            return isTypeMatch && isCapacityMatch && isPriceMatch
        })
        setFilteredCars(filtered)
    }, [cars, selectedTypes, selectedCapacities, price])

    const handleTypeChange = (type) => {
        setSelectedTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        )
    }

    const handleCapacityChange = (capacity) => {
        setSelectedCapacities(prev => 
            prev.includes(capacity) ? prev.filter(c => c !== capacity) : [...prev, capacity]
        )
    }
    
    return (
        <>
            <div className="container mx-auto p-6">
                <div className="flex gap-6">
                <Filter
                    price={price}
                    setPrice={setPrice}
                    types={types}
                    capacities={capacities}
                    priceRange={priceRange}
                    handleTypeChange={handleTypeChange}
                    handleCapacityChange={handleCapacityChange}
                ></Filter>
                <div className="flex-1 flex flex-col items-center gap-5">
                    <SearchBar></SearchBar>
                    {filteredCars ?
                        (loading ? (
                            <>
                                <div className="flex items-center mt-4 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                </div>
                            </>
                        ) : (
                            <Cars cars={filteredCars} error={error} />
                        )) : (loading ? (
                            <>
                                <div className="flex items-center mt-4 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                </div>
                            </>
                        ) : (
                            <Cars cars={cars} error={error} />
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}

export default SectionCategories
