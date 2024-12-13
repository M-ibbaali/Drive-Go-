import React, { useState } from "react"
import Sidebar from "./SideBarInbox"
import Header from "./HeaderBox"
import EmailList from "./EmailList"


function Inbox() {
    const [count, setCount] = useState(0)
    const [important, setImportant] = useState(0)
    const [bin, setBin] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar
                count={count}
                important={important}
                bin={bin}
            />
            
            {/* Main Content */}
            <div className="flex flex-col flex-grow ml-5 w-5/6">
                <Header setSearchTerm={setSearchTerm} />
                <EmailList
                    setCount={setCount}
                    setImportant={setImportant}
                    setBin={setBin}
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    )
}

export default Inbox
