import React, { useState, useEffect } from "react";
import Car from "./Car";

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

    const intervalId = setInterval(fetchFavorites, 100);
    return () => clearInterval(intervalId);
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
    <>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="p-4">
        {cars.length === 0 ? (
          <div className="text-center text-gray-500">
            No cars match your filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cars.slice(0, visibleCount).map((car, index) => (
                <Car
                  key={index}
                  index={index}
                  car={car}
                  favorites={favorites}
                  handleFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>

            <div className="flex items-center justify-center mt-4">
              <button
                onClick={handleShowMore}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
              >
                Show more cars
              </button>
              <p className="ml-4 text-gray-700">
                {cars.length} car{cars.length > 1 ? "s" : ""}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cars;
