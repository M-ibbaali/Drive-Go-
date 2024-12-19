import React from 'react'
import { FaUser, FaKey, FaShieldAlt, FaCog } from 'react-icons/fa'

function SideBar({ data, activeSection, setActiveSection, renderContent, isLoggedIn }) {
    return (
        <>
        <div className="flex flex-wrap container mx-auto p-4 md:p-6">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 bg-white text-black shadow-lg p-4 md:p-6 rounded-xl md:rounded-l-xl">
                <div className="flex items-center space-x-4 mb-8">
                    
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
            <div className="flex-1 p-4 md:p-8 min-h-screen rounded-r-xl">
                {renderContent()}
            </div>
        </div>
    </>
    
    )
}

export default SideBar
