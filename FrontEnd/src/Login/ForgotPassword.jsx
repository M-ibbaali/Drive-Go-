import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handlePasswordReset = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost/drive-go/BackEnd/Login/forgotPassword.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                const data = await response.json()
                setMessage(data.message)
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } else {
                const errorData = await response.json()
                setError(errorData.message)
            }
        } catch (err) {
            setError("An error occurred. Please try again later.")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-700 text-center">Forgot Password</h2>
                <p className="text-gray-500 text-center mt-2">Enter your email to reset your password.</p>

                <form className="mt-6" onSubmit={handlePasswordReset}>
                    <div>
                        <label className="block text-gray-500">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    {message && <p className="text-green-500 text-sm mt-2">{message}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-6 text-center text-gray-500">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
