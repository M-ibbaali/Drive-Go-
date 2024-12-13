import React from 'react'
import RentalDetails from './RentalDetails'
import TopCarRental from './TopCarRental'
import Transaction from './Transaction'

function Dashboard() {
    return (
        <>
            <div className="flex space-x-6">
                <RentalDetails />
                <div className="w-2/5 space-y-6">
                    <TopCarRental />
                    <Transaction />
                </div>
            </div>
        </>
    )
}

export default Dashboard
