import React from "react"

function TermsOfService() {
    return (
        <>
            <div className="min-h-screen py-10 px-5">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
                    <h1 className="text-3xl font-bold text-blue-500 mb-4">Terms and Conditions</h1>
                    <p className="text-gray-500 mb-4">
                        Welcome to DriveGo! By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
                    </p>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">1. General Terms</h2>
                    <ul className="list-disc list-inside text-gray-500 mb-4">
                        <li>You must be at least 18 years old to use our services.</li>
                        <li>All information provided during registration must be accurate and up-to-date.</li>
                        <li>DriveGo reserves the right to update or modify these terms at any time.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">2. Reservation and Payment</h2>
                    <ul className="list-disc list-inside text-gray-500 mb-4">
                        <li>Reservations are subject to vehicle availability.</li>
                        <li>Payments must be made securely via our platform using approved methods (e.g., PayPal, Stripe).</li>
                        <li>Cancellations may be subject to fees as outlined in our cancellation policy.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">3. Vehicle Use</h2>
                    <ul className="list-disc list-inside text-gray-500 mb-4">
                        <li>Vehicles must be returned in the same condition as at the start of the rental period.</li>
                        <li>Users are responsible for any damages incurred during the rental period.</li>
                        <li>DriveGo is not liable for personal items left in rented vehicles.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">4. Privacy and Security</h2>
                    <p className="text-gray-500 mb-4">
                        We are committed to protecting your privacy. Please review our Privacy Policy for more details on how your data is handled.
                    </p>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">5. Limitation of Liability</h2>
                    <p className="text-gray-500 mb-4">
                        DriveGo is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services.
                    </p>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">6. Governing Law</h2>
                    <p className="text-gray-500 mb-4">
                        These terms are governed by and construed in accordance with the laws of Morocco. Any disputes will be resolved in Moroccan courts.
                    </p>
                    <p className="text-gray-500 mt-6">
                        By using DriveGo, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                    </p>
                </div>
            </div>
        </>
    )
}

export default TermsOfService
