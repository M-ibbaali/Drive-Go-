import {FaHeart} from 'react-icons/fa'
import {AiFillStar } from 'react-icons/ai'

function CarDetails({ price }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex">
                <div className="w-1/2 space-y-4">
                    <img
                        src="/Pictures/Hunday-1.jpeg"
                        alt="Nissan GT-R Main"
                        className="w-full rounded-lg"
                    />
                    <div className="flex space-x-4 mt-4">
                        <img src="/Pictures/Hunday-1.jpeg" alt="Nissan GT-R Thumbnail 1" className="w-1/3 rounded-lg cursor-pointer hover:opacity-80" />
                        <img src="/Pictures/Hunday-3.jpeg" alt="Nissan GT-R Thumbnail 2" className="w-1/3 rounded-lg cursor-pointer hover:opacity-80" />
                        <img src="/Pictures/Hunday-4.jpeg" alt="Nissan GT-R Thumbnail 3" className="w-1/3 rounded-lg cursor-pointer hover:opacity-80" />
                    </div>
                </div>
                
                <div className="w-1/2 pl-6">
                    <h1 className="text-3xl font-bold flex items-center justify-between">Nissan GT – R
                        <FaHeart className="text-red-500 text-2xl ml-3 cursor-pointer" />
                    </h1>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, index) => (
                            <AiFillStar key={index} className="text-yellow-500 text-xl" />
                        ))}
                        <span className="text-gray-600 ml-2">24+ reviews</span>
                    </div>
                    <p className="text-gray-500 mt-2">Sports car with the best design and acceleration.</p>
                    <p className="text-gray-600 mt-4">The embodiment of Nissan's challenging spirit.</p>
                    <div className="flex mt-4">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Sport</span>
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">Capacity: 2 Person</span>
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">Manual</span>
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">Gasoline</span>
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">70L</span>
                    </div>
                    <p className="text-2xl font-bold mt-6">${price}.00/day</p>
                    <button className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-lg">Rent Now</button>
                </div>
            </div>
        </div>
    )
}

export default CarDetails
