import React from 'react'
import Search from './Search'
import Favorite from './Favorite'
import Notification from './Notification'
import Settings from './Settings'
import Inscription from './Inscription'
import { Link } from 'react-router-dom'

function Header() {
    const notifications = [
        "New message from Support",
        "Your reservation has been confirmed",
        "Profile updated successfully",
        "Payment received",
        "Reminder: Rental period ends soon"
    ]

    return (
        <>
            <header className="flex justify-between items-center p-4 bg-white shadow">
                <Link to="/">
                    <h1 className="text-3xl font-semibold text-blue-600 cursor-pointer">DriveGo</h1>
                </Link>
                
                {/* Search Input with Icon */}
                <Search></Search>

                {/* Icons on the right with borders */}
                <div className="flex items-center gap-4">
                    {/* Favorite Icon */}
                    <Favorite></Favorite>
                    
                    {/* Notification Icon with Red Dot */}
                    <Notification notifications={notifications}></Notification>
                    
                    {/* Settings Icon */}
                    <Settings></Settings>

                    {/* SignUp Icon */}
                    <Inscription></Inscription>
                </div>
            </header>
        </>
    )
}

export default Header
