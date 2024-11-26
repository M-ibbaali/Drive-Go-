import React from 'react'

function TransactionItem({img, name, type, date, price }) {

    return (
        <div className="flex justify-between items-center py-2 border-b">
            <img className='h-28 w-28' src={img} alt="" />
            <div>
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-gray-500">{type}</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-sm text-gray-500">{date}</p>
                <p className="font-semibold">{price}</p>
            </div>
        </div>
    )
}

export default TransactionItem
