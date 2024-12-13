import { useState, useEffect } from "react";

function RentalInfo({
  pickupLocation,
  setPickupLocation,
  pickupDate,
  setPickupDate,
  dropoffLocation,
  setDropoffLocation,
  dropoffDate,
  setDropoffDate,
  error,
}) {
  const [pickupLocationValue, setPickupLocationValue] =
    useState(pickupLocation);
  const [dropoffLocationValue, setDropoffLocationValue] =
    useState(dropoffLocation);

  useEffect(() => {
    setPickupLocation(pickupLocationValue);
    setDropoffLocation(dropoffLocationValue);
  }, [
    pickupLocationValue,
    dropoffLocationValue,
    setPickupLocation,
    setDropoffLocation,
  ]);

  return (
    // <div className="w-full p-6 rounded-lg bg-white shadow-lg">
    //     <h1 className="text-2xl font-semibold text-gray-800 mb-2">Rental Info</h1>
    //     <p className="text-gray-500 mb-4 text-right">Step 2 of 4</p>

    //     <div className="mb-3 bg-gray-100 p-3 rounded-lg">
    //         <label className="flex items-center mb-3 p-3">
    //             <input
    //                 type="radio"
    //                 name="pickup"
    //                 value="pickup"
    //                 className="mr-2 border rounded-lg bg-gray-100 text-lg p-3"
    //                 checked
    //             />
    //             Pick-Up
    //         </label>

    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-3 rounded-lg mb-4">
    //             <div>
    //                 <label className="text-gray-700">Locations</label>
    //                 <select
    //                     className={`w-full p-3 border ${error === 'Pick-Up Location is required !' ? ('border-red-500') : ('')} rounded-lg text-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    //                     value={pickupLocationValue}
    //                     onChange={(e) => setPickupLocationValue(e.target.value)}
    //                 >
    //                     <option value="" selected disabled>Select your city</option>
    //                     <option value="City 1">City 1</option>
    //                     <option value="City 2">City 2</option>
    //                     <option value="City 3">City 3</option>
    //                 </select>
    //                 {error === 'Pick-Up Location is required !' && <p className="text-red-500 text-sm mt-2">{error}</p>}
    //             </div>

    //             <div>
    //                 <label className="text-gray-700">Date</label>
    //                 <input
    //                     type="date"
    //                     value={pickupDate}
    //                     onChange={(e) => setPickupDate(e.target.value)}
    //                     className={`w-full p-3 border ${error === 'Pick-Up Date is required !' ? ('border-red-500') : ('')} rounded-lg text-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    //                 />
    //                 {error === 'Pick-Up Date is required !' && <p className="text-red-500 text-sm mt-2">{error}</p>}
    //             </div>
    //         </div>
    //     </div>

    //     <div className="mb-3 bg-gray-100 p-3 rounded-lg">
    //         <label className="flex items-center mb-3 p-3">
    //             <input
    //                 type="radio"
    //                 name="dropoff"
    //                 value="dropoff"
    //                 className="mr-2 border rounded-lg bg-gray-100 text-lg p-3"
    //                 checked
    //             />
    //             Drop-Off
    //         </label>
    //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-3 rounded-lg">
    //             <div>
    //                 <label className="text-gray-700">Locations</label>
    //                 <select
    //                     className={`w-full p-3 border ${error === 'Drop-Off Location is required !' ? ('border-red-500') : ('')} rounded-lg text-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    //                     value={dropoffLocationValue}
    //                     onChange={(e) => setDropoffLocationValue(e.target.value)}
    //                 >
    //                     <option value="" selected disabled>Select your city</option>
    //                     <option value="City 1">City 1</option>
    //                     <option value="City 2">City 2</option>
    //                     <option value="City 3">City 3</option>
    //                 </select>
    //                 {error === 'Drop-Off Location is required !' && <p className="text-red-500 text-sm mt-2">{error}</p>}
    //             </div>

    //             <div>
    //                 <label className="text-gray-700">Date</label>
    //                 <input
    //                     type="date"
    //                     value={dropoffDate}
    //                     onChange={(e) => setDropoffDate(e.target.value)}
    //                     className={`w-full p-3 border ${error === 'Drop-Off Date is required !' ? ('border-red-500') : ('')} rounded-lg text-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    //                 />
    //                 {error === 'Drop-Off Date is required !' && <p className="text-red-500 text-sm mt-2">{error}</p>}
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <div className="w-full p-4 md:p-6 rounded-lg bg-white shadow-lg">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
        Rental Info
      </h1>
      <p className="text-gray-500 mb-4 text-right text-sm md:text-base">
        Step 2 of 4
      </p>

      <div className="mb-3 bg-gray-100 p-4 md:p-3 rounded-lg">
        <label className="flex items-center mb-3">
          <input
            type="radio"
            name="pickup"
            value="pickup"
            className="mr-2 border rounded-lg bg-gray-100 text-lg"
            checked
          />
          Pick-Up
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-3 rounded-lg mb-4">
          <div>
            <label className="text-gray-700 text-sm md:text-base">
              Locations
            </label>
            <select
              className={`w-full p-2 md:p-3 border ${
                error === "Pick-Up Location is required !"
                  ? "border-red-500"
                  : ""
              } rounded-lg text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              value={pickupLocationValue}
              onChange={(e) => setPickupLocationValue(e.target.value)}
            >
              <option value="" selected disabled>
                Select your city
              </option>
              <option value="City 1">City 1</option>
              <option value="City 2">City 2</option>
              <option value="City 3">City 3</option>
            </select>
            {error === "Pick-Up Location is required !" && (
              <p className="text-red-500 text-xs md:text-sm mt-2">{error}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 text-sm md:text-base">Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className={`w-full p-2 md:p-3 border ${
                error === "Pick-Up Date is required !" ? "border-red-500" : ""
              } rounded-lg text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {error === "Pick-Up Date is required !" && (
              <p className="text-red-500 text-xs md:text-sm mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mb-3 bg-gray-100 p-4 md:p-3 rounded-lg">
        <label className="flex items-center mb-3">
          <input
            type="radio"
            name="dropoff"
            value="dropoff"
            className="mr-2 border rounded-lg bg-gray-100 text-lg"
            checked
          />
          Drop-Off
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-3 rounded-lg">
          <div>
            <label className="text-gray-700 text-sm md:text-base">
              Locations
            </label>
            <select
              className={`w-full p-2 md:p-3 border ${
                error === "Drop-Off Location is required !"
                  ? "border-red-500"
                  : ""
              } rounded-lg text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              value={dropoffLocationValue}
              onChange={(e) => setDropoffLocationValue(e.target.value)}
            >
              <option value="" selected disabled>
                Select your city
              </option>
              <option value="City 1">City 1</option>
              <option value="City 2">City 2</option>
              <option value="City 3">City 3</option>
            </select>
            {error === "Drop-Off Location is required !" && (
              <p className="text-red-500 text-xs md:text-sm mt-2">{error}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 text-sm md:text-base">Date</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className={`w-full p-2 md:p-3 border ${
                error === "Drop-Off Date is required !" ? "border-red-500" : ""
              } rounded-lg text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {error === "Drop-Off Date is required !" && (
              <p className="text-red-500 text-xs md:text-sm mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentalInfo;
