import React, { useState, useEffect } from 'react'
import { FiTrash } from "react-icons/fi"

function Users() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [alert, setAlert] = useState({ type: '', message: '' })

    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const usersPerPage = 5

    const filteredUsers = users.filter((user) =>
        user?.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // Fetch users data
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Users/users.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch users.')
                }
                const data = await response.json()

                setUsers(data.data)
                setError(data.error || null)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchUsers()
    }, [])

    // Delete user
    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Users/removeUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,
                }),
            })

            const data = await response.json()

            if (data.success) {
                setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId))
                setAlert({type: 'success', message: data.susccess})
            } else {
                setAlert({type: 'error' , message: error || 'Failed to delete user'})
            }
        } catch (err) {
            setAlert({type: error, message: err.message})
        }
    }
    
    return (
        <>
            <div className="flex min-h-screen">
                <main className="flex-1">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Users Management</h1>
                        <div className="flex justify-evenly w-1/3">
                            <input
                                type="text"
                                placeholder="Search by name or email"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                            />
                        </div>
                    </div>

                    {alert.message && (
                        <div
                            className={`fixed top-0 z-50 left-1/2 transform -translate-x-1/2 mt-4 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                        >
                            {alert.message}
                        </div>
                    )}
                    {error ? (
                        <div className="text-gray-500 text-center">
                            <p>{error}</p>
                        </div>
                    ) : (
                        filteredUsers.length === 0 ? (
                            <div className="text-gray-500 text-center mt-6">
                                <p>No users found</p>
                            </div>
                        ) : (
                            <>
                                <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                                    <table className="w-full table-auto">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 text-center text-gray-600">ID</th>
                                                <th className="px-4 py-2 text-left text-gray-600">Full Name</th>
                                                <th className="px-4 py-2 text-left text-gray-600">Email</th>
                                                <th className="px-4 py-2 text-left text-gray-600">Role</th>
                                                <th className="px-4 py-2 text-left text-gray-600">Gender</th>
                                                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedUsers.map((user, index) => (
                                                <tr key={index} className="hover:bg-gray-100 border-b" title={`created at :${user.created_at}`}>
                                                    <td className="px-4 py-2 text-center">{user.user_id}</td>
                                                    <td className="px-4 py-2">{user.full_name}</td>
                                                    <td className="px-4 py-2">{user.email}</td>
                                                    <td className="px-4 py-2">{user.role}</td>
                                                    <td className="px-4 py-2">{user.gender}</td>
                                                    <td className="px-4 text-center py-2">
                                                        <div className="flex justify-center space-x-2">
                                                            <button
                                                                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                                onClick={() => handleDeleteUser(user.user_id)}
                                                            >
                                                                <FiTrash />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-center space-x-2 mt-4">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    >
                                        Previous
                                    </button>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePageClick(index + 1)}
                                            className={`px-3 py-1 rounded ${
                                                currentPage === index + 1
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-300 hover:bg-gray-400"
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )
                    )}
                </main>
            </div>
        </>
    )
}

export default Users
