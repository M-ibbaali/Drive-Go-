import React, {useState} from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { MdNotificationsActive, MdNotificationsOff } from 'react-icons/md'

function Settings({ theme, setTheme, language, setLanguage, notification, setNotification }) {
    document.title = 'DriveGo - Settings'

    const [tempTheme, setTempTheme] = useState(theme)
    const [tempLanguage, setTempLanguage] = useState(language)
    const [tempNotification, setTempNotification] = useState(notification)

    const handleUpdate = () => {
        setTheme(tempTheme)
        setLanguage(tempLanguage)
        setNotification(tempNotification)
    }

    const handleCancel = () => {
        setTempTheme(theme)
        setTempLanguage(language)
        setTempNotification(notification)
    }

    return (
        <>
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <h1 className="text-2xl font-bold mb-6 px-6 py-4 bg-gradient-to-r from-blue-300 to-purple-200">Application Settings</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleUpdate()
                    }}
                    className="space-y-4 p-8"
                >
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={()=> {setTempTheme((prev)=> (prev === 'Dark' ? 'Light' : 'Dark'))}}
                            className="p-2 rounded-full border border-gray-300 shadow-md focus:outline-none hover:opacity-75"
                            style={{
                                backgroundColor: tempTheme === 'Light' ? "#555" : "#f0f0f0",
                                color: tempTheme === 'Light' ? "yellow" : "gray",
                            }}
                        >
                            {tempTheme === 'Light' ? <MdLightMode /> : <MdDarkMode />}
                        </button>
                        <label className="text-gray-700 font-medium">{tempTheme === 'Dark' ? 'Dark' : 'Light'} Mode</label>
                    </div>
            
                    {/* Notifications Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={()=> {setTempNotification((prev)=> !prev)}}
                            className="p-2 rounded-full border border-gray-300 shadow-md focus:outline-none hover:opacity-75"
                            style={{
                                backgroundColor: tempNotification === true ? "#4caf50" : "#f0f0f0",
                                color: tempNotification === true  ? "white" : "gray",
                            }}
                        >
                            {tempNotification === true  ? (
                                <MdNotificationsActive />
                            ) : (
                                <MdNotificationsOff />
                            )}
                        </button>
                        <label className="text-gray-700 font-medium">{tempNotification === true ? 'ON' : 'OFF'}</label>
                    </div>
            
                    {/* Language Selection */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Select Language</label>
                        <select
                            name="language"
                            value={tempLanguage}
                            onChange={(e)=> {setTempLanguage(e.target.value)}}
                            className="w-full px-4 py-2 mt-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="English">English</option>
                            <option value="French">French</option>
                        </select>
                    </div>
            
                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={handleCancel}
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

export default Settings
