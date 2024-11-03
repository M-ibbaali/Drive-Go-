import React from 'react'
import { MdArrowDropDown } from 'react-icons/md'

function FAQ({ faqs, activeFAQ, toggleFAQ }) {

    return (
        <>
            <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">FAQ</h2>
                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center w-full text-left"
                            >
                                <span className="text-gray-800 font-medium">{faq.question}</span>
                                <MdArrowDropDown 
                                    className={`w-5 h-5 transform ${activeFAQ === index ? "rotate-180" : ""}`}
                                />
                            </button>
                            {activeFAQ === index && (
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FAQ
