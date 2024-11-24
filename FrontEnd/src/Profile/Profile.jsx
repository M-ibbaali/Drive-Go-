import {useState, useEffect } from 'react'
import { FaPencilAlt } from "react-icons/fa"
import { useParams } from 'react-router-dom'

function Profile() {
    const currentDate = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = currentDate.toLocaleDateString('en-US', options)
    
    const { user } = useParams()
    const [userData, setUserData] = useState([])
    const [error, setError] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost/drive-go/BackEnd/Profile/profile.php?userID=${user}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch user data")
                }
                const data = await response.json()
                if (data.error) {
                    throw new Error(data.error)
                }
        
                setUserData(data.data)
            } catch (error) {
                setError(error.message || 'Something went wrong.')
            }
        }
    
        fetchUserData()
    }, [user])

    const handleSaveChangesToDB = async () => {
        try {
            const response = await fetch("http://localhost/drive-go/BackEnd/Profile/profile.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            const result = await response.json();
            if (result.error) {
                setAlertMessage({ type: 'error', text: result.error });
            } else {
                setAlertMessage({ type: 'success', text: 'Profile updated successfully!' });
            }
            setTimeout(() => setAlertMessage(null), 5000);
        } catch (error) {
            setAlertMessage({ type: 'error', text: 'An error occurred while updating the profile.' });
            setTimeout(() => setAlertMessage(null), 5000);
        }
    }

    const handleInputChange = (e, field) => {
        setUserData((prevData) => ({ ...prevData, [field]: e.target.value }));
    };

    const toggleModal = () => setIsModalOpen((prev) => !prev)

    const handleSaveChanges = () => {
        if (userData.email.trim() && /\S+@\S+\.\S+/.test(userData.email)) {
            toggleModal();
            setAlertMessage({ type: 'success', text: 'Email updated successfully!' });
            setTimeout(() => setAlertMessage(null), 5000);
        } else {
            toggleModal();
            setAlertMessage({ type: 'error', text: 'Please enter a valid email.' });
            setTimeout(() => setAlertMessage(null), 5000);
        }
    };

    return (
        <div className="min-h-screen p-8">
            {alertMessage && (
                <div
                    className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg ${
                    alertMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                >
                    {alertMessage.text}
                </div>
            )}
            {error ? (
                <div className="text-red-500 text-center">
                    <p>{error}</p>
                </div>
            ) : (
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-200">
                            <h2 className="text-3xl font-semibold text-gray-800">Welcome, {userData.nick_name}</h2>
                            <p className="text-gray-600">{formattedDate}</p>
                        </div>

                        {/* Profile Info */}
                        <div className="p-6">
                            <div className="flex items-center space-x-6 mb-8">
                                <img
                                    className="w-24 h-24 rounded-full cursor-pointer hover:border-4 hover:border-blue-500"
                                    src="/Pictures/User-2.jpg"
                                    alt="Profile"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{userData.full_name}</h3>
                                    <p className="text-gray-500">{userData.email}</p>
                                </div>
                                <button onClick={toggleModal} className="ml-auto px-4 py-2 flex items-center space-x-1 text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all">
                                    <FaPencilAlt className="w-5 h-5" />
                                    <span className="font-semibold">Edit</span>
                                </button>
                            </div>

                            {/* Form Section */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div>
                                    <label className="block text-gray-600">Full Name</label>
                                    <input
                                        type="text"
                                        value={userData.full_name}
                                        onChange={(e) => handleInputChange(e, "full_name")}
                                        placeholder="Your First Name"
                                        className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Nick Name</label>
                                    <input
                                        type="text"
                                        value={userData.nick_name}
                                        onChange={(e) => handleInputChange(e, "nick_name")}
                                        placeholder="Your Nickname"
                                        className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Gender</label>
                                    <select
                                        value={userData.gender}
                                        onChange={(e) => handleInputChange(e, "gender")}
                                        className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-600">Address</label>
                                    <input
                                        type="text"
                                        value={userData.address}
                                        onChange={(e) => handleInputChange(e, "address")}
                                        placeholder="Your Address"
                                        className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">CIN</label>
                                    <input
                                        type="text"
                                        value={userData.cin}
                                        onChange={(e) => handleInputChange(e, "cin")}
                                        placeholder="Enter CIN"
                                        className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Phone Number</label>
                                    <input
                                        type="text"
                                        value={userData.phone_number}
                                        onChange={(e) => handleInputChange(e, "phone_number")}
                                        placeholder="Your Phone Number"
                                        className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                {/* Save */}
                                <div className="flex">
                                    <button onClick={handleSaveChangesToDB} className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
                        <div className="mb-4">
                            <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => handleInputChange(e, "email")}
                                placeholder="Enter new email"
                                className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">Profile Picture</label>
                            <div className="relative w-full">
                                <input
                                    type="file"
                                    id="profilePic"
                                    className="hidden"
                                />
                                <label
                                    htmlFor="profilePic"
                                    className="w-full px-4 py-2 bg-blue-600 text-white text-center rounded-lg cursor-pointer hover:bg-blue-500 transition-colors"
                                >
                                    Choose a file
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={toggleModal}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveChanges}
                                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
