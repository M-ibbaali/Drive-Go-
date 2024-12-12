import {useState, useEffect} from 'react'

function CarLogos() {
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBrandsCars = async () => {
            try {
                const response = await fetch('http://localhost/drive-go/BackEnd/Cars/brands.php')
                if (!response.ok) {
                    throw new Error('Failed to fetch brands.')
                }
                const data = await response.json()

                setTimeout(() => {
                    setBrands(data.data)
                    setLoading(false)
                }, 1000)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchBrandsCars()
    }, [])

    return (
        <div className="flex bg-tertiary justify-around my-4 overflow-hidden">
            {error ? (
                <div className="text-gray-500 text-center">
                    <p>Error: {error}</p>
                </div>
            ) : (
                loading ? (
                    <div className="flex items-center mt-4 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                ) : (
                    <div className="flex justify-center animate-marquee">
                        {brands.map((brand, index) => (
                            <img
                                key={index}
                                src={brand.image}
                                alt={brand.name}
                                className="h-16 w-auto ml-40"
                            />
                        ))}
                    </div>
                )
            )}
        </div>
    )
}

export default CarLogos
