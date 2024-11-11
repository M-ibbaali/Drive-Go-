import {useState} from 'react'
import {FaHeart, FaGasPump, FaCogs, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function RecentCars() {
    const cars = [
        { 
            name: "Koenigsegg", 
            type: "Sport", 
            price: "$99.00", 
            lastPrice: "$110.00",
            img: "/Pictures/Audi.jfif", 
            gas: "50L", 
            gear: "Manual", 
            passengers: 2 
        },
        { 
            name: "Nissan GT - R", 
            type: "Sport", 
            price: "$80.00", 
            lastPrice: "$90.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "60L", 
            gear: "Automatic", 
            passengers: 4 
        },
        { 
            name: "Rolls - Royce", 
            type: "Sedan", 
            price: "$96.00", 
            lastPrice: "$105.00",
            img: "/Pictures/Audi.jfif", 
            gas: "70L", 
            gear: "Automatic", 
            passengers: 5 
        },
        { 
            name: "Ferrari", 
            type: "Coupe", 
            price: "$100.00", 
            lastPrice: "$110.00",
            img: "/Pictures/Porcshe.jfif", 
            gas: "55L", 
            gear: "Manual", 
            passengers: 2 
        },
    ]

    const [favorites, setFavorites] = useState(Array(cars.length).fill(false))

    const handleFavoriteToggle = (index) => {
        const newFavorites = [...favorites];
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
    }

    return (
        <>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    Recent Car
                    <Link to="/recentCars" className="text-blue-500 font-normal ml-auto hover:underline mb-4 inline-block text-base cursor-pointer">View All</Link>
                </h2>
                <div className="grid grid-cols-4 gap-8">
                    {cars.map((car, index) => (
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
                                <p className='mr-5'><FaGasPump className="inline-block mr-2" />{car.gas}</p>
                                <p className='mr-5'><FaCogs className="inline-block mr-2" />{car.gear}</p>
                                <p className='mr-5'><FaUsers className="inline-block mr-2" />{car.passengers} People</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-black font-bold">
                                    {car.price} /<span className="text-gray-300 font-semibold">day</span>
                                </p>
                                <Link to="/reservation" className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">Rent Now</Link>
                            </div>
                            <p className="text-gray-300 font-semibold line-through">{car.lastPrice}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RecentCars
