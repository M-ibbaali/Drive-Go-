import React from "react"

const emails = [
    {
        sender: "Julia Jalal",
        label: "Primary",
        subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
        time: "8:38 AM",
        labelColor: "bg-blue-500",
    },
    {
        sender: "Minerva Barnett",
        label: "Work",
        subject: "Get Best Advertiser in Your Side Pocket",
        time: "8:13 AM",
        labelColor: "bg-orange-500",
    },
    {
        sender: "Peter Lewis",
        label: "Friends",
        subject: "Vacation Home Rental Success",
        time: "7:52 PM",
        labelColor: "bg-pink-500",
    },
    {
        sender: "Anthony Briggs",
        label: "Primary",
        subject: "Free Classifieds Using Them To Promote Your Stuff Online",
        time: "7:52 PM",
        labelColor: "bg-blue-500",
    },
]

function EmailList() {
    return (
        <div className="bg-white flex-grow overflow-y-auto">
            <table className="w-full table-auto text-left">
                <thead>
                    <tr>
                        <th className="p-4">Star</th>
                        <th className="p-4">Sender</th>
                        <th className="p-4">Label</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email, index) => (
                        <tr
                        key={index}
                        className="hover:bg-gray-100 cursor-pointer border-b"
                        >
                            <td className="p-4">
                                <input type="checkbox" />
                            </td>
                            <td className="p-4">
                                <i className="far fa-star text-gray-400 hover:text-yellow-400"></i>
                            </td>
                            <td className="p-4">{email.sender}</td>
                            <td className="p-4">
                                <span
                                className={`text-white text-xs px-2 py-1 rounded-full ${email.labelColor}`}
                                >
                                {email.label}
                                </span>
                            </td>
                            <td className="p-4">{email.subject}</td>
                            <td className="p-4 text-gray-500">{email.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default EmailList
