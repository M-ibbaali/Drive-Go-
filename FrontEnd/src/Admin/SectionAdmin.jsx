import React, {useState} from 'react'
import SideBar from './SlideBar/SideBar'
import Content from './Content'

function SectionAdmin({ setIsLoggedIn }) {
    const [activeItem, setActiveItem] = useState('Dashboard')

    const handleItemClick = (item) => {
        setActiveItem(item)
    }

    return (
        <>
            <section className="flex p-0.5">
                <SideBar activeItem={activeItem} onItemClick={handleItemClick} setIsLoggedIn={setIsLoggedIn}></SideBar>
                <div className="w-5/6 p-8 space-y-6">
                    <Content activeItem={activeItem}></Content>
                </div>
            </section>
        </>
    )
}

export default SectionAdmin
