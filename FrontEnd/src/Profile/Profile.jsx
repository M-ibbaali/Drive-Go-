import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile({ setData }) {
    document.title = 'DriveGo - Profile'

    const currentDate = new Date()
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    const formattedDate = currentDate.toLocaleDateString("en-US", options)
    const navigate = useNavigate()

    const user = localStorage.getItem("userId")
    const [userData, setUserData] = useState({
        user_id: null,
        full_name: "",
        nick_name: "",
        gender: "",
        address: "",
        cin: "",
        phone_number: "",
        email: "",
    })
    const [error, setError] = useState(null)
    const [alertMessage, setAlertMessage] = useState(null)

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://localhost/drive-go/BackEnd/Profile/profile.php?userID=${user}`,
                        {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                        }
                    )
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data")
                    }
                    const data = await response.json()
                    if (data.error) {
                        throw new Error(data.error)
                    }

                    setUserData(data.data)
                    setData(data.data)
                } catch (error) {
                    setError(error.message || "Something went wrong.")
                }
            }

            fetchUserData()
        } else {
            navigate("/login")
        }
    }, [user, navigate])

    const handleSaveChangesToDB = async () => {
        try {
            const response = await fetch("http://localhost/drive-go/BackEnd/Profile/profile.php",
                {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                }
            )
            const result = await response.json()
            if (result.error) {
                setAlertMessage({ type: "error", text: result.error })
            } else {
                setAlertMessage({
                type: "success",
                text: "Profile updated successfully!",
                })
            }
            setTimeout(() => setAlertMessage(null), 5000)
        } catch (error) {
            setAlertMessage({
                type: "error",
                text: "An error occurred while updating the profile.",
            })
            setTimeout(() => setAlertMessage(null), 5000)
        }
    }

    const handleInputChange = (e, field) => {
        setUserData((prevData) => ({ ...prevData, [field]: e.target.value }))
    }

    return (
        <>
            {alertMessage && (
                <div
                    className={`fixed z-50 top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg ${
                        alertMessage.type === "success"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                >
                    {alertMessage.text}
                </div>
            )}
            {error ? (
                <div className="text-gray-500 text-center">
                    <p>{error}</p>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-200">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                            Welcome, {userData.nick_name}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            {formattedDate}
                        </p>
                    </div>

                    {/* Profile Info */}
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-6 mb-8">
                            
                            <div className="text-center sm:text-left mt-4 sm:mt-0">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                                    {userData.full_name}
                                </h3>
                                <p className="text-sm text-gray-500">{userData.email}</p>
                            </div>
                           
                        </div>

                        {/* Form Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
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
                        </div>
                        <div className="flex justify-center sm:justify-end">
                            <button
                                onClick={handleSaveChangesToDB}
                                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile
