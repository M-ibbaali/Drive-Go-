import React, { useState, useEffect } from 'react'
import TransactionItem from './TransactionItem'

function Transaction() {
    const [transactions, setTransactions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Dashboard/transaction.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions.')
                }
                const data = await response.json()

                setTimeout(() => {
                    setTransactions(data.data)
                    setLoading(false)
                    setError(data.error || null)
                }, 2000)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchTransactions()
    }, [])

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold flex justify-between items-center">Recent Transaction</h3>
                {loading ? (
                    <div
                        className="flex items-center m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                    >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                        </span>
                    </div>
                ) : error ? (
                    <div className="text-gray-500 text-center">
                        <p>{error}</p>
                    </div>
                ) : (
                    transactions && (
                        transactions.map((transaction, index) => (
                            <TransactionItem
                                key={index}
                                img={transaction.first_img}
                                name={transaction.name}
                                type={transaction.type}
                                date={new Date(transaction.payment_date).toLocaleDateString()}
                                price={`${transaction.amount}`}
                            />
                        ))
                    )
                )}
            </div>
        </>
    )
}

export default Transaction
