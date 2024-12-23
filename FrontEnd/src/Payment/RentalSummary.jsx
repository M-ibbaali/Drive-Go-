import { useState, useEffect } from "react";

function RentalSummary({ car, error }) {
  const carDetails = car && car.length > 0 ? car[0] : null;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (carDetails) {
      document.title = `DriveGo - Payment - ${carDetails.name}`;
    }
  }, [carDetails]);

  return (
    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-4 sm:p-5 rounded-lg bg-white shadow-lg mx-auto sm:ml-5">
      {!car || car.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <div
            className="flex items-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Rental Summary
          </h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Prices may change depending on the length of the rental and the
            price of your rental car.
          </p>
          <img
            src={carDetails.first_img}
            alt="Car"
            className="w-full max-w-xs sm:max-w-sm rounded-md mb-4 mx-auto"
          />

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {carDetails.name}
            </h3>
            <p className="text-yellow-500">⭐ 440+ Reviewer</p>
          </div>
          <hr className="my-4" />

          <div className="text-gray-700">
            <p className="mb-2">${carDetails.price}</p>
            <p className="mb-2">Tax: $00.00</p>
            <strong className="block text-lg mt-4">
              Total Rental Price: ${carDetails.price}/day
            </strong>
          </div>
        </>
      )}
    </div>
  );
}

export default RentalSummary;
