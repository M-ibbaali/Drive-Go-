import React from 'react'

function Security() {
    document.title = 'DriveGo - Security'

    return (
        <>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <h1 className="text-2xl font-bold mb-6 px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-200">Security Settings</h1>
                <form className="space-y-4 p-8">
                    {/* Two-Factor Authentication Toggle */}
                    <div className="flex items-center gap-3">
                    <label className="text-gray-700 font-medium">Enable Two-Factor Authentication</label>
                    <input
                        type="checkbox"
                        name="twoFactorAuth"
                        className="h-5 w-5 text-blue-500 border-gray-300 rounded"
                    />
                    </div>

                    {/* Password Recovery Options */}
                    <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                        Recovery Email
                        </label>
                        <input
                            type="email"
                            name="recoveryEmail"
                            placeholder="Enter recovery email"
                            className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                        Recovery Phone Number
                        </label>
                        <input
                            type="tel"
                            name="recoveryPhone"
                            placeholder="Enter recovery phone number"
                            className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                    >
                        Update
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Security
