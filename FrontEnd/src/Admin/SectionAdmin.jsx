import React from 'react'
import SideBar from './Sidebar'
import Details from './Details'

function SectionAdmin() {

    return (
        <>
            <section className="flex  p-0.5">
                <SideBar></SideBar>
                <div className="w-4/5 p-8 space-y-6">
                    <Details></Details>
                </div>
            </section>
        </>
    )
}

export default SectionAdmin
