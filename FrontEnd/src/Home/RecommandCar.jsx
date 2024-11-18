import React, { useState } from 'react'
import { FaGasPump, FaCogs, FaUsers, FaHeart} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function RecommandCar() {
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
    ]

    const [favorites, setFavorites] = useState(Array(cars.length).fill(false))

    const handleFavoriteToggle = (index) => {
        const newFavorites = [...favorites]
        newFavorites[index] = !newFavorites[index]
        setFavorites(newFavorites)
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Recommended Cars</h2>
            <div className="grid grid-cols-4 gap-8">
                {cars.slice(0, 4).map((car, index) => (
                    <div key={index} className="bg-primary p-4 rounded">
                        <h3 className="text-lg font-semibold flex items-center">
                            {car.name}
                            <FaHeart 
                                className={`cursor-pointer ml-auto ${favorites[index] ? 'text-red-600' : 'text-gray-500'}`} 
                                onClick={() => handleFavoriteToggle(index)} 
                            />
                        </h3>
                        <p className="text-gray-500">{car.type}</p>
                        <img src={car.img} alt={car.name} className="w-max h-48 object-cover rounded" />
                        <div className="flex mt-2 text-gray-700">
                            <p className="mr-5"><FaGasPump className="inline-block mr-2" />{car.gas}</p>
                            <p className="mr-5"><FaCogs className="inline-block mr-2" />{car.gear}</p>
                            <p className="mr-5"><FaUsers className="inline-block mr-2" />{car.passengers} People</p>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-black font-bold">
                                {car.price} /<span className="text-gray-300 font-semibold">day</span>
                            </p>
                            <Link to="/reservation">
                                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">Rent Now</button>
                            </Link>
                        </div>
                        <p className="text-gray-500 line-through">{car.lastPrice}</p>
                    </div>
                ))}
            </div>
            <div className="flex  items-center mt-4">
                <Link to="/categories" className="ml-[50%] px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded text-center cursor-pointer">Show more cars</Link>
                <p className="ml-auto text-gray-700">{cars.length} car</p>
            </div>
        </div>
    )
}

export default RecommandCar
