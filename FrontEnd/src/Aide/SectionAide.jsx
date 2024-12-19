import React, { useState } from 'react'
import FAQ from "./FAQ"
import Contact from './Contact'

function SectionAide() {
    const [activeFAQ, setActiveFAQ] = useState(null)

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    }

    const faqs = [
        { question: "What is your refund policy?", answer: "Our refund policy is ..." },
        { question: "How to track my order?", answer: "You can track your order by ..." },
        { question: "What are the support hours?", answer: "Our support hours are ..." },
    ]

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-semibold text-gray-800">Aide</h1>
                        <p className="text-gray-600 mt-2">How can we help you?</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FAQ faqs={faqs} activeFAQ={activeFAQ} toggleFAQ={toggleFAQ}></FAQ>
                        <Contact></Contact>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionAide
