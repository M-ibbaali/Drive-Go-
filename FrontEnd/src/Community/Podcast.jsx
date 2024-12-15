import React from 'react'

function Podcast() {
    const podcasts = [
        {
          id: 1,
          title: 'The Future of Car Rentals with DriveGo',
          description: 'In this episode, we explore how DriveGo is revolutionizing the car rental industry with cutting-edge technology and a seamless user experience. We dive into the innovative features that set DriveGo apart, from AI-driven vehicle recommendations to a fully digital booking system. Tune in to hear how DriveGo is enhancing convenience for customers while transforming the traditional car rental process.',
          audioUrl: '/Podcusts/DriveGo-Future.wav',
          date: 'December 1, 2024',
        },
        {
          id: 2,
          title: 'Eco-Friendly Cars at DriveGo in 2024',
          description: 'Join us in this episode as we dive deep into DriveGo\'s growing commitment to sustainability and eco-friendly travel options. We\'ll explore how DriveGo is integrating more electric and hybrid vehicles into our fleet in 2024, offering customers environmentally conscious choices without compromising on convenience or performance. Learn about the technologies driving these changes and the long-term impact on reducing emissions. Tune in to discover how DriveGo is leading the way toward a greener future in car rentals.',
          audioUrl: '/Podcusts/DriveGo-Eco-Friendly.mp3',
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
