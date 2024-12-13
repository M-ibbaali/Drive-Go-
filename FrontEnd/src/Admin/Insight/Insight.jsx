import React, { useEffect, useState } from 'react'
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
    const [salesData, setSalesData] = useState([])
    const [profitData, setProfitData] = useState([])
    const [customers, setCustomers] = useState(0)
    const [employers, setEmployers] = useState(0)
    const [featuredCar, setFeaturedCar] = useState('')
    const [featuredPrice, setFeaturedPrice] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchInsightData = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Insight/revenue.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch insight data.')
                }
                const data = await response.json()

                if (data.error) {
                    throw new Error(data.error)
                }

                setSalesData(data.salesData)
                setProfitData(data.profitData)
                setCustomers(data.customers)
                setEmployers(data.employers)
                setFeaturedCar(data.featuredCar)
                setFeaturedPrice(data.featuredPrice)
            } catch (err) {
                setError(err.message)
            }
        }

        fetchInsightData()
    }, [])
 
    const data = {
        labels: salesData.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Sales',
                data: salesData,
                borderColor: '#EF4444',
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Profit',
                data: profitData,
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
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
                labels: salesData.map((_, index) => `Day ${index + 1}`),
            },
            y: {
                beginAtZero: true,
            },
        },
    }

    return (
        <>
            <div className="min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Insight</h1>
                {error ? (
                    <div className="text-red-500 mb-6">{error}</div>
                ) : (
                    <>
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
                                <h3 className="text-lg font-semibold">Users</h3>
                                <div className="text-gray-600">
                                    <p>Customers: {customers}</p>
                                    <p>Employers: {employers}</p>
                                </div>
                            </div>

                            {/* Featured Product */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <FaProductHunt className="text-green-500 text-4xl mb-4" />
                                <h3 className="text-lg font-semibold">Featured Car</h3>
                                <p className="text-gray-600">{featuredCar || 'No car available'}</p>
                                <p className="text-gray-900 font-bold">{`${featuredPrice} MAD`}</p>
                            </div>

                            {/* Sales Analytics */}
                            <div className="bg-white p-6 rounded-lg shadow">
                                <FaChartLine className="text-purple-500 text-4xl mb-4" />
                                <h3 className="text-lg font-semibold">Sales Analytics</h3>
                                <Line data={data} options={options} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Insight
