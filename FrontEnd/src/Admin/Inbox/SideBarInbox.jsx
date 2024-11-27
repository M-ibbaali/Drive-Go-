import React from "react"

function Sidebar() {
    const emailOptions = [
        { label: "Inbox", count: 1253 },
        { label: "Starred", count: 245 },
        { label: "Sent", count: 24532 },
        { label: "Draft", count: 9 },
        { label: "Spam", count: 14 },
        { label: "Important", count: 18 },
        { label: "Bin", count: 9 },
    ]

    const labels = [
        { label: "Primary", color: "bg-blue-500" },
        { label: "Social", color: "bg-teal-500" },
        { label: "Work", color: "bg-orange-500" },
        { label: "Friends", color: "bg-pink-500" },
    ]

    return (
        <div className="w-64 p-4 bg-white shadow-md">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-6">
                + Compose
            </button>
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">My Email</h2>
                {emailOptions.map((option) => (
                <div
                    key={option.label}
                    className="flex justify-between items-center text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                    <span>{option.label}</span>
                    <span className="text-sm text-gray-500">{option.count}</span>
                </div>
                ))}
            </div>
            <div>
                <h2 className="text-lg font-bold mb-2">Label</h2>
                {labels.map((label) => (
                <div
                    key={label.label}
                    className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                >
                    <span className={`w-3 h-3 rounded-full ${label.color} mr-2`} />
                    {label.label}
                </div>
                ))}
                <button className="text-blue-500 mt-4 hover:underline">
                + Create New Label
                </button>
            </div>
        </div>
    )
}

export default Sidebar
