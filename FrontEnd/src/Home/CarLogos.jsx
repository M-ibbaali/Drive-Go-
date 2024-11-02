import React from 'react'

function CarLogos() {
    const brands = [
        { name: "Honda", imgSrc: "/Pictures/Audi.jfif" },
        { name: "Jaguar", imgSrc: "/Pictures/Audi.jfif" },
        { name: "Nissan", imgSrc: "/Pictures/Audi.jfif" },
        { name: "Volvo", imgSrc: "/Pictures/Audi.jfif" },
        { name: "Audi", imgSrc: "/Pictures/Audi.jfif" }
    ]

    return (
        <div className="flex bg-tertiary justify-around my-4">
            {brands.map((brand, index) => (
                <img
                    key={index}
                    src={brand.imgSrc}
                    alt={brand.name}
                    className="h-16 w-auto"
                />
            ))}
        </div>
    );
}

export default CarLogos
