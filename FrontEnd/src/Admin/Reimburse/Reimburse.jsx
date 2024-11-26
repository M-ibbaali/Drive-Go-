import React from 'react'

function Reimburse() {
    const reimbursements = [
        { id: "00001", name: "Christine Brooks", address: "089 Kutch Green Apt. 448", date: "04 Sep 2019", type: "Electric", status: "Completed" },
        { id: "00002", name: "Rosie Pearson", address: "979 Immanuel Ferry Suite 526", date: "28 May 2019", type: "Book", status: "Processing" },
        { id: "00003", name: "Darrell Caldwell", address: "8587 Frida Ports", date: "23 Nov 2019", type: "Medicine", status: "Rejected" },
        { id: "00004", name: "Gilbert Johnston", address: "768 Destiny Lake Suite 600", date: "05 Feb 2019", type: "Mobile", status: "Completed" },
        { id: "00005", name: "Alan Cain", address: "042 Mylene Throughway", date: "29 Jul 2019", type: "Watch", status: "Processing" },
        { id: "00006", name: "Alfred Murray", address: "543 Weimann Mountain", date: "15 Aug 2019", type: "Medicine", status: "Completed" },
        { id: "00007", name: "Maggie Sullivan", address: "New Scottieberg", date: "21 Dec 2019", type: "Watch", status: "Processing" },
        { id: "00008", name: "Rosie Todd", address: "New Jon", date: "30 Apr 2019", type: "Medicine", status: "On Hold" },
        { id: "00009", name: "Dollie Hines", address: "124 Lyla Forge Suite 975", date: "09 Jan 2019", type: "Book", status: "In Transit" },
    ]

    const getStatusClass = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-100 text-green-600"
            case "Processing":
                return "bg-purple-100 text-purple-600"
            case "Rejected":
                return "bg-red-100 text-red-600"
            case "On Hold":
                return "bg-yellow-100 text-yellow-600"
            case "In Transit":
                return "bg-blue-100 text-blue-600"
            default:
                return "bg-gray-100 text-gray-600"
        }
    }

    return (
        <div className="flex min-h-screen">
        {/* Main Content */}
            <main className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Reimburse</h1>
                </div>

                {/* Filters */}
                <div className="mt-6 flex items-center gap-4">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">Filter By</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">Date</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">Order Type</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg">Reset Filter</button>
                </div>

                {/* Table */}
                <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-gray-600">ID</th>
                                <th className="px-4 py-2 text-left text-gray-600">Name</th>
                                <th className="px-4 py-2 text-left text-gray-600">Address</th>
                                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                                <th className="px-4 py-2 text-left text-gray-600">Type</th>
                                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reimbursements.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2">{item.id}</td>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.address}</td>
                                    <td className="px-4 py-2">{item.date}</td>
                                    <td className="px-4 py-2">{item.type}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default Reimburse