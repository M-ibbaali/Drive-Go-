import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-5xl rounded-lg bg-white shadow-lg">
                    {/* Left Side - Image */}
                    <div className="w-1/2 flex items-center justify-center rounded-l-lg">
                        <img src="/Pictures/NotFound.webp" alt="Not Found" className="object-cover rounded-l-lg w-full" />
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-1/2 p-10">
                        <h2 className="mt-6 text-3xl font-bold text-gray-700">404 - Page Not Found</h2>
                        <p className="mt-4 text-lg text-gray-500">The page you are looking for does not exist.</p>

                        <div className="mt-6 text-center">
                            <Link
                                to="/"
                                className="w-full p-2 mt-4 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                Go Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound
