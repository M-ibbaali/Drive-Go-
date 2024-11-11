import {useState} from 'react'
import { FaPencilAlt, FaEnvelope } from "react-icons/fa"

function Profile() {
    const currentDate = new Date()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = currentDate.toLocaleDateString('en-US', options)
    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [username, setUsername] = useState("Guest")
    const [NewUsername, setNewUsername] = useState("")
    const [email, setEmail] = useState("mohamed@gmail.com")
    const [newEmail, setNewEmail] = useState("")

    const toggleModal = () => setIsModalOpen(!isModalOpen)

    const handleSaveChanges = () => {
        if (NewUsername.trim()) {
            setUsername(NewUsername)
        }
        if (newEmail.trim()) {
            setEmail(newEmail)
        }
        toggleModal()
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-200">
                    <h2 className="text-3xl font-semibold text-gray-800">Welcome, {username}</h2>
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
                            <h3 className="text-xl font-bold text-gray-800">{username}</h3>
                            <p className="text-gray-500">{email}</p>
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
                                placeholder="Your First Name"
                                className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Nick Name</label>
                            <input
                                type="text"
                                placeholder="Your Nickname"
                                className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Gender</label>
                            <select defaultValue="" className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-600">Address</label>
                            <input
                                type="text"
                                placeholder="Your Address"
                                className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">CIN</label>
                            <input
                                type="text"
                                placeholder="Enter CIN"
                                className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Your Phone Number"
                                className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Email Address Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-gray-700 font-semibold">My email Address</h4>
                        <div className="flex items-center space-x-4 mt-2">
                            <FaEnvelope className="w-6 h-6 text-blue-600 cursor-pointer hover:text-blue-500" />
                            <div>
                                <p className="text-gray-800">alexarawles@gmail.com</p>
                                <p className="text-gray-500 text-sm">1 month ago</p>
                            </div>
                        </div>
                        <button className="mt-4 text-blue-600">+ Add Email Address</button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-4">Edit Profile</h3>
                        <div className="mb-4">
                            <label className="block text-gray-600">Email</label>
                            <input
                                type="text"
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="Enter new name"
                                className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                onChange={(e) => setNewEmail(e.target.value)}
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
