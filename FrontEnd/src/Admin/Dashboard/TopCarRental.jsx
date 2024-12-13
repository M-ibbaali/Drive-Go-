import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

function TopCarRental() {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        const r = parseInt(color.slice(1, 3), 16)
        const g = parseInt(color.slice(3, 5), 16)
        const b = parseInt(color.slice(5, 7), 16)
        
        return `rgba(${r}, ${g}, ${b}, 0.5)`
    }

    useEffect(() => {
        const fetchTopCarData = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Admin/DashBoard/topCarRental.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch top car rental data.')
                }
                const data = await response.json()
                
                if (data.error) {
                    throw new Error(data.error)
                }

                const updatedData = data.data.map(entry => ({
                    ...entry,
                    color: getRandomColor(),
                    name: entry.type,
                }))

                setData(updatedData)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchTopCarData()
    }, [])

    const total = data.reduce((sum, entry) => sum + entry.reservations, 0)

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
                </div>

                <div className="flex justify-between items-center">
                    {/* Left Side: Pie Chart */}
                    <div className="relative flex justify-center items-center mr-6">
                    {error ? (
                        <div className="text-gray-500 text-center">
                            <p>{error}</p>
                        </div>
                    ) : (
                            <ResponsiveContainer width={200} height={200}>
                                <PieChart>
                                    <Pie
                                        data={data}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="reservations"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
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
                                <span className="mr-10">{entry.type}</span>
                            </div>
                            <span>{entry.reservations.toLocaleString()}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopCarRental
