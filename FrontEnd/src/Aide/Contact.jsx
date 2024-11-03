import React from 'react'
import { MdEmail, MdPhone} from 'react-icons/md'

function Contact() {
    return (
        <>
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
                <div className="space-y-4">
                    {/* Contact Methods */}
                    <div className="flex items-center space-x-2">
                        <MdEmail className="w-6 h-6 text-blue-500" />
                        <span className="text-gray-800">support@company.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <MdPhone className="w-6 h-6 text-blue-500" />
                        <span className="text-gray-800">+123-456-7890</span>
                    </div>

                    {/* Contact Form */}
                    <form className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div>
                        <label className="block text-gray-600">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        </div>
                        <div>
                        <label className="block text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        </div>
                        <div>
                        <label className="block text-gray-600">Message</label>
                        <textarea
                            placeholder="Your Message"
                            className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
