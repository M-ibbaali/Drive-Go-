import React from 'react'
import ContentHome from './ContentHome'
import CarLogos from './CarLogos'
import PopularCars from './PopularCars'
import RecommandCar from './RecommandCar'

function SectionHome() {
    return (
        <section>
            <ContentHome></ContentHome>
            <CarLogos></CarLogos>
            <PopularCars></PopularCars>
            <RecommandCar></RecommandCar>
        </section>
    )
}

export default SectionHome
