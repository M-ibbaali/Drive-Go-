import React, { useState, useEffect } from "react";
import Car from "./Car";
import { motion, AnimatePresence } from "framer-motion";

function Cars({ cars, error }) {
  const [favorites, setFavorites] = useState([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ message: "", type: "" }), 2000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost/drive-go/BackEnd/Favorite/favorite.php?userID=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        if (!data.error) {
          const favoriteIds = data.data.map((fav) => fav.vehicle_id);
          setFavorites(cars.map((car) => favoriteIds.includes(car.vehicle_id)));
        }
      } catch (error) {
        setAlert({
          message: "Something went wrong. Please try again.",
          type: "error",
        });
      }
    };

    fetchFavorites();
  }, [cars]);

  const handleFavoriteToggle = async (index, vehicleId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setAlert({
        message: "Please log in to manage your favorites.",
        type: "error",
      });
      return;
    }

    try {
      const isFavorite = favorites[index];
      const url = isFavorite
        ? "http://localhost/drive-go/BackEnd/Favorite/removeFavorite.php"
        : "http://localhost/drive-go/BackEnd/Favorite/addFavorite.php";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, vehicle_id: vehicleId }),
      });

      const result = await response.json();
      if (result.error) {
        setAlert({ message: result.error, type: "error" });
      } else {
        setFavorites((prevFavorites) =>
          prevFavorites.map((favorite, i) =>
            i === index ? !favorite : favorite
          )
        );
        setAlert({
          message: "Favorites updated successfully.",
          type: "success",
        });
      }
    } catch (error) {
      setAlert({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, cars.length));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong className="font-bold">Error: </strong>
          <span>{error}</span>
        </div>
      )}

      {alert.message && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            alert.type === "error" 
              ? "bg-red-500 text-white" 
              : "bg-green-500 text-white"
          }`}
        >
          {alert.message}
        </motion.div>
      )}

      {cars.length === 0 ? (
        <div className="text-center text-gray-500 text-2xl">
          No cars match your filters.
        </div>
      ) : (
        <>
          <AnimatePresence>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {cars.slice(0, visibleCount).map((car, index) => (
                <motion.div
                  key={car.vehicle_id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Car
                    index={index}
                    car={car}
                    favorites={favorites}
                    handleFavoriteToggle={handleFavoriteToggle}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center mt-8">
            {visibleCount < cars.length && (
              <button
                onClick={handleShowMore}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-300 flex items-center"
              >
                Show More Cars
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            )}
            <p className="ml-4 text-gray-700">
              {cars.length} car{cars.length > 1 ? "s" : ""} available
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cars;