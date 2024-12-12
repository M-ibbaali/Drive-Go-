import React from 'react'

function Podcast() {
    const podcasts = [
        {
          id: 1,
          title: 'The Future of Car Rentals',
          description: 'In this episode, we discuss the future of car rentals and how technology is transforming the industry.',
          audioUrl: 'https://example.com/podcast1.mp3',
          date: 'December 1, 2024',
        },
        {
          id: 2,
          title: 'Eco-Friendly Vehicles in 2024',
          description: 'Join us as we explore the growing trend of eco-friendly vehicles and their impact on the rental market.',
          audioUrl: 'https://example.com/podcast2.mp3',
          date: 'November 25, 2024',
        },
    ]
    return (
        <>
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Our Podcast</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcasts.map((podcast) => (
                        <div key={podcast.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold text-blue-600">{podcast.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{podcast.date}</p>
                        <p className="text-gray-700 mb-4">{podcast.description}</p>
                        <audio controls className="w-full">
                            <source src={podcast.audioUrl} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Podcast
