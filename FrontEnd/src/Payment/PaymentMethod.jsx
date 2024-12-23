import { useState } from 'react'
import { FaCreditCard } from 'react-icons/fa'

function PaymentMethod({ accountNumber, setAccountNumber, alertPayment, setAlertPayment }) {
    const [isAccountValid, setIsAccountValid] = useState(true)

    const handleAccountNumberChange = (e) => {
        const value = e.target.value;
        setAccountNumber(value);
    
        if (value.trim() === "") {
            setIsAccountValid(false);
            setAlertPayment({ message: "Account Number is required!", type: "error" });
        } else {
            setIsAccountValid(true);
            setAlertPayment({ message: "", type: "" });
        }
    };

    return (
        <div className="w-full p-6 sm:p-4 md:p-6 rounded-lg bg-white shadow-lg">
            <h1 className="text-2xl sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">Payment Method</h1>
            <p className="text-gray-500 mb-4 text-right text-sm sm:text-base">Step 3 of 4</p>
        
            {/* Credit Card Radio Button */}
            <div className="flex items-center mb-3 bg-gray-100 p-3 rounded-lg">
                Credit Card
                <FaCreditCard className="ml-2 text-xl sm:text-lg" />
            </div>
        
            {/* Credit Card Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-lg">
                <div>
                    <label className="text-gray-700 text-sm">Account Number</label>
                    <input
                        id="accountNumber"
                        type="text"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        placeholder="Account Number"
                        className={`w-full p-3 sm:p-2 border rounded-lg text-lg sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isAccountValid ? "border-gray-300" : "border-red-500"}`}
                    />
                    {!isAccountValid && (
                        <p className="text-red-500 text-xs md:text-sm mt-2">Account Number is required!</p>
                    )}
                    {alertPayment.message && (
                        <p className="text-sm text-red-600">{alertPayment.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod
