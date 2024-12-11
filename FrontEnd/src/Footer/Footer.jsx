import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isCommunityOpen, setIsCommunityOpen] = useState(false);
    const [isSocialsOpen, setIsSocialsOpen] = useState(false);

    const toggleSection = (section) => {
        switch(section) {
            case 'about':
                setIsAboutOpen(!isAboutOpen);
                break;
            case 'community':
                setIsCommunityOpen(!isCommunityOpen);
                break;
            case 'socials':
                setIsSocialsOpen(!isSocialsOpen);
                break;
            default:
                break;
        }
    };

    return (
        <footer className="bg-primary p-4 sm:p-6 mt-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Left Section */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                        <Link to="/" className="block">
                            <h3 className="text-lg font-semibold text-blue-600 cursor-pointer mb-4">DriveGo</h3>
                        </Link>
                        <p className="text-gray-600 mb-4">
                            We offer a wide range of vehicles for all your driving needs. Find the perfect car to meet your needs.
                        </p>
                        <p className="text-gray-600 text-sm">&copy; 2022 MORENT. All rights reserved.</p>
                    </div>

                    {/* About Section */}
                    <div className="col-span-1">
                        <div 
                            className="flex justify-between items-center border-b pb-2 sm:border-none cursor-pointer"
                            onClick={() => toggleSection('about')}
                        >
                            <h3 className="text-lg font-bold text-gray-700">About</h3>
                            <span className="sm:hidden">
                                {isAboutOpen ? '−' : '+'}
                            </span>
                        </div>
                        <ul className={`
                            ${isAboutOpen || 'hidden sm:block'} 
                            space-y-2 mt-4
                        `}>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">How it works</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Featured</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Partnership</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Business Relation</a></li>
                        </ul>
                    </div>

                    {/* Community Section */}
                    <div className="col-span-1">
                        <div 
                            className="flex justify-between items-center border-b pb-2 sm:border-none cursor-pointer"
                            onClick={() => toggleSection('community')}
                        >
                            <h3 className="text-lg font-bold text-gray-700">Community</h3>
                            <span className="sm:hidden">
                                {isCommunityOpen ? '−' : '+'}
                            </span>
                        </div>
                        <ul className={`
                            ${isCommunityOpen || 'hidden sm:block'} 
                            space-y-2 mt-4
                        `}>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Events</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Blog</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Podcast</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Invite a friend</a></li>
                        </ul>
                    </div>

                    {/* Socials Section */}
                    <div className="col-span-1">
                        <div 
                            className="flex justify-between items-center border-b pb-2 sm:border-none cursor-pointer"
                            onClick={() => toggleSection('socials')}
                        >
                            <h3 className="text-lg font-bold text-gray-700">Socials</h3>
                            <span className="sm:hidden">
                                {isSocialsOpen ? '−' : '+'}
                            </span>
                        </div>
                        <ul className={`
                            ${isSocialsOpen || 'hidden sm:block'} 
                            space-y-2 mt-4
                        `}>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Discord</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Instagram</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Twitter</a></li>
                            <li><a className="cursor-pointer text-gray-600 hover:text-blue-500">Facebook</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-300 mt-6 pt-4 text-center text-gray-600 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <a className="cursor-pointer hover:text-blue-500">Privacy & Policy</a>
                    <a className="cursor-pointer hover:text-blue-500">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer