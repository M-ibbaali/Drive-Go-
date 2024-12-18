import React, { useState , useEffect} from 'react'
import Profile from './Profile'
import Password from './Password'
import Security from './Security'
import Settings from './Settings'
import SideBar from './SideBar'

function Manager({ isLoggedIn }) {
    const [activeSection, setActiveSection] = useState(isLoggedIn ? "Profile" : "Settings")
    const [data, setData] = useState([])
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'Light')
    const [notification, setNotification] = useState(() => {
        const storedValue = localStorage.getItem('notification')
        return storedValue !== null ? JSON.parse(storedValue) : true
    })
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'English')

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    useEffect(() => {
        localStorage.setItem('notification', JSON.stringify(notification))
    }, [notification])

    const renderContent = () => {
        if (activeSection === "Profile") {
            return (
                isLoggedIn && <Profile setData={setData} />
            )
        }

        if (activeSection === "Password") {
            return (
                isLoggedIn && <Password user={data.user_id} />
            )
        }

        if (activeSection === "Security") {
            return (
                isLoggedIn && <Security user={data.user_id} />
            )
        }

        if (activeSection === "Settings") {
            return (
                <Settings
                    theme={theme}
                    setTheme={setTheme}
                    language={language}
                    setLanguage={setLanguage}
                    notification={notification}
                    setNotification={setNotification}
                />
            )
        }
        
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">{activeSection} Settings</h1>
                <p className="text-gray-600">
                    Content for the {activeSection} section will be displayed here.
                </p>
            </div>
        )
    }
    return (
        <>
            <SideBar
                data={data}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                renderContent={renderContent}
                isLoggedIn={isLoggedIn}
            />
        </>
    )
}

export default Manager
