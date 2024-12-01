import React, { useState, useEffect } from 'react'
import RentalSummary from './RentalSummary'
import BillingInfo from './BillingInfo'
import RentalInfo from './RentalInfo'
import PaymentMethod from './PaymentMethod'
import Confirmation from './Confirmation'
import { useParams } from 'react-router-dom'

function Payment() {
    const { car } = useParams()
    
    const [carData, setCarData] = useState([])
    const [error, setError] = useState(null)
    const [step, setStep] = useState(1)

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
            } catch (error) {
                setError(error.message)
            }
        }
    
        fetchCarData()
    }, [car])

    const nextStep = () => {
        setStep(prevStep => prevStep + 1)
    }

    const prevStep = () => {
        setStep(prevStep => prevStep - 1)
    }
    
    return (
        <>
            <div className="flex flex-row-reverse justify-between p-5">
                <RentalSummary car={carData} error={error} />
                <div className="w-2/3 flex flex-col items-start">
                    {step === 1 && <BillingInfo />}
                    {step === 2 && <RentalInfo />}
                    {step === 3 && <PaymentMethod />}
                    {step === 4 && <Confirmation />}
                    <div className="flex gap-4 mt-4">
                        {step > 1 && <button onClick={prevStep} className="w-full p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">Back</button>}
                        {step < 4 && <button onClick={nextStep} className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Next</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment
