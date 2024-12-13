import React from "react"
import { FaInbox, FaPaperPlane, FaThumbtack, FaTrash } from 'react-icons/fa'

function Sidebar({ count, important, bin }) {
    const emailOptions = [
        { label: `Inbox`, count: count, icon: <FaInbox className="text-gray-500 text-sm" /> },
        { label: "Sent", count: 0, icon: <FaPaperPlane className="text-gray-500 text-sm" /> },
        { label: "Important", count: important, icon: <FaThumbtack className="text-gray-500 text-sm" /> },
        { label: "Bin", count: bin, icon: <FaTrash className="text-gray-500 text-sm" /> },
    ]

    return (
        <div className="w-1/6 p-4 bg-white shadow-md rounded-lg">
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">My Email</h2>
                {emailOptions.map((option) => (
                <div
                    key={option.label}
                    className="flex justify-between items-center text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                    <div className="flex items-center space-x-2">
                        {option.icon}
                        <span>{option.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">{option.count}</span>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
