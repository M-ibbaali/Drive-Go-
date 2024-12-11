import React, { useState } from 'react'
import Search from './Search'
import Favorite from './Favorite'
import Notification from './Notification'
import Settings from './Settings'
import Inscription from './Inscription'
import { Link } from 'react-router-dom'
import Profile from './Profile'
import { FaBars, FaTimes } from 'react-icons/fa'

function Header({ isLoggedIn, setIsLoggedIn, isGuest }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const notifications = [
        "New message from Support",
        "Your reservation has been confirmed",
        "Profile updated successfully",
        "Payment received",
        "Reminder: Rental period ends soon"
    ]

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <>
            <header className="relative flex justify-between items-center p-4 bg-white shadow">
                {/* Logo */}
                <Link to="/" className="z-50">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 cursor-pointer">DriveGo</h1>
                </Link>

                {/* Search Input - Hidden on mobile, visible on larger screens */}
                <div className="hidden md:block w-full max-w-lg">
                    <Search />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden z-50" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? (
                        <FaTimes className="w-6 h-6 text-gray-700" />
                    ) : (
                        <FaBars className="w-6 h-6 text-gray-700" />
                    )}
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center gap-4 sm:gap-6">
                    <Favorite />
                    <Notification notifications={notifications} />
                    <Settings isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    {isLoggedIn ? <Profile /> : isGuest ? <Inscription /> : null}
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 bg-white z-40 md:hidden">
                        <div className="p-6 flex flex-col items-center justify-center h-full space-y-6">
                            {/* Mobile Search */}
                            <div className="w-full max-w-md">
                                <Search />
                            </div>

                            {/* Mobile Icons */}
                            <div className="flex items-center justify-center gap-6">
                                <Favorite />
                                <Notification notifications={notifications} />
                                <Settings isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                                {isLoggedIn ? <Profile /> : isGuest ? <Inscription /> : null}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}

export default Header