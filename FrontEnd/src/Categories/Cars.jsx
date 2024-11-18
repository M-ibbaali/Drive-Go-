import React, { useState } from 'react'
import Car from './Car'

function Cars() {
    const cars = [
        { 
            name: "McLaren P1", 
            type: "Supercar", 
            price: "$120.00", 
            lastPrice: "$130.00",
            img: "/Pictures/Audi.jfif", 
            gas: "40L", 
            gear: "Automatic", 
            passengers: 2 
        },
        { 
            name: "Lamborghini Aventador", 
            type: "Supercar", 
            price: "$150.00", 
            lastPrice: "$160.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "45L", 
            gear: "Automatic", 
            passengers: 2 
        },
        { 
            name: "BMW M3", 
            type: "Sedan", 
            price: "$85.00", 
            lastPrice: "$95.00",
            img: "/Pictures/Audi.jfif", 
            gas: "55L", 
            gear: "Manual", 
            passengers: 5 
        },
        { 
            name: "Audi R8", 
            type: "Coupe", 
            price: "$110.00", 
            lastPrice: "$115.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "50L", 
            gear: "Automatic", 
            passengers: 2 
        },
        { 
            name: "Porsche 911", 
            type: "Sport", 
            price: "$95.00", 
            lastPrice: "$100.00", 
            img: "/Pictures/Audi.jfif", 
            gas: "60L", 
            gear: "Manual", 
            passengers: 4 
        },
        { 
            name: "Tesla Model S", 
            type: "Electric", 
            price: "$110.00", 
            lastPrice: "$120.00", 
            img: "/Pictures/Porcshe.jfif", 
            gas: "0L", 
            gear: "Automatic", 
            passengers: 5 
        },
        { 
            name: "Nissan GT - R", 
            type: "Sport", 
            price: "$80.00", 
            lastPrice: "$90.00",
            img: "/Pictures/Audi.jfif", 
            gas: "60L", 
            gear: "Automatic", 
            passengers: 4 
        },
        { 
            name: "Rolls - Royce", 
            type: "Sedan", 
            price: "$96.00", 
            lastPrice: "$105.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "70L", 
            gear: "Automatic", 
            passengers: 5 
        },
        {
            name: "BMW M5",
            type: "Sport",
            price: "$100.00",
            lastPrice: "$125.00",
            img: "/Pictures/Audi.jfif",
            gas: "60L",
            gear: "Manual",
            passengers: 4
        },
        { 
            name: "McLaren P1", 
            type: "Supercar", 
            price: "$120.00", 
            lastPrice: "$130.00",
            img: "/Pictures/Audi.jfif", 
            gas: "40L", 
            gear: "Automatic", 
            passengers: 2 
        },
        { 
            name: "Lamborghini Aventador", 
            type: "Supercar", 
            price: "$150.00", 
            lastPrice: "$160.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "45L", 
            gear: "Automatic", 
            passengers: 2 
        },
        { 
            name: "BMW M3", 
            type: "Sedan", 
            price: "$85.00", 
            lastPrice: "$95.00",
            img: "/Pictures/Audi.jfif", 
            gas: "55L", 
            gear: "Manual", 
            passengers: 5 
        },
        { 
            name: "Audi R8", 
            type: "Coupe", 
            price: "$110.00", 
            lastPrice: "$115.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "50L", 
            gear: "Automatic", 
            passengers: 2 
        },
        { 
            name: "Porsche 911", 
            type: "Sport", 
            price: "$95.00", 
            lastPrice: "$100.00", 
            img: "/Pictures/Audi.jfif", 
            gas: "60L", 
            gear: "Manual", 
            passengers: 4 
        },
        { 
            name: "Tesla Model S", 
            type: "Electric", 
            price: "$110.00", 
            lastPrice: "$120.00", 
            img: "/Pictures/Porcshe.jfif", 
            gas: "0L", 
            gear: "Automatic", 
            passengers: 5 
        },
        { 
            name: "Nissan GT - R", 
            type: "Sport", 
            price: "$80.00", 
            lastPrice: "$90.00",
            img: "/Pictures/Audi.jfif", 
            gas: "60L", 
            gear: "Automatic", 
            passengers: 4 
        },
        { 
            name: "Rolls - Royce", 
            type: "Sedan", 
            price: "$96.00", 
            lastPrice: "$105.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "70L", 
            gear: "Automatic", 
            passengers: 5 
        },
        {
            name: "BMW M5",
            type: "Sport",
            price: "$100.00",
            lastPrice: "$125.00",
            img: "/Pictures/Audi.jfif",
            gas: "60L",
            gear: "Manual",
            passengers: 4
        },
    ]
    const [favorites, setFavorites] = useState(Array(cars.length).fill(false))
    const [visibleCount, setVisibleCount] = useState(9)

    const handleFavoriteToggle = (index) => {
        const newFavorites = [...favorites]
        newFavorites[index] = !newFavorites[index]
        setFavorites(newFavorites)
    }

    const handleShowMore = () => {
        setVisibleCount((prevCount) => Math.min(prevCount + 3, cars.length))
    }

    return (
        <>
            <div className="p-4">
                <div className="grid grid-cols-3 gap-8">
                    {cars.slice(0, visibleCount).map((car, index) => (
                        <Car index={index} car={car} favorites={favorites} handleFavoriteToggle={handleFavoriteToggle}></Car>
                    ))}
                </div>
                <div className="flex  items-center mt-4">
                    <button onClick={handleShowMore} className="ml-[50%] px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded text-center">Show more cars</button>
                    <p className="ml-auto text-gray-700">{cars.length} car</p>
                </div>
            </div>
        </>
    )
}

export default Cars
