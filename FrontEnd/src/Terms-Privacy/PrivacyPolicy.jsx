import React from 'react'

function PrivacyPolicy() {
    return (
        <>    
            <div className="min-h-screen py-10 px-5">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-8">
                    <h1 className="text-3xl font-bold text-blue-500 mb-4">Privacy Policy</h1>
                    <p className="text-gray-500 mb-4">
                        At DriveGo, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
                    </p>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">1. Information We Collect</h2>
                    <ul className="list-disc list-inside text-gray-500 mb-4">
                        <li>Personal information such as name, email address, and phone number during registration.</li>
                        <li>Payment details when processing transactions.</li>
                        <li>Usage data such as browsing history and preferences on our platform.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">2. How We Use Your Information</h2>
                    <ul className="list-disc list-inside text-gray-500 mb-4">
                        <li>To provide and improve our services.</li>
                        <li>To process bookings and payments.</li>
                        <li>To communicate updates and promotions.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">3. Sharing Your Information</h2>
                    <p className="text-gray-500 mb-4">
                        We do not sell or rent your personal information to third parties. However, we may share data with trusted partners for service delivery and compliance with legal requirements.
                    </p>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">4. Data Security</h2>
                    <p className="text-gray-500 mb-4">
                        DriveGo employs industry-standard measures such as SSL encryption and secure servers to protect your data from unauthorized access or disclosure.
                    </p>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">5. Your Rights</h2>
                    <ul className="list-disc list-inside text-gray-500 mb-4">
                        <li>Access and update your personal information through your account settings.</li>
                        <li>Request deletion of your data by contacting us.</li>
                        <li>Opt out of promotional communications at any time.</li>
                    </ul>
                    <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">6. Changes to This Policy</h2>
                    <p className="text-gray-500 mb-4">
                        DriveGo reserves the right to update this Privacy Policy as needed. Changes will be communicated via our website.
                    </p>
                    <p className="text-gray-500 mt-6">
                        By using DriveGo, you agree to the terms outlined in this Privacy Policy.
                    </p>
                </div>
            </div>
        </>
    )
}

export default PrivacyPolicy
