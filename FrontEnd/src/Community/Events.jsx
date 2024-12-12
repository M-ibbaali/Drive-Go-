import React from 'react'

function Events() {
    const events = [
        {
          id: 1,
          title: 'DriveGo Annual Meet-Up',
          date: 'January 15, 2025',
          description: 'Join us for our annual meet-up to discuss new developments, features, and future plans for DriveGo.',
          registrationUrl: 'https://example.com/register-meetup',
        },
        {
          id: 2,
          title: 'Eco-Driving Workshop',
          date: 'February 10, 2025',
          description: 'Learn about eco-friendly driving practices and how DriveGo is embracing sustainability.',
          registrationUrl: 'https://example.com/register-eco-workshop',
        },
        {
          id: 3,
          title: 'Customer Feedback Session',
          date: 'March 5, 2025',
          description: 'Share your feedback and ideas for improving DriveGo’s services. Your voice matters!',
          registrationUrl: 'https://example.com/register-feedback-session',
        },
    ]
    return (
        <>
            <section className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Upcoming Events</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-semibold text-blue-600">{event.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{event.date}</p>
                            <p className="text-gray-700 mb-4">{event.description}</p>
                            <a
                                href={event.registrationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
                            >
                                Register Now
                            </a>
                        </div>
                    ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Events
