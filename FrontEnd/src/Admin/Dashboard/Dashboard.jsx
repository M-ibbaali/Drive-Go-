import React from 'react'
import RentalDetails from './RentalDetails'
import TopCarRental from './TopCarRental'
import Transaction from './Transaction'

function Dashboard() {
    const transactionsData = [
        {img: "/Pictures/Audi.jfif", name: "Nissan GT - R", type: "sport", date: "20 July", price: "$80.00" },
        {img: "/Pictures/Porcshe.jfif", name: "Koenigsegg", type: "sport", date: "19 July", price: "$99.00" },
        {img: "/Pictures/Audi.jfif", name: "Rolls - Royce", type: "sedan", date: "18 July", price: "$96.00" },
        {img: "/Pictures/Porcshe.jfif", name: "CR - V", type: "sedan", date: "17 July", price: "$80.00" },
    ]

    return (
        <>
            <div className="flex space-x-6">
                <RentalDetails></RentalDetails>
                <div className="w-2/5 space-y-6">
                    <TopCarRental></TopCarRental>
                    <Transaction transactions={transactionsData}></Transaction>
                </div>
            </div>
        </>
    )
}

export default Dashboard
