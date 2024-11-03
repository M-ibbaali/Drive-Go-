import React from 'react'
import TransactionItem from './TransactionItem'

function Transaction({ transactions }) {
    
    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold flex justify-between items-center">
                    Recent Transaction
                    <a href='/transaction' className="text-blue-500 text-sm cursor-pointer">View All</a>
                </h3>
                {transactions.map((transaction, index) => (
                    <TransactionItem
                        key={index}
                        img={transaction.img}
                        name={transaction.name}
                        type={transaction.type}
                        date={transaction.date}
                        price={transaction.price}
                    />
                ))}
            </div>
        </>
    )
}

export default Transaction
