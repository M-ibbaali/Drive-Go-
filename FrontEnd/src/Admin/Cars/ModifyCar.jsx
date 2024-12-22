import React, { useState, useEffect } from 'react'

function ModifyCar({ user, car, brands, types, gases, geares }) {
    const [carDetails, setCarDetails] = useState(null)
    const [alert, setAlert] = useState({ type: '', message: '' })
    
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`http://localhost/drive-go/BackEnd/Admin/Cars/getCar.php?carID=${car}`)
                const data = await response.json()

                if (data.data) {
                    setCarDetails(data.data)
                } else {
                    setAlert({ type: 'error', message: 'Car not found' })
                    setTimeout(() => setAlert({ type: '', message: '' }), 2000)
                }
            } catch (err) {
                setAlert({ type: 'error', message: err.message })
                setTimeout(() => setAlert({ type: '', message: '' }), 2000)
            }
        }

        if (car) {
            fetchCarDetails()
        }
    }, [car])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCarDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!carDetails) {
            setAlert({ type: 'error', message: 'No car data to update.' })
            setTimeout(() => setAlert({ type: '', message: '' }), 2000)
            return
        }

        const updatedCarDetails = {
            ...carDetails,
            vehicle_id: carDetails.vehicle_id,
            owner_id: user,
        }

        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Cars/updateCar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCarDetails),
            })

            const data = await response.json()

            if (data.success) {
                setAlert({ type: 'success', message: 'Car details updated successfully!' })
                setTimeout(() => setAlert({ type: '', message: '' }), 2000)
            } else {
                setAlert({ type: 'error', message: data.error || "Failed to update car." })
                setTimeout(() => setAlert({ type: '', message: '' }), 2000)
            }
        } catch (err) {
            setAlert({ type: 'error', message: err.message })
            setTimeout(() => setAlert({ type: '', message: '' }), 2000)
        }
    }

    return (
        <>
            {alert.message && (
                <div
                    className={`fixed top-0 z-50 left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                >
                    {alert.message}
                </div>
            )}
            {carDetails && (
                <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-bold mb-4">Modify Vehicle</h2>
                    <img
                        src={carDetails.first_img}
                        alt={carDetails.name}
                        className="w-36 h-3w-36 object-contain"
                    />
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Car Name"
                            value={carDetails.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <select
                            name="brand_id"
                            value={carDetails.brand_id}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        >
                            {brands.map((brand, index) => (
                                <option key={index} value={brand.brand_id}>{brand.name}</option>
                            ))}
                        </select>
                        <select
                            name="type"
                            value={carDetails.type}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        >
                            {types.map((type, index) => (
                                <option key={index} value={type.type}>{type.type}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={carDetails.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <input
                            type="number"
                            name="last_price"
                            placeholder="Last Price"
                            value={carDetails.last_price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <input
                            type="text"
                            name="first_img"
                            placeholder="First Image URL"
                            value={carDetails.first_img}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <input
                            type="text"
                            name="second_img"
                            placeholder="Second Image URL"
                            value={carDetails.second_img}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <input
                            type="text"
                            name="third_img"
                            placeholder="Third Image URL"
                            value={carDetails.third_img}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <select
                            name="type_gas"
                            value={carDetails.type_gas}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        >
                            {gases.map((gas, index) => (
                                <option key={index} value={gas.type_gas}>{gas.type_gas}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="gas_capacity"
                            placeholder="Gas Capacity"
                            value={carDetails.gas_capacity}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <select
                            name="gear"
                            value={carDetails.gear}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        >
                            {geares.map((gear, index) => (
                                <option key={index} value={gear.gear}>{gear.gear}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="passengers"
                            placeholder="Number of Passengers"
                            value={carDetails.passengers}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={carDetails.location}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={carDetails.description}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}

export default ModifyCar
