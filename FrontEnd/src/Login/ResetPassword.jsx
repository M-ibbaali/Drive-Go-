import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function ResetPassword() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleReset = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        try {
            const response = await fetch("http://localhost/drive-go/BackEnd/Login/resetPassword.php", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            })

            if (response.ok) {
                setSuccessMessage('Password reset successful!')
                setError('')
            } else {
                setError('Failed to reset password. Please try again.')
            }
        } catch {
            setError('An error occurred. Please try again later.')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 text-center">Reset Password</h1>
                <p className="text-sm text-gray-500 text-center mt-2">
                    Enter your new password below to reset it.
                </p>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-4 p-3 text-green-600 bg-green-100 border border-green-400 rounded-lg text-center">
                        {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-3 text-red-600 bg-red-100 border border-red-400 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <form
                    className="mt-6 space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleReset()
                    }}
                >
                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-500">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className="block text-gray-500">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter new password"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
