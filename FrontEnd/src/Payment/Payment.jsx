import React, { useState } from 'react'
import RentalSummary from './RentalSummary'
import BillingInfo from './BillingInfo'
import RentalInfo from './RentalInfo'
import PaymentMethod from './PaymentMethod'
import Confirmation from './Confirmation'

function Payment() {
    const [step, setStep] = useState(1)

    const nextStep = () => {
        setStep(prevStep => prevStep + 1)
    }

    const prevStep = () => {
        setStep(prevStep => prevStep - 1)
    }
    
    return (
        <>
            <div className="flex flex-row-reverse justify-between p-5">
                <RentalSummary />
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
