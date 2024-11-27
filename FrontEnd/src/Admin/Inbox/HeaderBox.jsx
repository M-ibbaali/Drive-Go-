import React from "react"

function Header() {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            <h1 className="text-xl font-bold">Inbox</h1>
            <input
                type="text"
                placeholder="Search mail"
                className="flex-grow mx-4 px-4 py-2 border rounded-md"
            />
            <div className="flex space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <i className="fas fa-sync-alt" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <i className="fas fa-trash" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200">
                    <i className="fas fa-ellipsis-v" />
                </button>
            </div>
        </div>
    )
}

export default Header
