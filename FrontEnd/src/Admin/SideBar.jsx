import {useState} from 'react'
import SidebarItem from './SideBarItem'
import { FaCog, FaSignOutAlt, FaCarSide, FaChartLine, FaInbox, FaRegCalendarAlt, FaSun, FaMoon, FaWallet, FaQuestionCircle } from 'react-icons/fa'

function SideBar() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode)
    }

    return (
        <>
            <div className="w-1/5 bg-white p-4 shadow-lg rounded-lg flex flex-col">
                <div className="space-y-5">
                    <p className="text-gray-500 text-sm mb-2">MAIN MENU</p>
                    <SidebarItem icon={<FaChartLine />} label="Dashboard" active />
                    <SidebarItem icon={<FaCarSide />} label="Car Rent" />
                    <SidebarItem icon={<FaChartLine />} label="Insight" />
                    <SidebarItem icon={<FaWallet />} label="Reimburse" />
                    <SidebarItem icon={<FaInbox />} label="Inbox" />
                    <SidebarItem icon={<FaRegCalendarAlt />} label="Calendar" />
                </div>

                <div className="mt-12 space-y-2">
                    <p className="text-gray-500 text-sm mb-2">PREFERENCES</p>
                    <SidebarItem icon={<FaCog />} label="Settings" />
                    <SidebarItem icon={<FaQuestionCircle />} label="Help & Center" />
                    <div
                        onClick={toggleTheme}
                        className="flex items-center p-2 rounded-lg text-gray-700 cursor-pointer hover:bg-blue-200"
                    >
                        {isDarkMode ? (
                            <FaSun className="text-yellow-500 mr-2 text-lg" />
                        ) : (
                            <FaMoon className="text-gray-700 mr-2 text-lg" />
                        )}
                        <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </div>
                </div>

                <div className="mt-auto">
                    <SidebarItem icon={<FaSignOutAlt />} label="Log Out" />
                </div>
            </div>
        </>
    )
}

export default SideBar
