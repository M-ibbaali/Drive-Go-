import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-5 sm:px-5 md:px-5 lg:px-0">
                <div className="flex w-full max-w-5xl rounded-lg bg-white shadow-lg flex-col sm:flex-row md:flex-row lg:flex-row">
                    {/* Left Side - Image */}
                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 flex items-center justify-center rounded-t-lg sm:rounded-l-lg md:rounded-l-lg lg:rounded-l-lg">
                        <img src="/Pictures/NotFound.webp" alt="Not Found" className="object-cover rounded-t-lg sm:rounded-l-lg md:rounded-l-lg lg:rounded-l-lg w-full" />
                    </div>

                    {/* Right Side - Content */}
                    <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 p-10">
                        <h2 className="mt-6 text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-700">404 - Page Not Found</h2>
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
