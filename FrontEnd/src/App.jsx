import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login/Login'
import Profile from './Profile/Profile'

function App() {

    return (
        <>
            <Profile></Profile>
            <Router>
                <Routes>
                    <Route path="/*" element={<Login />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
