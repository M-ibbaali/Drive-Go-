import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import SearchBar from './SearchBar'

function RentalDetails() {
    const mapCenter = { lat: 35.6895, lng: 139.6917 }

    return (
        <>
            <div className="w-3/5 space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="font-semibold mb-4">Details Rental</h3>
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                        <GoogleMap
                            mapContainerStyle={{ height: '300px', width: '100%' }}
                            center={mapCenter}
                            zoom={12}
                        >
                            <Marker position={mapCenter} />
                        </GoogleMap>
                    </LoadScript>
                    <div className="flex items-center space-x-4">
                        <img src="/Pictures/Audi.jfif" alt="Car" className="w-24 h-24 rounded-md" />
                        <div>
                            <h4 className="text-lg font-bold">Nissan GT - R</h4>
                            <p className="text-gray-500">Sport Car</p>
                        </div>
                    </div>
                    <SearchBar></SearchBar>
                    <hr className="mb-8" />
                    <div className="flex items-end justify-between">
                        <div>
                            <h3 className="font-semibold text-xl">Totale Rental Price</h3>
                            <p className="text-gray-500">Overall price and inscludes rental discount</p>
                        </div>
                        <p className="text-black text-xl font-bold">$80.00</p>
                    </div>
                    <></>
                </div>
            </div>
        </>
    )
}

export default RentalDetails
