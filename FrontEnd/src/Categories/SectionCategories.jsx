import React, { useState } from 'react'
import Filter from '../Reservation/Filter'
import SearchBar from '../Home/SearchBar'
import Cars from './Cars'

function SectionCategories() {
    const [price, setPrice] = useState(0)
    
    return (
        <>
            <div className="container mx-auto p-6">
                <div className="flex gap-6">
                <Filter price={price} setPrice={setPrice}></Filter>
                <div className="flex-1">
                    <SearchBar></SearchBar>
                    <Cars></Cars>
                </div>
                </div>
            </div>
        </>
    )
}

export default SectionCategories
