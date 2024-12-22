// import React, { useState, useEffect } from 'react'
// import Filter from './Filter'
// import Cars from './Cars'
// import { FaFilter } from 'react-icons/fa'

// function SectionCategories() {
//     const [cars, setCars] = useState([])
//     const [error, setError] = useState(null)
//     const [filteredCars, setFilteredCars] = useState([])
//     const [selectedTypes, setSelectedTypes] = useState([])
//     const [selectedCapacities, setSelectedCapacities] = useState([])
//     const [price, setPrice] = useState(0)
//     const [types, setTypes] = useState([])
//     const [capacities, setCapacities] = useState([])
//     const [priceRange, setPriceRange] = useState({})
//     const [loading, setLoading] = useState(true)

//     const [isFilterOpen, setIsFilterOpen] = useState(false)

//     useEffect(() => {
//         const fetchCars = async () => {
//         try {
//             const response = await fetch("http://localhost/drive-go/BackEnd/Cars/cars.php")
//             if (!response.ok) {
//                 throw new Error("Failed to fetch cars data")
//             }
//             const data = await response.json()
//                 if (data.error) {
//                     throw new Error(data.error)
//                 }

//             const carsData = data.data.map((car) => ({
//                 ...car,
//                 price: parseFloat(car.price),
//             }))

//             setPriceRange({
//                 ...data.priceRange,
//                 min_price: parseFloat(data.priceRange.min_price),
//                 max_price: parseFloat(data.priceRange.max_price),
//             })

//             setTypes(data.types)
//             setCapacities(data.capacities)
//             setPriceRange({
//                 min_price: data.priceRange.min_price,
//                 max_price: data.priceRange.max_price,
//             })
//             setFilteredCars(carsData)
//             setPrice(parseFloat(data.priceRange.min_price))

//             setTimeout(() => {
//                 setCars(carsData)
//                 setLoading(false)
//             }, 2000)
//         } catch (error) {
//             setError(error.message)
//         }
//         }

//         fetchCars()
//     }, [])

//     useEffect(() => {
//         const filtered = cars.filter((car) => {
//             const isTypeMatch =
//                 selectedTypes.length === 0 || selectedTypes.includes(car.type)
//             const isCapacityMatch =
//                 selectedCapacities.length === 0 ||
//                 selectedCapacities.includes(car.passengers)
//             const isPriceMatch = car.price >= price
//             return isTypeMatch && isCapacityMatch && isPriceMatch
//         })
//         setFilteredCars(filtered)
//     }, [cars, selectedTypes, selectedCapacities, price])

//     const handleTypeChange = (type) => {
//         setSelectedTypes((prev) =>
//             prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
//         )
//     }

//     const handleCapacityChange = (capacity) => {
//         setSelectedCapacities((prev) =>
//             prev.includes(capacity)
//                 ? prev.filter((c) => c !== capacity)
//                 : [...prev, capacity]
//         )
//     }

//     const toggleFilter = () => {
//         setIsFilterOpen(!isFilterOpen)
//     }

//     return (
//         <>
//             <div className=" mx-auto py-6 px-4">
//                 <div className="md:hidden flex justify-end mb-4">
//                     <button
//                         onClick={toggleFilter}
//                         className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
//                     >
//                         <FaFilter className="mr-2" />
//                         {isFilterOpen ? 'Close' : 'Open'} Filters
//                     </button>
//                 </div>

//                 <div className="flex flex-col md:flex-row gap-3 relative">
//                     {/* Filter for Desktop */}
//                     <div className="hidden md:block">
//                         <Filter
//                             price={price}
//                             setPrice={setPrice}
//                             types={types}
//                             capacities={capacities}
//                             priceRange={priceRange}
//                             handleTypeChange={handleTypeChange}
//                             handleCapacityChange={handleCapacityChange}
//                         />

//                     </div>

//                     {/* Mobile Filter - Overlay */}
//                     {isFilterOpen && (
//                         <div className="fixed inset-0 z-50 md:hidden">
//                             <div
//                                 className="absolute inset-0 bg-black opacity-50"
//                                 onClick={toggleFilter}
//                             ></div>
//                             <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-2xl">
//                                 <Filter
//                                     price={price}
//                                     setPrice={setPrice}
//                                     types={types}
//                                     capacities={capacities}
//                                     priceRange={priceRange}
//                                     handleTypeChange={handleTypeChange}
//                                     handleCapacityChange={handleCapacityChange}
//                                     onClose={toggleFilter}
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex-1 flex flex-col items-center gap-5">
//                         {filteredCars ? (
//                         loading ? (
//                             <div className="flex items-center justify-center mt-4">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
//                             </div>
//                         ) : (
//                             <Cars cars={filteredCars} error={error} />
//                         )
//                         ) : loading ? (
//                             <div className="flex items-center justify-center mt-4">
//                                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
//                             </div>
//                         ) : (
//                             <Cars cars={cars} error={error} />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default SectionCategories
import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import Cars from "./Cars";
import { FaFilter } from "react-icons/fa";
import Filter_Date from "./Filter_Date";
import { useSearchContext } from "./SearchContext";
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';

