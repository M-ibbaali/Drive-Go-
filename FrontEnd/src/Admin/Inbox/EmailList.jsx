import React, { useState, useEffect } from "react"
import { FaTrash, FaTimes, FaPaperPlane } from 'react-icons/fa'

function EmailList({ searchTerm }) {
    const [emails, setEmails] = useState([])
    const [error, setError] = useState(null)
    const [selectedEmails, setSelectedEmails] = useState([])
    
    const [selectedEmail, setSelectedEmail] = useState(null)
    const [replyMessage, setReplyMessage] = useState('')
    const [notification, setNotification] = useState({ message: '', type: '' })

    const fetchEmails = async () => {
        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Inbox/inbox.php')
            if (!response.ok) {
                throw new Error('Failed to fetch emails.')
            }
            const data = await response.json()
            setEmails(data.data || [])
            setError(data.error || null)
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchEmails()
    }, [])

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
            setNotification({ message: 'Please select emails to delete.', type: 'error' })
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
            fetchEmails()
            setNotification({ message: 'Emails deleted successfully!', type: 'success' })
        } catch (err) {
            setError(err.message)
            setNotification({ message: 'An error occurred while deleting emails.', type: 'error' })
        }
    }

    const handleSelectAllToggle = () => {
        if (selectedEmails.length === emails.length) {
            setSelectedEmails([])
        } else {
            setSelectedEmails(emails.map(email => email.id))
        }
    }

    const handleEmailClick = (email) => {
        setSelectedEmail(email)
    }

    const handleClose = () => {
        setSelectedEmail(null)
        setReplyMessage('')
    }

    const handleSendReply = async () => {
        if (!replyMessage.trim()) {
            setNotification({ message: 'Please write a message before sending.', type: 'error' });
            return;
        }

        try {
            const response = await fetch('http://localhost/drive-go/BackEnd/Admin/Inbox/sentNotification.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: selectedEmail.user_id,
                    message: replyMessage,
                    message_id: selectedEmail.message_id,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to send notification.');
            }
    
            const data = await response.json();
    
            if (data.success) {
                setNotification({ message: 'Reply sent successfully!', type: 'success' })
            } else {
                setNotification({ message: 'Error: ' + data.error, type: 'error' });
            }
    
            setReplyMessage('');
            setSelectedEmail(null);
            fetchEmails()
        } catch (err) {
            setNotification({ message: 'An error occurred while sending the reply.', type: 'error' })
        }
    }

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="bg-white flex-grow overflow-y-auto rounded-b-lg">
            {notification.message && (
                <div className={`fixed z-50 top-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    <span>{notification.message}</span>
                </div>
            )}
            <div className="p-4 text-right">
                {/* Trash icon for deletion */}
                <button
                    onClick={handleDelete}
                    className="p-2 text-xl rounded-full text-gray-500 hover:bg-gray-100 cursor-pointer mr-3"
                    disabled={selectedEmails.length === 0}
                >
                    <FaTrash />
                </button>
            </div>
            <table className="w-full table-auto text-left">
                <thead>
                    <tr className="border-b-2">
                        <th colSpan="2" className="p-4">
                            <input
                                type="checkbox"
                                onChange={handleSelectAllToggle} 
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
                            <td colSpan="5" className="p-4 text-center text-gray-500">{error}</td>
                        </tr>
                    ) : (filteredEmails.map((email, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100 cursor-pointer border-b"
                                onClick={(e) => {
                                    if (!e.target.closest('input[type="checkbox"]')) {
                                        handleEmailClick(email)
                                    }
                                }}
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedEmails.includes(email.message_id)} 
                                        onChange={(e) => {
                                            e.stopPropagation()
                                            handleCheckboxChange(email.message_id)
                                        }} 
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
            
            {selectedEmail && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Subject: <span className="text-gray-500 font-normal">{selectedEmail.subject}</span></h3>
                            <button onClick={handleClose} className="text-red-500 text-xl">
                                <FaTimes />
                            </button>
                        </div>
                        <p className="mt-2 font-semibold">From: <span className="text-gray-500 font-normal">{selectedEmail.full_name}</span></p>
                        <p className="font-semibold">Sent at: <span className="text-gray-500 font-normal">{selectedEmail.sent_at}</span></p>
                        <p className="mt-4 font-semibold">Message: <span className="text-gray-500 font-normal">{selectedEmail.message_content}</span></p>

                        <div className="mt-4 flex items-center border rounded-lg">
                            <input
                                type="text"
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                                placeholder="Write your reply..."
                                rows="4"
                            />
                            <button
                                onClick={handleSendReply}
                                className="ml-2 p-2 text-xl text-blue-500 hover:text-blue-700"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmailList
