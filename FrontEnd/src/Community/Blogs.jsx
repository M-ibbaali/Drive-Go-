import React from 'react'

function Blogs() {
    const blogPosts = [
        {
          id: 1,
          title: 'How to Choose the Perfect Rental Car for Your Trip',
          date: 'December 5, 2024',
          description: 'Choosing the right rental car can make or break your trip. Here are some tips on finding the best vehicle for your needs.',
          url: '/blog/how-to-choose-the-perfect-rental-car',
        },
        {
          id: 2,
          title: 'The Benefits of Renting an Electric Vehicle',
          date: 'November 20, 2024',
          description: 'Electric vehicles are becoming increasingly popular in the rental market. Learn about the benefits of choosing an EV for your next rental.',
          url: '/blog/benefits-of-renting-electric-vehicle',
        },
        {
          id: 3,
          title: 'Top 5 Road Trip Destinations for 2025',
          date: 'October 15, 2024',
          description: 'Planning a road trip? Check out these top 5 destinations that are perfect for an unforgettable adventure in 2025.',
          url: '/blog/top-5-road-trip-destinations',
        },
    ]
    return (
        <>
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Our Blog</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold text-blue-600">{post.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{post.date}</p>
                            <p className="text-gray-700 mb-4">{post.description}</p>
                            <a
                                href={post.url}
                                className="text-blue-500 hover:text-blue-700 font-semibold"
                            >
                                Read More
                            </a>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blogs
