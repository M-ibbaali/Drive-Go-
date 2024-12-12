import React, { useState } from 'react'
import Search from './Search'
import Favorite from './Favorite'
import Notification from './Notification'
import Settings from './Settings'
import Profile from './Profile'
import Inscription from './Inscription'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

function Header({ isLoggedIn, setIsLoggedIn, isGuest }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const IconWrapper = ({ children, onClick }) => (
        <div
            onClick={onClick}
            className="flex flex-col items-center justify-center cursor-pointer hover:text-blue-600 transition-colors"
        >
            {children}
        </div>
    )

    return (
        <header className="fixed top-0 w-full z-50 bg-white shadow-md mb-6">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-3xl font-semibold text-blue-600">
                    DriveGo
                </Link>

                {/* Desktop Search */}
                <div className="hidden md:block w-full max-w-xl mx-4">
                    <Search />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? (
                        <FaTimes className="w-6 h-6 text-gray-700" />
                    ) : (
                        <FaBars className="w-6 h-6 text-gray-700" />
                    )}
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center space-x-4">
                    <IconWrapper>
                        <Favorite />
                    </IconWrapper>

                    <IconWrapper>
                        <Notification />
                    </IconWrapper>

                    <Settings isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

                    {isLoggedIn ? (
                        <IconWrapper>
                            <Profile />
                        </IconWrapper>
                    ) : isGuest ? (
                        <IconWrapper>
                            <Inscription />
                        </IconWrapper>
                    ) : null}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-y-0 right-0 w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out">
                    <div className="p-6 h-full flex flex-col">
                        {/* Close Button */}
                        <div className="flex justify-end mb-4">
                            <FaTimes
                                className="w-6 h-6 text-gray-700 cursor-pointer"
                                onClick={toggleMobileMenu}
                            />
                        </div>

                        {/* Mobile Search */}
                        <div className="mb-6">
                            <Search />
                        </div>

                        {/* Mobile Icons - Vertical Layout */}
                        <div className="flex flex-col space-y-6 items-center flex-grow">
                        <IconWrapper>
                            <Favorite className="w-6 h-6" />
                            <span className="text-xs mt-1">Favorites</span>
                        </IconWrapper>

                        <IconWrapper>
                            <Notification className="w-6 h-6" />
                            <span className="text-xs mt-1">Notifications</span>
                        </IconWrapper>

                        <Settings isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

                        {isLoggedIn ? (
                            <IconWrapper>
                                <Profile className="w-6 h-6" />
                                <span className="text-xs mt-1">Profile</span>
                            </IconWrapper>
                        ) : isGuest ? (
                            <IconWrapper>
                                <Inscription className="w-6 h-6" />
                                <span className="text-xs mt-1">Sign In</span>
                            </IconWrapper>
                        ) : null}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
