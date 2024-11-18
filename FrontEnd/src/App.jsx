import React, {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Routers from './Routes/Routers'
import FirstTimeIn from './Login/FirstTimeIn'
import FirstTimeUp from './Login/FirstTimeUp'
import ProgressBar from './Progress/ProgressBar'
import { MoonLoader } from 'react-spinners'
import Loading from './Progress/Loading'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'
        setIsLoggedIn(isAuthenticated)

        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, [])

    if (isLoading) {
        return (
            <>
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    {/* <MoonLoader color="#3B82F6" /> */}
                    <Loading></Loading>
                </div>
            </>
        );
    }

    return (
        <>
            <BrowserRouter>
                <ProgressBar></ProgressBar>
                <Routes>
                    <Route
                        path="/*"
                        element={isLoggedIn ? <Routers isLoggedIn={isLoggedIn}/> : <Navigate to="/login" replace />}
                    />
                    <Route
                        path="/login"
                        element={<FirstTimeIn setIsLoggedIn={setIsLoggedIn} />}
                    />
                    <Route
                        path="/register"
                        element={<FirstTimeUp/>}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
