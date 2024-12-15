import React from 'react'
import { Link } from 'react-router-dom'

function AboutUs() {
    const teamMembers = [
        { name: "Karim kribi", role: "Product owner", image: "/Pictures/DriveGo Team/Karim.jpeg" },
        { name: "abdlhak bouzougar", role: "Scrum master", image: "/Pictures/DriveGo Team/Abdelhak.jpeg" },
        { name: "Abdessamad Ettahiri", role: "devloppeur", image: "/Pictures/DriveGo Team/Abdessamad.jpeg" },
        { name: "Mohamed iba ali", role: "devloppeur", image: "/Pictures/DriveGo Team/Simo.jpeg" },
    ]
    return (
        <>
            <div className="bg-gray-100 text-gray-800">
                {/* Section 1: About Us */}
                <section className="flex flex-col md:flex-row items-center py-10 px-5 md:px-20">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold mb-4 text-blue-600">About Us</h2>
                        <p className="text-lg leading-relaxed mb-4">
                            Welcome to <span className="font-semibold">Rent Cars</span>, your trusted partner for all your premium car rental needs. 
                            Whether you're planning a business trip, a vacation, or simply need a vehicle for a special occasion, 
                            we provide a diverse fleet of top-quality vehicles to make your journey smooth and memorable.
                        </p>
                        <p className="text-lg leading-relaxed mb-4">
                            Our mission is to offer seamless, affordable, and reliable car rental services that cater to your unique requirements. 
                            With flexible booking options and excellent customer service, we ensure your experience is hassle-free from start to finish.
                        </p>
                        <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition duration-300">
                            Learn More
                        </button>
                    </div>
                    <div className="md:w-1/2 flex justify-center mt-5 md:mt-0">
                        <img
                            src="/Pictures/About/About.jpg"
                            alt="About Us"
                            className="w-200 h-80 rounded-full shadow-lg border-4 border-white transition-transform transform hover:scale-105 hover:shadow-2xl"    />
                    </div>
                </section>

                {/* Section 2: How It Works */}
                <section className="bg-blue-600 text-white py-10 text-center">
                    <h2 className="text-2xl font-bold mb-3">How It Works</h2>
                    <p className="mb-4 px-5 md:px-10 text-lg">
                        Renting a car with us is simple and straightforward. Follow these easy steps to get on the road in no time:
                    </p>
                    <div className="flex justify-center gap-5 flex-wrap">
                        <div className="bg-white px-4 py-3 rounded shadow-lg w-1/3">
                            <h3 className="font-semibold text-xl mb-2 text-blue-600">1. Choose Your Car</h3>
                            <p className="text-sm text-black">Browse our wide selection of cars, from economy to luxury options, and select the one that fits your needs and preferences.</p>
                        </div>
                        <div className="bg-white px-4 py-3 rounded shadow-lg w-1/3">
                            <h3 className="font-semibold text-xl mb-2 text-blue-600">2. Book Online or In-Store</h3>
                            <p className="text-sm text-black">Book your car easily through our website or visit our location to complete the rental process with the help of our friendly staff.</p>
                        </div>
                        <div className="bg-white px-4 py-3 rounded shadow-lg w-1/3">
                            <h3 className="font-semibold text-xl mb-2 text-blue-600">3. Drive Away!</h3>
                            <p className="text-sm text-black">Once your booking is confirmed, pick up your car and drive away. Enjoy a seamless and comfortable rental experience with us.</p>
                        </div>
                    </div>
                    <p className="mt-4 text-lg">
                        Ready to get started? Click below to view available cars or book your rental today!
                    </p>
                    <div className="flex justify-center gap-5 mt-4">
                        <button className="bg-white text-blue-600 px-5 py-2 rounded hover:bg-gray-200 transition duration-300">
                            <Link to="/categories">View Cars</Link>
                        </button>
                        <button className="bg-white text-blue-600 px-5 py-2 rounded hover:bg-gray-200 transition duration-300">
                            <Link to="/categories">Book Now</Link>
                        </button>
                    </div>
                </section>

                {/* Section 3: Services */}
                <section className="py-16 px-5 md:px-20">
                    <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[
                            { title: "Wide Car Selection", description: "Choose from economy, luxury, SUVs, and more." },
                            { title: "Affordable Rates", description: "Get competitive pricing without hidden fees." },
                            { title: "24/7 Customer Support", description: "We're here to assist you anytime, anywhere." },
                            { title: "Easy Online Booking", description: "Book your car easily through our website." },
                            { title: "Flexible Rentals", description: "Daily, weekly, or monthly rentals available." },
                            { title: "Trusted Service", description: "Thousands of happy customers trust us." },
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-5 bg-blue-50 shadow-md rounded hover:shadow-lg transition duration-300"
                            >
                                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                    ✓
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-blue-800">{service.title}</h3>
                                    <p className="text-blue-700">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Creative Exercises */}
                <section className="bg-blue-500 text-white text-center py-16 px-6">
                    <h2 className="text-4xl font-bold mb-4">Rent a Car for Every Adventure</h2>
                    <p className="mb-6">
                        Whether you’re heading to a business meeting, going on a family road trip, or exploring the city, we have the perfect vehicle for you. Choose from our wide range of cars and enjoy a seamless rental experience with flexible terms.
                    </p>
                    <button className="bg-white text-blue-500 px-5 py-2 rounded-lg hover:bg-gray-200 transition">
                        <Link to="/categories">FIND YOUR CAR</Link>
                    </button>
                </section>

                {/* Section 5: Contact Us */}
                <section className="bg-white py-16 px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-600 mb-4">Contact Us</h2>
                    <p className="mb-6 text-gray-600">
                        We are here to meet any business need and to promote your company online!
                    </p>
                    <button className="text-white bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-400 transition">
                        <Link to="/aide">Contact Us</Link>
                    </button>
                </section>

                {/* Section 6: Our Team */}
                <section className="bg-blue-600 py-16">
                    <h2 className="text-4xl font-bold text-center text-white mb-10">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
                        {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="text-center bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold text-blue-600">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default AboutUs
