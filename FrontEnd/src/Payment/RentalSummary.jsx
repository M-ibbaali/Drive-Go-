import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

function RentalSummary({ car, error }) {
  const carDetails = car && car.length > 0 ? car[0] : null;
  const [loading, setLoading] = useState(true);
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (carDetails) {
      document.title = `DriveGo - Payment - ${carDetails.name}`;
    }
  }, [carDetails]);

  const applyPromo = () => {
    if (promoCode) {
      alert(`Promo code "${promoCode}" applied!`);
      setShowPromo(false);
    } else {
      alert("Please enter a valid promo code.");
    }
  };

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
            <button
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setShowPromo(true)}
            >
              Apply Promo Code
            </button>
            {showPromo && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 sm:p-12 rounded-lg shadow-lg relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
                  <button
                    className="absolute top-2 right-2 text-gray-500 rounded-full p-2 hover:bg-gray-200 transition duration-200"
                    onClick={() => setShowPromo(false)}
                  >
                    <MdClose size={24} /> {/* Close icon */}
                  </button>
                  <input
                    type="text"
                    className="p-2 mb-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={applyPromo}
                  >
                    Apply Code
                  </button>
                </div>
              </div>
            )}
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
