import React, {useState, useEffect} from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Routers from './Routes/Routers'
import FirstTimeIn from './Login/FirstTimeIn'
import FirstTimeUp from './Login/FirstTimeUp'
import ProgressBar from './Progress/ProgressBar'
import Loading from './Progress/Loading'
import TitleChange from './TitleChange'
import ForgotPassword from './Login/ForgotPassword'
import ResetPassword from './Login/ResetPassword'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [isGuest, setIsGuest] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString()
        const storedDate = localStorage.getItem('lastVisitDate')
        
        if (storedDate !== currentDate) {
            localStorage.removeItem('isGuest')
            setIsGuest(null)
        }

        const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'
        const guestStatus = localStorage.getItem('isGuest') === 'true'

        setIsGuest(guestStatus)
        setIsLoggedIn(isAuthenticated)

        localStorage.setItem('lastVisitDate', currentDate)

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

    if (isLoading) {
        return (
            <>
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <Loading></Loading>
                </div>
            </>
        )
    }

    const future = {
        v7_relativeSplatPath: true,
        v7_startTransition: true,
    }

    return (
        <>
            {/* <BrowserRouter basename="Drive-Go" future={future}> */}
            <HashRouter>
                <TitleChange isLoggedIn={isLoggedIn} ></TitleChange>
                <ProgressBar></ProgressBar>
                <Routes>
                    <Route
                        path="/*"
                        element={isLoggedIn || isGuest ? <Routers isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isGuest={isGuest}/> : <Navigate to="/login" replace />}
                    />
                    <Route
                        path="/login"
                        element={!isLoggedIn ? <FirstTimeIn setIsGuest={setIsGuest} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/register"
                        element={!isLoggedIn ? <FirstTimeUp /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password"
                        element={<ResetPassword />}
                    />
                </Routes>
            </HashRouter>
            {/* </BrowserRouter> */}
        </>
    )
}

export default App
