import React, { useState } from 'react'

function Security({ user }) {
    document.title = "DriveGo - Security"

    const [secondEmail, setSecondEmail] = useState('')
    const [secondPhoneNumber, setSecondPhoneNumber] = useState('')

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [secondEmailError, setSecondEmailError] = useState(false)
    const [secondPhoneNumberError, setSecondPhoneNumberError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        let hasError = false

        setSecondEmailError(false)
        setSecondPhoneNumberError(false)

        if (!secondEmail || !secondPhoneNumber) {
            setSecondEmailError(true)
            setSecondPhoneNumberError(true)
            setErrorMessage('Please fill in all fields.')
            setTimeout(() => setErrorMessage(''), 3000)
            hasError = true
        }

        if (hasError) return

        const data = {
            userId: user,
            secondEmail,
            secondPhoneNumber,
        }

        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Profile/updateSecurity.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            
            if (result.existingSecondEmail) {
                setSecondEmail(result.existingSecondEmail)
            }
            
            if (result.existingSecondPhoneNumber) {
                setSecondPhoneNumber(result.existingSecondPhoneNumber)
            }

            if (result.success) {
                setSuccessMessage(result.message)
                setTimeout(() => setSuccessMessage(''), 3000)
            } else {
                setErrorMessage(result.error)
                setTimeout(() => setErrorMessage(''), 3000)
            }
        } catch (error) {
            setErrorMessage('An error occurred')
            setTimeout(() => setErrorMessage(''), 3000)
        }
    }

    return (
        <>
            {successMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white p-3 w-11/12 sm:w-1/2 lg:w-1/3 text-center rounded-lg shadow-lg">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white p-3 w-11/12 sm:w-1/2 lg:w-1/3 text-center rounded-lg shadow-lg">
                    {errorMessage}
                </div>
            )}

            <div className="max-w-full md:max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <h1 className="text-2xl font-bold mb-6 px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-200 text-center md:text-left">
                    Security Settings
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6 p-8">
                    {/* Password Recovery Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Recovery Email
                            </label>
                            <input
                                type="email"
                                name="recoveryEmail"
                                value={secondEmail}
                                onChange={(e) => setSecondEmail(e.target.value)}
                                placeholder="Enter recovery email"
                                className={`w-full px-4 py-2 mt-1 border ${secondEmailError || errorMessage === 'Second email already in use by another user' ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Recovery Phone Number
                            </label>
                            <input
                                type="tel"
                                name="recoveryPhone"
                                value={secondPhoneNumber}
                                onChange={(e) => setSecondPhoneNumber(e.target.value)}
                                placeholder="Enter recovery phone number"
                                className={`w-full px-4 py-2 mt-1 border ${secondPhoneNumberError ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 flex-wrap">
                        <button
                            type="button"
                            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                        >
                        Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                        >
                        Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Security
