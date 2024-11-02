import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'

import Login from './Login/Login'
import Profile from './Profile/Profile'
import Reservation from './Reservation/Reservation'

function App() {

    return (
        <>
            <Home></Home>
            {/* <Profile></Profile>
            <Router>
                <Routes>
                    <Route path="/*" element={<Login />} />
                </Routes>
            </Router> */}
            {/* <Reservation></Reservation> */}
        </>
    )
}

export default App
