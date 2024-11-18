import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'

function Reviews({ reviews }) {
    const [showAll, setShowAll] = useState(false)
    const reviewsToShow = showAll ? reviews : reviews.slice(0, 2)
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Reviews <span className="bg-blue-500 text-white px-3 py-1 rounded text-center text-base">{reviews.length}</span></h2>
            <div className="space-y-4">
                {reviewsToShow.map((review, index) => (
                    <div key={index}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-300 rounded-full h-10 w-10"></div>
                                <p className="font-bold">{review.name}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-auto">
                                <p className="text-gray-500 text-xs">{review.date}</p>
                                <div className="flex">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <AiFillStar key={starIndex} className={`text-lg ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="mt-2 pl-8 text-gray-700">{review.text}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setShowAll(!showAll)} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">{showAll ? 'Show Less' : 'Show All'}</button>
        </div>
    )
}

export default Reviews
