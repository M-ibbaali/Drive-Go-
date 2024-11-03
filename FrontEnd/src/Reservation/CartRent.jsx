import {useState} from 'react'
import Filter from './Filter'
import CarDetails from './CarDetails'
import Reviews from './Reviews'
import RecentCars from './RecentsCar'
import RecommandCar from '../Home/RecommandCar'


function CarRentalDashboard() {
    const [price, setPrice] = useState(80)
    const [reviews] = useState([
        { name: "Alex Stanton", date: "21/09/2022", text: "This car is amazing with the best acceleration...", rating: 4 },
        { name: "Skylar Dias", date: "10/10/2022", text: "I loved driving this car on the highways...", rating: 4 },
        { name: "Skylar Dias", date: "10/10/2022", text: "I loved driving this car on the highways...", rating: 5 },
        { name: "Skylar Dias", date: "10/10/2022", text: "I loved driving this car on the highways...", rating: 5 },
        { name: "Skylar Dias", date: "10/10/2022", text: "I loved driving this car on the highways...", rating: 5 },
    ])

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-6">
                    <div className="flex space-x-4">
                        <Filter price={price} setPrice={setPrice} />
                        <div className="w-3/4">
                            <CarDetails price={price} />
                            <Reviews reviews={reviews} />
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
