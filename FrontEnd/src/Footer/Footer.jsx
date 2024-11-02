import React from 'react'

function Footer() {

    return (
        <>
            <footer className="bg-primary p-6 mt-8">
                <div className="container mx-auto flex justify-between">
                    {/* Left Section */}
                    <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-600 cursor-pointer">DriveGo</h3>
                    <p className="text-gray-600 mt-2">
                        We offer a wide range of vehicles for all your driving needs. Find the perfect car to meet your needs.
                    </p>
                    <p className="text-gray-600 mt-2">&copy; 2022 MORENT. All rights reserved.</p>
                    </div>

                    {/* About Section */}
                    <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">About</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">How it works</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Featured</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Partnership</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Business Relation</a></li>
                    </ul>
                    </div>

                    {/* Community Section */}
                    <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Community</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Events</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Blog</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Podcast</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Invite a friend</a></li>
                    </ul>
                    </div>

                    {/* Socials Section */}
                    <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-700 mb-4">Socials</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Discord</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Instagram</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Twitter</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-blue-500">Facebook</a></li>
                    </ul>
                    </div>
                </div>

                <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600">
                    <a href="#" className="hover:text-blue-500 mr-4">Privacy & Policy</a>
                    <a href="#" className="hover:text-blue-500">Terms & Conditions</a>
                </div>
            </footer>
        </>
    )
}

export default Footer
