import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import Reservation from '../Reservation/Reservation'
import AdminDashboard from '../Admin/AdminDashboard'
import Aide from '../Aide/Aide'

import { Button, notification } from 'antd'
import Categories from '../Categories/Categories'

function Test() {
    // const openNotification = () => {
    //     notification.success({ message: 'Notification Title', description: 'This is a success message.' });
    // }

    return (
        <>

            {/* <Button onClick={openNotification}>Open Notification</Button> */}

            {/* <AdminDashboard></AdminDashboard> */}
            {/* <Aide></Aide> */}
            {/* <Profile></Profile> */}
            <Router>
                <Routes>
                    <Route path="/*" element={<Login />} />
                </Routes>
            </Router>
            {/* <Reservation></Reservation> */}
            {/* <Categories></Categories> */}
        </>
    )
}

export default Test
