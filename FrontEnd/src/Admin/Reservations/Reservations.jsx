import React, { useState, useEffect } from 'react'

function Reservations() {
    const [reservations, setReservations] = useState([])
    const [filteredReservations, setFilteredReservations] = useState([])
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState({ type: '', value: '' })

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-600"
            case "Confirmed":
                return "bg-blue-100 text-blue-600"
            case "Completed":
                return "bg-green-100 text-green-600"
            case "Cancelled":
                return "bg-red-100 text-red-600"
            default:
                return "bg-gray-100 text-gray-600"
        }
    }

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Reservations/reservation.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch reimbursements.')
                }
                const data = await response.json()

                if (data.error) {
                    throw new Error(data.error)
                }

                setReservations(data.data)
                setFilteredReservations(data.data)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchReservations()
    }, [])

    const handleFilter = (type) => {
        setFilter({ type, value: '' })
    }

    const applyFilter = () => {
        if (filter.type && filter.value !== '') {
            setFilteredReservations(reservations.filter(reservation =>
                reservation[filter.type].toString().toLowerCase().includes(filter.value.toLowerCase())
            ))
        } else {
            setFilteredReservations(reservations)
        }
    }

    const handleFilterValueChange = (event) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            value: event.target.value,
        }))
    }

    return (
        <div className="flex min-h-screen">
        {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Reservations</h1>
                </div>

                {/* Filters */}
                <div className="mt-6 flex items-center gap-4">
                    <p className="px-4 py-2 bg-gray-200 rounded-lg">Filter By</p>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                        onClick={() => handleFilter('full_name')}
                    >Name</button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                        onClick={() => handleFilter('start_date')}
                    >Date</button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                        onClick={() => handleFilter('type')}
                    >Type</button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                        onClick={() => handleFilter('location')}
                    >Location</button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                        onClick={() => handleFilter('status')}
                    >Status</button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
                        onClick={() => {
                            setFilter({ type: '', value: '' })
                            setFilteredReservations(reservations)
                        }}
                    >Reset Filter</button>
                </div>

                {/* Filter Value Input */}
                {filter.type && (
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder={`Enter ${filter.type === 'full_name' ? 'name' : filter.type && filter.type === 'start_date' ? 'date' : filter.type}`}
                            value={filter.value}
                            onChange={handleFilterValueChange}
                            className="px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                        />
                        <button
                            onClick={applyFilter}
                            className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
                        >
                            Apply Filter
                        </button>
                    </div>
                )}

                {/* Table */}
                <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                    {error ? (
                            <div className="text-red-500 p-4">{error}</div>
                        ) : (
                            <table className="w-full table-auto">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-gray-600">ID</th>
                                        <th className="px-4 py-2 text-left text-gray-600">Name</th>
                                        <th className="px-4 py-2 text-left text-gray-600">Start Date</th>
                                        <th className="px-4 py-2 text-left text-gray-600">End Date</th>
                                        <th className="px-4 py-2 text-left text-gray-600">Car</th>
                                        <th className="px-4 py-2 text-left text-gray-600">Type</th>
                                        <th className="px-4 py-2 text-left text-gray-600">Location</th>
                                        <th className="px-4 py-2 text-left text-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReservations.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-100 border-b">
                                            <td className="px-4 py-2">{item.id}</td>
                                            <td className="px-4 py-2">{item.full_name}</td>
                                            <td className="px-4 py-2">{item.start_date}</td>
                                            <td className="px-4 py-2">{item.end_date}</td>
                                            <td className="px-4 py-2">{item.name}</td>
                                            <td className="px-4 py-2">{item.type}</td>
                                            <td className="px-4 py-2">{item.location}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
            </main>
        </div>
    )
}

export default Reservations
