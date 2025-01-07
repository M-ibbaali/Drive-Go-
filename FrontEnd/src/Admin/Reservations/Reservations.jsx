import React, { useState, useEffect } from 'react'

function Reservations() {
    const [reservations, setReservations] = useState([])
    const [filteredReservations, setFilteredReservations] = useState([])
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState({ type: '', value: '' })

    const [currentPage, setCurrentPage] = useState(1)
    const reservationsPerPage = 5
    const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage)

    const [selectedReservation, setSelectedReservation] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [newStatus, setNewStatus] = useState('')

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
            case "Confirmed":
                return "bg-blue-100 text-blue-600 hover:bg-blue-200"
            case "Completed":
                return "bg-green-100 text-green-600 hover:bg-green-200"
            case "Cancelled":
                return "bg-red-100 text-red-600 hover:bg-red-200"
            default:
                return "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }
    }

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

    useEffect(() => {
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

    const paginatedReservations = filteredReservations.slice(
        (currentPage - 1) * reservationsPerPage,
        currentPage * reservationsPerPage
    )

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const openModal = (reservation) => {
        setSelectedReservation(reservation)
        setNewStatus(reservation.status)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedReservation(null)
    }

    const handleStatusChange = async () => {
        if (!selectedReservation || !newStatus) return
    
        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Reservations/updateStatus.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    reservation_id: selectedReservation.id,
                    new_status: newStatus,
                }),
            })
    
            const result = await response.json()
    
            if (result.error) {
                alert('Error: ' + result.error)
            } else {
                setReservations(reservations.map(reservation =>
                    reservation.id === selectedReservation.id
                        ? { ...reservation, status: newStatus }
                        : reservation
                ))
            }
        } catch (err) {
            alert('Error updating status: ' + err.message)
        }
    
        closeModal()
        fetchReservations()
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
                                    {paginatedReservations.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-100 border-b">
                                            <td className="px-4 py-2">{item.id}</td>
                                            <td className="px-4 py-2">{item.full_name}</td>
                                            <td className="px-4 py-2">{item.start_date}</td>
                                            <td className="px-4 py-2">{item.end_date}</td>
                                            <td className="px-4 py-2">{item.name}</td>
                                            <td className="px-4 py-2">{item.type}</td>
                                            <td className="px-4 py-2">{item.location}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    onClick={() => openModal(item)}
                                                    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${getStatusClass(item.status)}`}
                                                >
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

                {showModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl">
                            <h3 className="text-xl font-semibold mb-4">Change Reservation Status</h3>
                            <div className="mb-4">
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleStatusChange}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center space-x-2 mt-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index + 1)}
                            className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                    >
                        Next
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Reservations
