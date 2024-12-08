import React from 'react'
import { FaUser, FaKey, FaShieldAlt, FaCog } from 'react-icons/fa'

function SideBar({ data, activeSection, setActiveSection, renderContent, isLoggedIn }) {
    return (
        <>
            <div className="flex container mx-auto p-6">
                {/* Sidebar */}
                <div className="w-1/4 bg-white text-black shadow-lg p-6 rounded-l-xl">
                    <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
                        <img
                            className="w-12 h-12 rounded-full cursor-pointer hover:border-4 hover:border-blue-500"
                            src={isLoggedIn ? "/Pictures/User-2.jpg" : "/User-3.jpg"}
                            alt="Profile"
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">{data.full_name || 'Guest'}</h2>
                        <p className="text-sm text-gray-500">{data.email || ''}</p>
                    </div>
                    </div>
                    
                    <nav className="space-y-4">
                    {isLoggedIn && (
                        <>
                            {/* Profile Button */}
                            <button
                                onClick={() => setActiveSection("Profile")}
                                className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-3 ${
                                    activeSection === "Profile"
                                        ? "bg-blue-500 text-white"
                                        : "text-black hover:bg-blue-500 hover:text-white"
                                }`}
                            >
                                <FaUser className="text-lg" />
                                <span>Profile</span>
                            </button>

                            {/* Password Button */}
                            <button
                                onClick={() => setActiveSection("Password")}
                                className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-3 ${
                                    activeSection === "Password"
                                        ? "bg-blue-500 text-white"
                                        : "text-black hover:bg-blue-500 hover:text-white"
                                }`}
                            >
                                <FaKey className="text-lg" />
                                <span>Password</span>
                            </button>

                            {/* Security Button */}
                            <button
                                onClick={() => setActiveSection("Security")}
                                className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-3 ${
                                    activeSection === "Security"
                                        ? "bg-blue-500 text-white"
                                        : "text-black hover:bg-blue-500 hover:text-white"
                                }`}
                            >
                                <FaShieldAlt className="text-lg" />
                                <span>Security</span>
                            </button>
                        </>
                    )}
            
                    {/* Settings Button */}
                    <button
                        onClick={() => setActiveSection("Settings")}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-3 ${
                        activeSection === "Settings"
                            ? "bg-blue-500 text-white"
                            : "text-black hover:bg-blue-500 hover:text-white"
                        }`}
                    >
                        <FaCog className="text-lg" />
                        <span>Settings</span>
                    </button>
                
                    </nav>
                </div>
            
                {/* Content Area */}
                <div className="flex-1 p-8">
                    {renderContent()}
                </div>
            </div>
        </>
    )
}

export default SideBar