function SectionCategories() {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);
    const [filteredCars, setFilteredCars] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCapacities, setSelectedCapacities] = useState([]);
    const [price, setPrice] = useState(0);
    const [types, setTypes] = useState([]);
    const [capacities, setCapacities] = useState([]);
    const [priceRange, setPriceRange] = useState({});
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { searchQuery } = useSearchContext();

    const [pickupLocation, setPickupLocation] = useState("Rabat");
    const [dropoffLocation, setDropoffLocation] = useState("Rabat");
    const [pickupDate, setPickupDate] = useState("12/18/2024");
    const [dropoffDate, setDropoffDate] = useState("12/25/2024");

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const filterVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(
                    "http://localhost/drive-go/BackEnd/Cars/cars.php"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch cars data");
                }
                const data = await response.json();
                if (data.error) {
                    throw new Error(data.error);
                }

                const carsData = data.data.map((car) => ({
                    ...car,
                    price: parseFloat(car.price),
                }));

                setPriceRange({
                    ...data.priceRange,
                    min_price: parseFloat(data.priceRange.min_price),
                    max_price: parseFloat(data.priceRange.max_price),
                });

                setTypes(data.types);
                setCapacities(data.capacities);
                setFilteredCars(carsData);
                setPrice(parseFloat(data.priceRange.min_price));

                // Simulate loading for better UX
                setTimeout(() => {
                    setCars(carsData);
                    setLoading(false);
                }, 1500);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    useEffect(() => {
        const filtered = cars.filter((car) => {
            const searchTerms = searchQuery.toLowerCase().trim().split(" ");
            const carName = car.name.toLowerCase();
            const carType = car.type.toLowerCase();

            const matchesSearch = searchTerms.every(
                (term) => carName.includes(term) || carType.includes(term)
            );

            const isTypeMatch =
                selectedTypes.length === 0 || selectedTypes.includes(car.type);
            const isCapacityMatch =
                selectedCapacities.length === 0 ||
                selectedCapacities.includes(car.passengers);
            const isPriceMatch = car.price >= price;
            const isLocationMatch = true; // Can be implemented based on requirements
            const isDateAvailable = true;  // Can be implemented based on requirements

            return (
                matchesSearch &&
                isTypeMatch &&
                isCapacityMatch &&
                isPriceMatch &&
                isLocationMatch &&
                isDateAvailable
            );
        });

        // Add a small delay for smooth transition
        const filterTimer = setTimeout(() => {
            setFilteredCars(filtered);
        }, 300);

        return () => clearTimeout(filterTimer);
    }, [
        cars,
        selectedTypes,
        selectedCapacities,
        price,
        pickupLocation,
        dropoffLocation,
        pickupDate,
        dropoffDate,
        searchQuery,
    ]);

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleCapacityChange = (capacity) => {
        setSelectedCapacities((prev) =>
            prev.includes(capacity)
                ? prev.filter((c) => c !== capacity)
                : [...prev, capacity]
        );
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const filterProps = {
        price,
        setPrice,
        types,
        capacities,
        priceRange,
        handleTypeChange,
        handleCapacityChange,
        pickupLocation,
        setPickupLocation,
        dropoffLocation,
        setDropoffLocation,
        pickupDate,
        setPickupDate,
        dropoffDate,
        setDropoffDate,
        selectedTypes,
        selectedCapacities
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto py-6 px-4"
        >
            {/* Mobile Filter Button */}
            <div className="md:hidden flex justify-end mb-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFilter}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    <FaFilter className="mr-2" />
                    {isFilterOpen ? "Close" : "Open"} Filters
                </motion.button>
            </div>

            <div className="flex flex-col md:flex-row gap-3 relative">
                {/* Desktop Filter */}
                <motion.div
                    variants={filterVariants}
                    className="hidden md:block w-64"
                >
                    <Filter {...filterProps} />
                </motion.div>

                {/* Mobile Filter Overlay */}
                <AnimatePresence>
                    {isFilterOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black z-40"
                                onClick={toggleFilter}
                            />
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25 }}
                                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
                            >
                                <Filter {...filterProps} onClose={toggleFilter} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <motion.div
                    layout
                    className="flex-1 flex flex-col items-center gap-5"
                >
                    <Filter_Date
                        pickupLocation={pickupLocation}
                        setPickupLocation={setPickupLocation}
                        dropoffLocation={dropoffLocation}
                        setDropoffLocation={setDropoffLocation}
                        pickupDate={pickupDate}
                        setPickupDate={setPickupDate}
                        dropoffDate={dropoffDate}
                        setDropoffDate={setDropoffDate}
                    />

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <Loader key="loader" />
                        ) : (
                            <motion.div
                                key="cars"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full"
                            >
                                <Cars cars={filteredCars} error={error} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default SectionCategories;