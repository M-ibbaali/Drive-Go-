import React, { useState, useEffect } from 'react'
import Car from './Car'

function Cars({cars, error}) {
    const [favorites, setFavorites] = useState([])
    const [visibleCount, setVisibleCount] = useState(9)

    useEffect(() => {
        setFavorites(Array(cars.length).fill(false))
    }, [cars])

    const handleFavoriteToggle = (index) => {
        setFavorites((prevFavorites) =>
            prevFavorites.map((favorite, i) => (i === index ? !favorite : favorite))
        )
    }

    const handleShowMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 3, cars.length))
    }

    return (
        <>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}
            <div className="p-4">
                {cars.length === 0 ? (
                    <div>No cars match your filters.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-8">
                            {cars.slice(0, visibleCount).map((car, index) => (
                                <Car key={index} index={index} car={car} favorites={favorites} handleFavoriteToggle={handleFavoriteToggle}></Car>
                            ))}
                        </div>
                        <div className="flex items-center mt-4">
                            <button onClick={handleShowMore} className="ml-[50%] px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded text-center">Show more cars</button>
                            <p className="ml-auto text-gray-700">{cars.length} car</p>
                        </div>
                    </>
                    
                )}
            </div>
        </>
    )
}

export default Cars
