import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'

function RentalDetails() {
    const [rentalDetails, setRentalDetails] = useState(null)
    const [cities, setCities] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchRentalDetails = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Admin/DashBoard/detailsRental.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch rental details.')
                }
                const data = await response.json()

                setTimeout(() => {
                    setRentalDetails(data.data)
                    setCities(data.cities)
                    setLoading(false)
                    setError(data.error || null)
                }, 2000)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchRentalDetails()
    }, [])

    return (
        <>
            <div className="w-3/5 space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-4">Details Rental</h3>
                    {loading ? (
                        <div
                            className="flex items-center m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                        >
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                    ) : error ? (
                        <div className="text-gray-500 text-center">
                            <p>{error}</p>
                        </div>
                    ) : (
                        rentalDetails && (
                            <>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.2835944359476!2d-7.966831624545681!3d31.59868807417814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafefd0d36c8cdb%3A0x35b1325a7cdaa68d!2sIsta%20Ntic%20Syba!5e0!3m2!1sen!2sma!4v1734050066760!5m2!1sen!2sma"
                                    className="w-full h-[300px] border-0"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                                <div className="flex flex-col-reverse items-start p-5 space-x-4">
                                    <img src={`${rentalDetails.image}`} alt="Car" className="w-auto h-44 object-contain" />
                                    <div>
                                        <h4 className="text-lg font-bold">{rentalDetails.name}</h4>
                                        <p className="text-gray-500">{rentalDetails.type}</p>
                                    </div>
                                </div>
                                <SearchBar
                                    location={rentalDetails.location}
                                    pickUp={rentalDetails.pickUp}
                                    DropOff={rentalDetails.DropOff}
                                    cities={cities}
                                />
                                <hr className="mb-8" />
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="font-semibold text-xl">Totale Rental Price</h3>
                                        <p className="text-gray-500">Overall price and inscludes rental discount</p>
                                    </div>
                                    <p className="text-black text-xl font-bold">{rentalDetails.price} MAD</p>
                                </div>
                            </>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default RentalDetails
