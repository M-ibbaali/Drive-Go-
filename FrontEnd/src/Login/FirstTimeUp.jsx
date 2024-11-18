import React, {useState} from 'react'
import { FaGoogle, FaFacebookF } from 'react-icons/fa'
import { AiOutlineEye } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function FirstTimeUp() {
    const location = useLocation()
    const navigate = useNavigate()
    const carImage = location.pathname === '/login' ? '/Pictures/Audi.jfif' : '/Pictures/Porcshe.jfif'
    const [showPassword, setShowPassword] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [resultat, setResultat] = useState('')

    const [showAlert, setShowAlert] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost/drive-go/BackEnd/Register/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            if (response.ok) {
                const data = await response.json()
                setResultat(data.message)

                setShowAlert(true)
                let progress = 0
                const interval = setInterval(() => {
                    progress += 3
                    setProgress(progress)
                    if (progress >= 100) {
                        clearInterval(interval)
                        localStorage.setItem('isLoggedIn', 'true')
                        navigate('/login')
                    }
                }, 90)
            } else {
                const errorData = await response.json()
                setError(errorData.message)
            }
        } catch (error) {
            setError("An error occurred. Please try again later.")
        }
    }

    const handleHomeClick = () => {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        navigate('/');
    }

    return (
        <>
            {error === 'Email is already taken.' && (
                <div className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white p-3 w-1/3 text-center rounded-lg shadow-lg">
                    <p>{error}</p>
                </div>
            )}
            {showAlert && (
                <div className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white p-3 w-1/3 text-center rounded-lg shadow-lg">
                    <p>{resultat}</p>
                    <div className="relative mt-2 h-2 bg-gray-300 rounded-full">
                        <div
                            className="absolute top-0 left-0 h-full bg-green-800 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="flex w-full max-w-5xl rounded-lg bg-white shadow-lg">
                    
                    {/* Left Side - Car Image */}
                    <div className="w-1/2 flex items-center justify-center rounded-l-lg">
                        <img src={carImage} alt="Car" className="object-cover rounded-l-lg w-full"/>
                    </div>
                    
                    {/* Right Side - Form */}
                    <div className="w-1/2 p-10">
                        {/* Home Link at Top Left */}
                        <div className="absolute top-4 left-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-2xl font-semibold text-blue-500 hover:underline"
                                onClick={handleHomeClick}
                            >
                                Skip
                            </Link>
                        </div>
                        <div className="text-right">
                            <Link
                                to="/register"
                                className={`p-1 mr-4 ${location.pathname === '/register' || location.pathname === '/' ? 'text-blue-500 font-semibold border-b-4 border-blue-500' : 'text-gray-400'}`}
                            >
                                Sign up
                            </Link>
                            <Link
                                to="/login"
                                className={`p-1 mr-4 ${location.pathname === '/login' ? 'text-blue-500 font-semibold border-b-4 border-blue-500' : 'text-gray-400'}`}
                            >
                                Login
                            </Link>
                        </div>

                        <div className="p-10 w-full">
                            <h2 className="mt-6 text-2xl font-bold text-gray-700">Get Started for free!</h2>
                            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div>
                                    <label className="text-gray-500">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className={`w-full mt-1 px-4 py-2 border ${error === 'Name is required.' ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    />
                                    {/* Error message for name */}
                                    {(error === 'Name is required.') && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@gmail.com"
                                        className={`w-full mt-1 px-4 py-2 border ${error === 'Invalid email format.' || error === 'Email is already taken.' ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    />
                                    {/* Error message for email */}
                                    {(error === 'Invalid email format.') && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="relative">
                                    <label className="text-gray-500">Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="6+ characters"
                                        className={`w-full mt-1 px-4 py-2 border ${error === 'Password must be at least 6 characters long.' || error ===  'Invalid email or password.' ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    />
                                    <AiOutlineEye
                                        className="absolute right-3 top-10 text-gray-400 cursor-pointer"
                                        onMouseDown={() => setShowPassword(true)}
                                        onMouseUp={() => setShowPassword(false)}
                                        onMouseLeave={() => setShowPassword(false)}
                                    />
                                    {/* Error message for password */}
                                    {(error === 'Password must be at least 6 characters long.') && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                </div>

                                <p className="text-xs text-gray-400 mt-2">
                                    By signing up you agree to <span className="text-blue-500">terms and conditions</span>.
                                </p>

                                <button
                                    type="submit"
                                    className="w-full py-2 mt-4 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600"
                                >
                                    Register
                                </button>
                            </form>

                            <div className="mt-6 text-center text-gray-400">Or register using</div>
                            <div className="flex justify-center mt-4 space-x-4">
                                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                    <FaGoogle className="text-gray-500" />
                                </button>
                                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                                    <FaFacebookF className="text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FirstTimeUp
