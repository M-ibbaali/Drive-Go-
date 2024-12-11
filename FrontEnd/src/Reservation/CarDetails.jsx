import { useState, useEffect } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

function CarDetails({ car, error }) {
  const carDetails = car && car.length > 0 ? car[0] : null;
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (carDetails) {
      setMainImage(carDetails.first_img);
      document.title = `DriveGo - Reservation - ${carDetails.name}`;
    }
  }, [carDetails]);

  const handleFavoriteToggle = () => {
    setFavorites(!favorites);
  };

  const handleImageClick = (img) => {
    setMainImage(img);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && fullscreen) {
        setFullscreen(false);
      }
    };

    if (fullscreen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreen]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6">
      {!car || car.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-blue-500"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            {" "}
            {/* Added gap between sections */}
            {/* Left Section: Images */}
            <div className="w-full md:w-1/2 space-y-6">
              {" "}
              {/* Added space between images */}
              <img
                src={mainImage}
                alt={carDetails.name}
                className="w-full rounded-lg cursor-pointer"
                onClick={toggleFullscreen}
              />
              <div className="flex space-x-4">
                {" "}
                {/* Increased spacing between images */}
                <img
                  src={carDetails.first_img}
                  alt={carDetails.name}
                  className="w-1/3 rounded-lg cursor-pointer hover:opacity-80"
                  onClick={() => handleImageClick(carDetails.first_img)}
                />
                <img
                  src={carDetails.second_img}
                  alt={carDetails.name}
                  className="w-1/3 rounded-lg cursor-pointer hover:opacity-80"
                  onClick={() => handleImageClick(carDetails.second_img)}
                />
                <img
                  src={carDetails.third_img}
                  alt={carDetails.name}
                  className="w-1/3 rounded-lg cursor-pointer hover:opacity-80"
                  onClick={() => handleImageClick(carDetails.third_img)}
                />
              </div>
            </div>
            {/* Right Section: Details */}
            <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6 space-y-4">
              {" "}
              {/* Added spacing between details */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center justify-between">
                {carDetails.name}
                <FaHeart
                  onClick={handleFavoriteToggle}
                  className={`${
                    favorites ? "text-red-600" : "text-gray-500"
                  } text-2xl ml-3 cursor-pointer`}
                />
              </h1>
              <div className="flex items-center gap-2">
                {" "}
                {/* Added gap between stars and reviews */}
                {[...Array(5)].map((_, index) => (
                  <AiFillStar key={index} className="text-yellow-500 text-xl" />
                ))}
                <span className="text-gray-600">24+ reviews</span>
              </div>
              <p className="text-gray-500">{carDetails.description}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                {" "}
                {/* Added gap between spans */}
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {carDetails.type}
                </span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Capacity: {carDetails.passengers} Person
                </span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {carDetails.gear}
                </span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {carDetails.type_gas}
                </span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {carDetails.gas_capacity}
                </span>
              </div>
              <p className="text-2xl font-bold mt-6">${carDetails.price}/day</p>
              <Link to={`/payment/${carDetails.vehicle_id}`}>
                <button className="bg-blue-500 text-white px-6 py-3 mt-4 rounded-lg">
                  Rent Now
                </button>
              </Link>
            </div>
          </div>

          {/* Fullscreen Mode */}
          {fullscreen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <img
                src={mainImage}
                alt={carDetails.name}
                className="max-w-full max-h-full cursor-pointer"
              />
              <FaTimes
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CarDetails;
