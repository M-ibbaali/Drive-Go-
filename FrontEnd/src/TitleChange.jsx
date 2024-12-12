import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function TitleChange({ isLoggedIn }) {
    const location = useLocation()

    useEffect(() => {
        switch (true) {
            case location.pathname === '/':
                document.title = 'DriveGo - Home'
                break
            case location.pathname === '/login':
                document.title = 'DriveGo - Login'
                break
            case location.pathname === '/register':
                document.title = 'DriveGo - Register'
                break
            case location.pathname === '/forgot-password':
                document.title = 'DriveGo - Forgot Password'
                break
            case location.pathname === '/reset-password':
                document.title = 'DriveGo - Reset Password'
                break
            case location.pathname === '/categories':
                document.title = 'DriveGo - Categories'
                break
            case location.pathname === '/popularCars':
                document.title = 'DriveGo - Popular Cars'
                break
            case location.pathname === '/recentCars':
                document.title = 'DriveGo - Recent Cars'
                break
            case location.pathname === '/profile':
                isLoggedIn ? document.title = 'DriveGo - Profile' : document.title = 'DriveGo - Settings'
                break
            case location.pathname === '/aide':
                document.title = 'DriveGo - Help'
                break
            case location.pathname === '/aboutus':
                document.title = 'DriveGo - AboutUs'
                break
            case location.pathname === '/terms':
                document.title = 'DriveGo - Terms & Conditions'
                break
            case location.pathname === '/privacy':
                document.title = 'DriveGo - Privacy & Policy'
                break
            case location.pathname === '/podcast':
                document.title = 'DriveGo - Podcast'
                break
            case location.pathname === '/events':
                document.title = 'DriveGo - Events'
                break
            case location.pathname === '/blogs':
                document.title = 'DriveGo - Blogs'
                break
            case location.pathname === '/administration':
                document.title = 'DriveGo - Admin Dashboard'
                break
            case location.pathname.startsWith('/reservation/'):
                document.title = 'DriveGo - Reservation'
                break
            case location.pathname.startsWith('/payment/'):
                document.title = 'DriveGo - Payment'
                break
            default:
                document.title = 'DriveGo - 404 Not Found'
                break
        }
    }, [location.pathname])

    return null
}

export default TitleChange
