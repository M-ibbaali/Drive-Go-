import React from 'react'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import SignUp from './SignUp'
import SignIn from './SignIn'

function Login() {
    const location = useLocation()
    const carImage = location.pathname === '/signin' ? '/Pictures/Audi.jfif' : '/Pictures/Porcshe.jfif';

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-5xl rounded-lg bg-white shadow-lg">
                
                {/* Left Side - Car Image */}
                <div className="w-1/2 flex items-center justify-center rounded-l-lg">
                    <img src={carImage} alt="Car" className="object-cover rounded-l-lg w-full"/>
                </div>
                
                {/* Right Side - Form */}
                <div className="w-1/2 p-10">
                    <div className="text-right">
                        <Link
                            to="/signup"
                            className={`p-1 mr-4 ${location.pathname === '/signup' || location.pathname === '/' ? 'text-blue-500 font-semibold border-b-4 border-blue-500' : 'text-gray-400'}`}
                        >
                            Sign up
                        </Link>
                        <Link
                            to="/signin"
                            className={`p-1 mr-4 ${location.pathname === '/signin' ? 'text-blue-500 font-semibold border-b-4 border-blue-500' : 'text-gray-400'}`}
                        >
                            Login
                        </Link>
                    </div>

                    {/* Render the Routes */}
                    <Routes>
                        <Route path="/" element={<SignUp />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Login
