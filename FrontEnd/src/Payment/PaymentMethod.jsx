import { useState } from 'react'
import { FaCreditCard, FaPaypal } from 'react-icons/fa'

function PaymentMethod({ paymentMethod, setPaymentMethod, paymentData, setPaymentData }) {
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value)
    }

    const handleInputChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-full p-6 rounded-lg bg-white shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Payment Method</h1>
            <p className="text-gray-500 mb-4 text-right">Step 3 of 4</p>

            {/* Credit Card Radio Button */}
            <label className="flex items-center mb-3 bg-gray-100 p-3 rounded-lg">
                <input
                    type="radio"
                    name="payment"
                    value="creditCard"
                    className="mr-2 border rounded-lg bg-gray-100 text-lg p-3"
                    checked={paymentMethod === 'creditCard'}
                    onChange={handlePaymentMethodChange}
                />
                Credit Card
                <FaCreditCard className="ml-2 text-xl" />
            </label>

            {/* Credit Card Input Fields (visible only when Credit Card is selected) */}
            {paymentMethod === 'creditCard' && (
                <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-lg">
                    <div>
                        <label className="text-gray-700">Card Number</label>
                        <input
                            type="text"
                            value={paymentData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="Card Number"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Expiration Date</label>
                        <input
                            type="text"
                            value={paymentData.expirationDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Card Holder</label>
                        <input
                            type="text"
                            value={paymentData.cardHolder}
                            onChange={handleInputChange}
                            placeholder="Card Holder"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">CVC</label>
                        <input
                            type="text"
                            value={paymentData.cvc}
                            onChange={handleInputChange}
                            placeholder="CVC"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            )}

            {/* PayPal Radio Button */}
            <label className="flex items-center mb-3 bg-gray-100 p-3 rounded-lg">
                <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    className="mr-2 border rounded-lg bg-gray-100 text-lg p-3"
                    checked={paymentMethod === 'paypal'}
                    onChange={handlePaymentMethodChange}
                />
                PayPal
                <FaPaypal className="ml-2 text-xl" />
            </label>

            {/* PayPal Input Fields (visible only when PayPal is selected) */}
            {paymentMethod === 'paypal' && (
                <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-lg">
                    <div>
                        <label className="text-gray-700">PayPal Email</label>
                        <input
                            type="email"
                            name="paypalEmail"
                            value={paymentData.paypalEmail}
                            onChange={handleInputChange}
                            placeholder="Your PayPal Email"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Amount</label>
                        <input
                            type="number"
                            name="paypalAmount"
                            value={paymentData.paypalAmount}
                            onChange={handleInputChange}
                            placeholder="Amount to Pay"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">PayPal Transaction ID (optional)</label>
                        <input
                            type="text"
                            name="transactionId"
                            value={paymentData.transactionId}
                            onChange={handleInputChange}
                            placeholder="Transaction ID"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700">Note (optional)</label>
                        <textarea
                            placeholder="Add a note to your payment"
                            className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentMethod
