import React from 'react'
import { FiEdit, FiTrash } from "react-icons/fi"

function CarRental() {
    const products = [
        {
            image: "https://via.placeholder.com/50",
            name: "Apple Watch Series 4",
            category: "Digital Product",
            price: "$690.00",
            piece: 63,
        },
        {
            image: "https://via.placeholder.com/50",
            name: "Microsoft Headsquare",
            category: "Digital Product",
            price: "$190.00",
            piece: 13,
        },
        {
            image: "https://via.placeholder.com/50",
            name: "Women's Dress",
            category: "Fashion",
            price: "$640.00",
            piece: 635,
        },
        {
            image: "https://via.placeholder.com/50",
            name: "Samsung A50",
            category: "Mobile",
            price: "$400.00",
            piece: 67,
        },
        {
            image: "https://via.placeholder.com/50",
            name: "Camera",
            category: "Electronic",
            price: "$420.00",
            piece: 52,
        },
    ]

    return (
        <>
            <div className="flex min-h-screen">
                {/* Main Content */}
                <main className="flex-1">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Product Stock</h1>
                        <input
                            type="text"
                            placeholder="Search product name"
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Table */}
                    <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600">Image</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Product Name</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Category</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Price</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Piece</th>
                                    <th className="px-4 py-2 text-left text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="px-4 py-2">
                                            <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-12 h-12 rounded-md object-cover"
                                            />
                                        </td>
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2">{product.category}</td>
                                        <td className="px-4 py-2">{product.price}</td>
                                        <td className="px-4 py-2">{product.piece}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex space-x-2">
                                                <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                                    <FiEdit />
                                                </button>
                                                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                                                    <FiTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </>
    )
}

export default CarRental
