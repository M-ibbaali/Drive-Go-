import React, { useState, useEffect } from "react"
import { FaTrash, FaThumbtack } from 'react-icons/fa'

function EmailList({ setCount, setImportant, setBin, searchTerm }) {
    const [emails, setEmails] = useState([])
    const [error, setError] = useState(null)
    const [selectedEmails, setSelectedEmails] = useState([])

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Inbox/inbox.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch emails.')
                }
                const data = await response.json()
                setEmails(data.data || [])
                setError(data.error || null)
                setCount(data.data.length || '')
            } catch (err) {
                setError(err.message)
            }
        }

        fetchEmails()
    }, [setCount])

    const filteredEmails = emails.filter(email => 
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
        email.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleCheckboxChange = (emailId) => {
        setSelectedEmails((prevSelected) => {
            if (prevSelected.includes(emailId)) {
                return prevSelected.filter(id => id !== emailId)
            } else {
                return [...prevSelected, emailId]
            }
        })
    }

    const handleDelete = async () => {
        if (selectedEmails.length === 0) {
            alert("Please select emails to delete.")
            return
        }

        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Inbox/deleteEmails.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedEmails }),
            })

            if (!response.ok) {
                throw new Error('Failed to delete emails.')
            }

            setEmails((prevEmails) => prevEmails.filter(email => !selectedEmails.includes(email.id)))
            setSelectedEmails([])
            setCount(prevCount => prevCount - selectedEmails.length)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="bg-white flex-grow overflow-y-auto rounded-b-lg">
            <div className="p-4 text-right">
                {/* Trash icon for deletion */}
                <button
                    onClick={handleDelete}
                    className="p-2 text-xl rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer mr-3"
                    disabled={selectedEmails.length === 0}
                >
                    <FaTrash />
                </button>
                <button
                    className="p-2 text-xl rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer"
                >
                    <FaThumbtack />
                </button>
            </div>
            <table className="w-full table-auto text-left">
                <thead>
                    <tr className="border-b-2">
                        <th colSpan="2" className="p-4">
                            <input
                                type="checkbox"
                                onChange={() => {
                                    if (selectedEmails.length === emails.length) {
                                        setSelectedEmails([])
                                    } else {
                                        setSelectedEmails(emails.map(email => email.id))
                                    }
                                }} 
                                checked={selectedEmails.length === emails.length}
                            />
                        </th>
                        <th className="p-4">Sender</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {error ? (
                        <tr>
                            <td colSpan="5" className="p-4 text-center text-red-500">{error}</td>
                        </tr>
                    ) : (filteredEmails.map((email, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100 cursor-pointer border-b"
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedEmails.includes(email.message_id)} 
                                        onChange={() => handleCheckboxChange(email.message_id)} 
                                    />
                                </td>
                                <td className="p-4">
                                    <i className="far fa-star text-gray-400 hover:text-yellow-400"></i>
                                </td>
                                <td className="p-4">{email.full_name}</td>
                                <td className="p-4">{email.subject}</td>
                                <td className="p-4 text-gray-500">{email.sent_at}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default EmailList
