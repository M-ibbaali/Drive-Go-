import React from "react";
import { Calendar, MapPin } from "lucide-react";

const Filter_Date = ({
  pickupDate,
  dropoffDate,
  pickupLocation,
  dropoffLocation,
  onPickupDateChange,
  onDropoffDateChange,
  onPickupLocationChange,
  onDropoffLocationChange,
}) => {
  const moroccanCities = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Fès",
    "Tanger",
    "Agadir",
  ];

  // Format today's date to YYYY-MM-DD for min date validation
  const today = new Date().toISOString().split("T")[0];

  // Handle pickup date change
  const handlePickupDateChange = (e) => {
    const newPickupDate = e.target.value;
    onPickupDateChange(newPickupDate);

    // If dropoff date is before new pickup date, clear it
    if (dropoffDate && newPickupDate > dropoffDate) {
      onDropoffDateChange("");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pickup Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Pick-up Location
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
              value={pickupLocation}
              onChange={(e) => onPickupLocationChange(e.target.value)}
            >
              <option value="">Select city</option>
              {moroccanCities.map((city) => (
                <option key={`pickup-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        {/* Pickup Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Pick-up Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
              value={pickupDate}
              onChange={handlePickupDateChange}
              min={today}
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        {/* Dropoff Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Drop-off Location
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
              value={dropoffLocation}
              onChange={(e) => onDropoffLocationChange(e.target.value)}
            >
              <option value="">Select city</option>
              {moroccanCities.map((city) => (
                <option key={`dropoff-${city}`} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        {/* Dropoff Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Drop-off Date
          </label>
          <div className="relative">
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pl-10"
              value={dropoffDate}
              onChange={(e) => onDropoffDateChange(e.target.value)}
              min={pickupDate || today}
              
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        
      </div>

      {/* Filter Summary */}
      {/* <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {pickupLocation && (
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="font-medium">From:</span>
              <span className="ml-2">{pickupLocation}</span>
            </div>
          )}
          {pickupDate && (
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="font-medium">Pickup:</span>
              <span className="ml-2">
                {new Date(pickupDate).toLocaleDateString()}
              </span>
            </div>
          )}
          {dropoffLocation && (
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="font-medium">To:</span>
              <span className="ml-2">{dropoffLocation}</span>
            </div>
          )}
          {dropoffDate && (
            <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="font-medium">Dropoff:</span>
              <span className="ml-2">
                {new Date(dropoffDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Filter_Date;
