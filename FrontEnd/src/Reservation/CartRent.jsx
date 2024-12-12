import React, { useState, useEffect } from 'react';
import { FaHeart, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import Reviews from './Reviews';
import RecentCars from './RecentsCar';
import RecommandCar from '../Home/RecommandCar';

function CarRentalDashboard() {
  const { car } = useParams();
  const [carData, setCarData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  
  // Additional state for fetching more data
  const [types, setTypes] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [priceRange, setPriceRange] = useState({});

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost/drive-go/backend/cars/reservation.php?carID=${car}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Car data");
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setCarData(data.data[0]);
        setTypes(data.types || []);
        setCapacities(data.capacities || []);
        setPriceRange({
          ...data.priceRange,
          min_price: parseFloat(data.priceRange?.min_price || 0),
          max_price: parseFloat(data.priceRange?.max_price || 1000)
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCarData();
  }, [car]);

  const handleFavoriteToggle = () => {
    setFavorites(!favorites);
  };

  const nextImage = () => {
    if (carData) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % [carData.first_img, carData.second_img, carData.third_img].length
      );
    }
  };

  const prevImage = () => {
    if (carData) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? 2 : prevIndex - 1
      );
    }
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const images = carData 
    ? [carData.first_img, carData.second_img, carData.third_img] 
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !carData) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error || "No car data available"}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen  px-4 sm:px-6 lg:px-2">
      <div className="max-w-7xl mx-auto" >
        <div className="space-y-8 "   >
          {/* Car Details Section */}
          <div className="bg-white shadow-sm rounded-xl overflow-hidden flex flex-col lg:flex-row py-12 px-3">
            {/* Image Gallery */}
            <div className="lg:w-1/2" >
              <div className="relative">
                <img 
                  src={images[currentImageIndex]} 
                  alt={carData.name} 
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={toggleFullscreen}
                />
                <button 
                  onClick={prevImage} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </div>
              <div className="flex justify-center py-2">
                {images.map((_, index) => (
                  <span 
                    key={index} 
                    className={`h-2 w-2 mx-1 rounded-full ${
                      index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Car Info Section */}
            <div className="lg:w-1/2 px-8 py-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{carData.name}</h1>
                  <div className="flex items-center mt-2 text-blue-500">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar key={i} />
                    ))}
                    <span className="text-gray-600 ml-2 text-sm">(24+ reviews)</span>
                  </div>
                </div>
                <FaHeart 
                  onClick={handleFavoriteToggle}
                  className={`text-3xl cursor-pointer ${
                    favorites ? 'text-red-500' : 'text-gray-300'
                  }`}
                />
              </div>

              <p className="text-gray-600">{carData.description}</p>

              <div className="grid grid-cols-3 gap-3">
                {[{ label: 'Type', value: carData.type },
                   { label: 'Capacity', value: `${carData.passengers} People` },
                   { label: 'Transmission', value: carData.gear },
                   { label: 'Fuel', value: carData.type_gas },
                   { label: 'Fuel Capacity', value: carData.gas_capacity }
                ].map((detail, index) => (
                  <div key={index} className="bg-blue-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-500">{detail.label}</p>
                    <p className="font-semibold text-blue-700">{detail.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-600">${carData.price}<span className="text-sm">/day</span></p>
                  <p className="text-gray-500 line-through">${parseFloat(carData.price) + 50}/day</p>
                </div>
                <Link to={`/payment/${carData.vehicle_id}`}>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Rent Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <Reviews id={car} />
        </div>

        {/* Sidebar with Recent and Recommended Cars */}
        <div className="space-y-8">
          <RecentCars />
          <RecommandCar />
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={toggleFullscreen}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={images[currentImageIndex]} 
              alt={carData.name}
              className="max-w-full max-h-full object-contain"
            />
            <button 
              onClick={prevImage} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 text-white p-3 rounded-full"
            >
              <FaChevronRight />
            </button>
            <button 
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 text-white text-3xl"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarRentalDashboard;
