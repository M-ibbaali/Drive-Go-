import React from 'react'

function SidebarItem({ icon, label, active, onClick }) {
    
    return (
        <div
            className={`flex items-center p-2 rounded-lg ${active ? 'bg-blue-500 text-white hover:bg-blue-500' : 'text-gray-700 hover:bg-blue-200'} cursor-pointer`}
            onClick={onClick}
        >
            <div className="mr-2 text-lg">{icon}</div>
            <span>{label}</span>
        </div>
    )
}

export default SidebarItem
