import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { FiMoreHorizontal } from 'react-icons/fi'

function TopCarRental() {
    const data = [
        { name: 'Sport Car', value: 17439, color: '#002f6c' },
        { name: 'SUV', value: 9478, color: '#336699' },
        { name: 'Coupe', value: 18197, color: '#6699cc' },
        { name: 'Hatchback', value: 12510, color: '#99ccff' },
        { name: 'MPV', value: 14406, color: '#cce6ff' },
    ]

    const total = data.reduce((sum, entry) => sum + entry.value, 0)

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 text-white p-2 rounded-md shadow-lg">
                    <p className="text-sm">{`${payload[0].name} : ${payload[0].value.toLocaleString()}`}</p>
                </div>
            )
        }
        return null
    }

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Top 5 Car Rental</h3>
                    <FiMoreHorizontal className="text-gray-500 cursor-pointer" />
                </div>

                <div className="flex justify-between items-center">
                    {/* Left Side: Pie Chart */}
                    <div className="relative flex justify-center items-center mr-6">
                        <ResponsiveContainer width={200} height={200}>
                            <PieChart>
                            <Pie
                                data={data}
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                style={{ cursor: 'pointer' }}
                            >
                                {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <h2 className="text-2xl font-bold text-gray-800">{total.toLocaleString()}</h2>
                            <p className="text-gray-500 text-sm">Rental Car</p>
                        </div>
                    </div>

                    {/* Right Side: Legend */}
                    <div className="space-y-3">
                    {data.map((entry, index) => (
                        <div
                        key={index}
                        className="flex justify-between items-center text-gray-600 text-sm"
                        >
                        <div className="flex items-center mb-2">
                            <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className="mr-10">{entry.name}</span>
                        </div>
                        <span>{entry.value.toLocaleString()}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopCarRental
