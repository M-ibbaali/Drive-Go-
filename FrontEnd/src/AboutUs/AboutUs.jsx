import React from 'react'

function AboutUs() {
    return (
        <>
            <div className="bg-gray-100 text-gray-800">
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-8">How it Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="How it Works"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                            <div>
                                <p className="mb-4">
                                    Explain the step-by-step process of how customers can use your
                                    service.
                                </p>
                                <a
                                    href="/aboutus"
                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-8">Featured</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Featured items */}
                        </div>
                    </div>
                </section>

                {/* Partnership */}
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-8">Partnership</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Partnership"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                            <div>
                                <p className="mb-4">
                                    Explain the benefits and opportunities of partnering with your
                                    company.
                                </p>
                                <a
                                    href="/aboutus"
                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg"
                                >
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Business Relation */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-8">Business Relation</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="mb-4">
                                    Describe your company's approach to building strong business
                                    relationships.
                                </p>
                                <a
                                    href="/aboutus"
                                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg"
                                >
                                    Learn More
                                </a>
                            </div>
                            <div>
                                <img
                                    src="https://via.placeholder.com/400x300"
                                    alt="Business Relation"
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AboutUs
