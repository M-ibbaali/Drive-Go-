import {useState, useEffect } from 'react'
import { MdEmail, MdPhone} from 'react-icons/md'

function Contact() {
    const user = localStorage.getItem('userId')
    const [userData, setUserData] = useState([])
    const [error, setError] = useState(null)

    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const subjects = [
        "Account Issues",
        "Payment Problems",
        "Vehicle Availability",
        "Reservation Questions",
        "Suggestions or Feedback",
        "Other Inquiries"
    ]

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://localhost/drive-go/BackEnd/Profile/profile.php?userID=${user}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data")
                    }
                    const data = await response.json()
                    if (data.error) {
                        throw new Error(data.error)
                    }
            
                    setUserData(data.data)
                } catch (error) {
                    setError(error.message || 'Something went wrong.')
                }
            }

            fetchUserData()
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if (!subject || !message) {
            setError("Subject Or Message are required.")
            setTimeout(() => setError(''), 3000)
            return
        }

        const userId = userData.user_id
        const data = {
            sender_id: userId,
            message_content: message,
            subject: subject,
        }

        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Contact/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (result.success) {
                setSuccessMessage(result.message)
                setTimeout(() => setSuccessMessage(''), 5000)
                setError(null)
                setMessage('')
                setIsSubmitted(false)
            } else {
                setError(result.error || 'Something went wrong.')
                setTimeout(() => setError(''), 3000)
            }
        } catch (error) {
            setError('Failed to send message')
            setTimeout(() => setError(''), 3000)
        }
    }

    return (
        <>
            <div>
                {successMessage && (
                    <div className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white p-3 w-1/3 text-center rounded-lg shadow-lg">
                        {successMessage}
                    </div>
                )}
                {error && (
                    <div className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white p-3 w-1/3 text-center rounded-lg shadow-lg">
                        {error}
                    </div>
                )}
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
                <div className="space-y-4">
                    {/* Contact Methods */}
                    <div className="flex gap-10">
                        <div className="flex items-center space-x-2">
                            <MdEmail className="w-6 h-6 text-blue-500" />
                            <span className="text-gray-800">drivego@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MdPhone className="w-6 h-6 text-blue-500" />
                            <span className="text-gray-800">+123-456-7890</span>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div>
                            <label className="block text-gray-600">Name</label>
                            <input
                                type="text"
                                value={userData.full_name || ''}
                                placeholder="Your Name"
                                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Email</label>
                            <input
                                type="email"
                                value={userData.email || ''}
                                placeholder="Your Email"
                                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600">Subject</label>
                            <select
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 ${!subject && isSubmitted ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500`}
                            >
                                <option value="" disabled selected>Select a Subject</option>
                                {subjects.map((subject, index) => (
                                    <option key={index} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-600">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Your Message"
                                className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 ${!message && isSubmitted ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact
