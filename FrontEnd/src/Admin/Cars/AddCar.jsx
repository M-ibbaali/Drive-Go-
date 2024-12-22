import React from 'react'

function AddCar({ formData, handleInputChange, handleSubmit, brands, types, gases, geares }) {
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">Add New Vehicle</h2>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Car Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <select
                        name="brand_id"
                        value={formData.brand_id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    >
                        {brands.map((brand, index) => (
                            <option key={index} value={brand.brand_id}>{brand.name}</option>
                        ))}
                    </select>
                    <select
                        name="type"
                        value={formData.type}
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
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <input
                        type="number"
                        name="last_price"
                        placeholder="Last Price"
                        value={formData.last_price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <input
                        type="text"
                        name="first_img"
                        placeholder="First Image URL"
                        value={formData.first_img}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <input
                        type="text"
                        name="second_img"
                        placeholder="Second Image URL"
                        value={formData.second_img}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <input
                        type="text"
                        name="third_img"
                        placeholder="Third Image URL"
                        value={formData.third_img}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <select
                        name="type_gas"
                        value={formData.type_gas}
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
                        value={formData.gas_capacity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <select
                        name="gear"
                        value={formData.gear}
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
                        value={formData.passengers}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </form>
        </>
    )
}

export default AddCar
