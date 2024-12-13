import React from 'react'

function TransactionItem({img, name, type, date, price }) {
    const truncatedName = name.slice(0, 10)

    return (
        <div className="flex justify-between items-center py-2 border-b">
            <img className='h-28 w-auto object-contain' src={img} alt="" />
            <div>
                <h4 title={name} className="font-semibold cursor-default">{truncatedName}{name.length > 10 && '...'}</h4>
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
