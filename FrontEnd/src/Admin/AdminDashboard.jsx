import React from 'react'
import SectionAdmin from './SectionAdmin'

function AdminDashboard({ setIsLoggedIn }) {
    return (
        <>
            <SectionAdmin setIsLoggedIn={setIsLoggedIn}></SectionAdmin>
        </>
    )
}

export default AdminDashboard
