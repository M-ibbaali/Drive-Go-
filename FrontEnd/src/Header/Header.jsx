import React from 'react'
import Search from './Search'
import Favorite from './Favorite'
import Notification from './Notification'
import Settings from './Settings'
import Inscription from './Inscription'
import { Link } from 'react-router-dom'
import Profile from './Profile'

function Header({ isLoggedIn, setIsLoggedIn, isGuest }) {
    return (
        <>
            <header className="flex justify-between items-center p-4 bg-white shadow">
                <Link to="/">
                    <h1 className="text-3xl font-semibold text-blue-600 cursor-pointer">DriveGo</h1>
                </Link>
                
                {/* Search Input with Icon */}
                <Search />

                {/* Icons on the right with borders */}
                <div className="flex items-center gap-4">
                    {/* Favorite Icon */}
                    <Favorite />
                    
                    {/* Notification Icon with Red Dot */}
                    <Notification />
                    
                    {/* Settings Icon */}
                    <Settings
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                    />

                    {/* SignUp Icon */}
                    {isLoggedIn ? <Profile /> : isGuest ? <Inscription /> : null}
                </div>
            </header>
        </>
    )
}

export default Header
