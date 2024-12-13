import React, { useState } from "react"

function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date())

    // Helper function to get the days of the month
    const getDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1)
        const days = []
        while (date.getMonth() === month) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
        }
        return days
    }

    // Helper function to change the month
    const changeMonth = (offset) => {
        const newDate = new Date(currentDate)
        newDate.setMonth(currentDate.getMonth() + offset)
        setCurrentDate(newDate)
    }

    // Calendar data
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    const daysInMonth = getDaysInMonth(month, year)

    // Determine the first day of the week for the month
    const firstDayOfWeek = new Date(year, month, 1).getDay()
    const leadingEmptyDays = (firstDayOfWeek + 6) % 7 // Adjust for Monday start

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white p-6 border-r">
                <h1 className="text-2xl font-bold mb-6">Calendar</h1>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md mb-6">
                + Add New Event
                </button>
                <div>
                <h2 className="text-lg font-semibold mb-4">You are going to</h2>
                <div className="space-y-4">
                    {/* Example of event items */}
                    <div className="flex flex-col bg-gray-100 p-4 rounded-lg shadow">
                    <span className="bg-purple-400 w-3 h-3 rounded-full mb-2"></span>
                    <h3 className="text-md font-bold">Design Conference</h3>
                    <p className="text-sm text-gray-500">Today 07:19 AM</p>
                    <p className="text-sm text-gray-500">Hyderabad</p>
                    <p className="text-sm text-gray-500">155 attendees</p>
                    </div>
                </div>
                </div>
            </div>

            {/* Main Calendar */}
            <div className="flex-1 p-6">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => changeMonth(-1)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-200"
                >
                    &lt; Previous
                </button>
                <h1 className="text-2xl font-bold">
                    {monthNames[month]} {year}
                </h1>
                <button
                    onClick={() => changeMonth(1)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-200"
                >
                    Next &gt;
                </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 border border-gray-200">
                {/* Days Header */}
                {daysOfWeek.map((day, index) => (
                    <div
                    key={index}
                    className="p-4 border text-center font-semibold bg-gray-50"
                    >
                    {day}
                    </div>
                ))}

                {/* Empty cells before the first day of the month */}
                {Array.from({ length: leadingEmptyDays }).map((_, index) => (
                    <div key={`empty-${index}`} className="p-4 border"></div>
                ))}

                {/* Days of the Month */}
                {daysInMonth.map((day, index) => (
                    <div key={index} className="relative p-4 border h-24">
                    <span className="absolute top-1 right-1 text-gray-500 text-sm">
                        {day.getDate()}
                    </span>
                    {/* Example Event on a specific date */}
                    {day.getDate() === 15 && (
                        <div className="absolute bottom-2 left-2 bg-purple-400 text-white text-xs px-2 py-1 rounded">
                        Example Event
                        </div>
                    )}
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default CalendarPage
