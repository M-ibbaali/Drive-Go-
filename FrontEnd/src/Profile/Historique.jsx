import React, { useState, useEffect } from 'react'

function Historique({ user }) {
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost/drive-go/BackEnd/profile/historique.php?userID=${user}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
                const data = await response.json()
                if (data.reservations) {
                    setReservations(data.reservations)
                }
            } catch (error) {
                console.error('Error fetching reservations:', error)
            }
        }

        if (user) {
            fetchReservations()
        }
    }, [user])

    const getStatusClass = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-100 text-green-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <div className={'max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'}>
            <div  className="px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-200">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Your Reservations</h2>
            </div>
            <div className="p-6">
                {reservations.length > 0 ? (
                    <table className="w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600">Vehicle Name</th>
                                <th className="px-4 py-2 text-left text-gray-600">Vehicle Type</th>
                                <th className="px-4 py-2 text-left text-gray-600">Start Date</th>
                                <th className="px-4 py-2 text-left text-gray-600">End Date</th>
                                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                                <th className="px-4 py-2 text-left text-gray-600">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr key={index} className="hover:bg-gray-100 border-b">
                                    <td className="px-4 py-2">{reservation.vehicle_name}</td>
                                    <td className="px-4 py-2">{reservation.vehicle_type}</td>
                                    <td className="px-4 py-2">{reservation.start_date}</td>
                                    <td className="px-4 py-2">{reservation.end_date}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(reservation.status)}`}>
                                            {reservation.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">${reservation.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No reservations found.</p>
                )}
            </div>
        </div>
    )
}

export default Historique
