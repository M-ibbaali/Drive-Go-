import React from 'react'
import { FaUsers, FaProductHunt, FaChartLine } from 'react-icons/fa'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function Insight() { 
    const data = {
        labels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 60],
        datasets: [
            {
                label: "Sales",
                data: [4, 7, 5, 8, 6, 9, 7, 10, 8, 6],
                borderColor: "#EF4444",
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                tension: 0.4,
                fill: true,
            },
            {
                label: "Profit",
                data: [2, 5, 4, 6, 5, 7, 6, 9, 7, 5],
                borderColor: "#8B5CF6",
                backgroundColor: "rgba(139, 92, 246, 0.2)",
                tension: 0.4,
                fill: true,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                type: 'category',
                labels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 60],
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: 10,
            },
        },
    }

    return (
        <>
            <div className="min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Insight</h1>
                
                {/* Revenue Chart */}
                <div className="mb-8 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Revenue</h2>
                    <Line data={data} options={options} />
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Customers */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <FaUsers className="text-blue-500 text-4xl mb-4" />
                        <h3 className="text-lg font-semibold">Customers</h3>
                        <div className="text-gray-600">
                            <p>New: 34,249</p>
                            <p>Repeated: 1,420</p>
                        </div>
                    </div>

                    {/* Featured Product */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <FaProductHunt className="text-green-500 text-4xl mb-4" />
                        <h3 className="text-lg font-semibold">Featured Product</h3>
                        <p className="text-gray-600">Beats Headphone 2019</p>
                        <p className="text-gray-900 font-bold">$89.00</p>
                    </div>

                    {/* Sales Analytics */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <FaChartLine className="text-purple-500 text-4xl mb-4" />
                        <h3 className="text-lg font-semibold">Sales Analytics</h3>
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Insight
