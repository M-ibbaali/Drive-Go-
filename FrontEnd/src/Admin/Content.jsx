import React from 'react'
import Dashboard from './Dashboard/Dashboard'
import CarRental from './Cars/CarRental'
import Insight from './Insight/Insight'
import Reimburse from './Reimburse/Reimburse'

function Content({ activeItem }) {
    const renderContent = () => {
        switch (activeItem) {
            case 'Dashboard':
                return <Dashboard></Dashboard>
            case 'Car Rent':
                return <CarRental></CarRental>
            case 'Insight':
                return <Insight></Insight>
            case 'Reimburse':
                return <Reimburse></Reimburse>
            case 'Inbox':
                return <div>Inbox Content</div>
            case 'Calendar':
                return <div>Calendar Content</div>
            case 'Settings':
                return <div>Settings Content</div>
            case 'Help & Center':
                return <div>Help & Center Content</div>
            case 'Log Out':
                return <div>Log Out Content</div>
            default:
                return <div>Select an option from the menu</div>
        }
    }

    return (
        <>
            {renderContent()}
        </>
    )
}

export default Content
