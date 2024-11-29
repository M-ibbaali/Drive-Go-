import {useState, useEffect} from 'react'
import Filter from './Filter'
import CarDetails from './CarDetails'
import Reviews from './Reviews'
import RecentCars from './RecentsCar'
import RecommandCar from '../Home/RecommandCar'
import { useParams } from 'react-router-dom'

function CarRentalDashboard() {
    const { car } = useParams()

    const [carData, setCarData] = useState([])
    const [error, setError] = useState(null)
    const [types, setTypes] = useState([])
    const [capacities, setCapacities] = useState([])
    const [priceRange, setPriceRange] = useState({})

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch(`http://localhost/drive-go/backend/cars/reservation.php?carID=${car}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch Car data")
                }
                const data = await response.json()
                if (data.error) {
                    throw new Error(data.error)
                }
        
                setCarData(data.data)
                setTypes(data.types)
                setCapacities(data.capacities)
                setPriceRange({
                    ...data.priceRange,
                    min_price: parseFloat(data.priceRange.min_price),
                    max_price: parseFloat(data.priceRange.max_price),
                })
            } catch (error) {
                setError(error.message)
            }
        }
    
        fetchCarData()
    }, [car])

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-6">
                    <div className="flex space-x-4">
                        <Filter
                            car={carData}
                            types={types}
                            capacities={capacities}
                            priceRange={priceRange}
                        />
                        <div className="w-5/6">
                            <CarDetails
                                car={carData}
                                error={error}
                            />
                            <Reviews
                                id={car}
                            />
                            <RecentCars/>
                            <RecommandCar/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarRentalDashboard
