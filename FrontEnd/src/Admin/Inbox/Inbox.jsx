import React, { useState } from "react"
import Header from "./HeaderBox"
import EmailList from "./EmailList"


function Inbox() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="flex">
            <div className="flex flex-col flex-grow ml-5 w-5/6">
                <Header setSearchTerm={setSearchTerm} />
                <EmailList
                    searchTerm={searchTerm}
                />
            </div>
        </div>
    )
}

export default Inbox
