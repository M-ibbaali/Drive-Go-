import { useState , useEffect } from 'react'
import {FaHeart, FaTimes } from 'react-icons/fa'
import {AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'

function CarDetails({ car, error }) {
    const carDetails = car && car.length > 0 ? car[0] : null
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState(false)
    const [mainImage, setMainImage] = useState('')
    const [fullscreen, setFullscreen] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 2000)
        return () => clearTimeout(timeout)
    }, [])

    useEffect(() => {
        if (carDetails) {
            setMainImage(carDetails.first_img)
        }
    }, [carDetails])

    const handleFavoriteToggle = () => {
        setFavorites(!favorites)
    }

    const handleImageClick = (img) => {
        setMainImage(img)
    }

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && fullscreen) {
                setFullscreen(false)
            }
        }

        if (fullscreen) {
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [fullscreen])

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            {(!car || car.length === 0) ? (
                <div className="text-center text-gray-500">
                    <p>{error}</p>
                </div>
            ) : (
                loading ? (
                        <div className='flex justify-center items-center'>
                            <div className="flex items-center mt-4 h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex">
                                <div className="w-1/2 space-y-4">
                                    <img
                                        src={mainImage}
                                        alt={carDetails.name}
                                        className="w-full rounded-lg cursor-pointer"
                                        onClick={() => toggleFullscreen()}
                                    />
                                    <div className="flex space-x-4 mt-4">
                                        <img
                                            src={carDetails.first_img}
                                            alt={carDetails.name}
                                            className="w-1/3 rounded-lg cursor-pointer hover:opacity-80"
                                            onClick={() => handleImageClick(carDetails.first_img)}
                                        />
                                        <img
                                            src={carDetails.second_img}
                                            alt={carDetails.name}
                                            className="w-1/3 rounded-lg cursor-pointer hover:opacity-80"
                                            onClick={() => handleImageClick(carDetails.second_img)}
                                        />
                                        <img
                                            src={carDetails.third_img}
                                            alt={carDetails.name}
                                            className="w-1/3 rounded-lg cursor-pointer hover:opacity-80"
                                            onClick={() => handleImageClick(carDetails.third_img)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="w-1/2 pl-6">
                                    <h1 className="text-3xl font-bold flex items-center justify-between">{carDetails.name}
                                        <FaHeart onClick={handleFavoriteToggle} className={`${favorites ? 'text-red-600' : 'text-gray-500'} text-2xl ml-3 cursor-pointer`} />
                                    </h1>
                                    <div className="flex items-center mt-2">
                                        {[...Array(5)].map((_, index) => (
                                            <AiFillStar key={index} className="text-yellow-500 text-xl" />
                                        ))}
                                        <span className="text-gray-600 ml-2">24+ reviews</span>
                                    </div>
                                    <p className="text-gray-500 mt-2">{carDetails.description}</p>
                                    <div className="flex mt-4">
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{carDetails.type}</span>
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">Capacity: {carDetails.passengers} Person</span>
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">{carDetails.gear}</span>
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">{carDetails.type_gas}</span>
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-2">{carDetails.gas_capacity}</span>
                                    </div>
                                    <p className="text-2xl font-bold mt-6">${carDetails.price}/day</p>
                                    <Link to="/payment">
                                        <button className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-lg">Rent Now</button>
                                    </Link>
                                </div>
                            </div>
                            {fullscreen && (
                                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                                    <img
                                        src={mainImage}
                                        alt={carDetails.name}
                                        className="max-w-full max-h-full cursor-pointer"
                                    />
                                    <FaTimes
                                        onClick={toggleFullscreen}
                                        className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
                                    />
                                </div>
                            )}
                        </>
                    )
                )
            }
        </div>
    )
}

export default CarDetails
