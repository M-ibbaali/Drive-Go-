import React from 'react'

function Header({ setSearchTerm }) {
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-t-lg border-b-4">
            <h1 className="text-xl font-bold">Inbox</h1>
            <input
                type="text"
                placeholder="Search mail"
                onChange={handleSearchChange}
                className="flex-grow mx-4 px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            />
        </div>
    )
}

export default Header
