import React from "react"
import Sidebar from "./SideBarInbox"
import Header from "./HeaderBox"
import EmailList from "./EmailList"


function Inbox() {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex flex-col flex-grow">
            <Header />
            <EmailList />
        </div>
      </div>
    )
}

export default Inbox
