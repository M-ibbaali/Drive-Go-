import {useState, useEffect} from 'react'
import CarDetails from './CarDetails'
import Reviews from './Reviews'
import RecentCars from './RecentsCar'
import RecommandCar from '../Home/RecommandCar'
import { useParams } from 'react-router-dom'

function CarRentalDashboard() {
    const { car } = useParams()

    const [carData, setCarData] = useState([])
    const [error, setError] = useState(null)

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
        <div className="bg-gray-100 min-h-screen ">
          <div className=" mx-auto p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4">
             
      
              <div className=" w-screen ">
                <CarDetails
                  car={carData}
                  error={error}
                />
                <Reviews id={car} />
                <RecentCars />
                <RecommandCar />
              </div>
            </div>
          </div>
        </div>
      </>
    )
}

export default CarRentalDashboard
