import React, { useState, useEffect } from "react";
import { FaStar, FaTimes } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Confirmation({ userData, carData, isTermsChecked, setIsTermsChecked, isMarketingChecked, setIsMarketingChecked, pickupDate, dropoffDate, accountNumber }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [alertt, setAlert] = useState({ message: "", type: "" })
  const [showReviewWindow, setShowReviewWindow] = useState(false)
  const [resrvationId, setReservationId] = useState(0)
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const navigate = useNavigate()

  const handleCloseReviewWindow = () => {
    setShowReviewWindow(false);
    navigate('/');
  };

  const handleRentNowClick = async () => {
    if (!isTermsChecked) {
      setAlert({ message: "You must agree to the terms and conditions to proceed.", type: "error" })
      return;
    }
    if (!isMarketingChecked) {
      setAlert({ message: "You must agree to marketing emails to proceed.", type: "error" });
      return;
    }
    
    try {
      const paymentSuccess = await handlePayment()
      if (paymentSuccess) {
        await handleReservation();
        setAlert({ message: "Reservation and payment completed successfully!", type: "success" });
      }
    } catch (error) {
      setAlert({ message: `An error occurred: ${error.message}`, type: "error" });
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const price = carData[0].price || 0;
    const rentalDays = (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 3600 * 24);
    setTotalPrice(price * rentalDays);
  };
  
  useEffect(() => {
    if (pickupDate && dropoffDate) {
      calculateTotalPrice();
    }
  }, [pickupDate, dropoffDate]);

  useEffect(() => {
    if (alertt.message) {
      const timer = setTimeout(() => {
        setAlert({ message: "", type: "" });
        if (alertt.type === "success" && alertt.message === "Reservation and payment completed successfully!") {
          setShowReviewWindow(true)
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertt.message]);

  // Handle reservation
  const handleReservation = async () => {
    const reservationData = {
      user_id: userData.user_id,
      vehicle_id: carData[0].vehicle_id,
      start_date: pickupDate,
      end_date: dropoffDate,
      total_price: totalPrice,
    };

    try {
      const response = await fetch("http://localhost/drive-go/backend/Reservation/addReservation.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      const result = await response.json();

      if (result.success) {
        setReservationId(result.reservation_id);
      } else {
        setAlert({ message: "Failed to create reservation: " + result.error, type: "error" });
      }
    } catch (error) {
      setAlert({ message: "Error: " + error.message, type: "error" });
    }
  };

  // Handle payment
  const handlePayment = async () => {
    const paymentData = {
      account_number: accountNumber,
      amount: totalPrice,
    };
  
    try {
        const response = await fetch("http://localhost/drive-go/backend/Reservation/transaction.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentData),
            }
        );
    
        const result = await response.json();
    
        if (result.success) {
          return true;
        } else {
          setAlert({ message: `Payment failed: ${result.error}`, type: "error" });
          return false;
        }
    } catch (error) {
      setAlert({ message: `Error during payment: ${error.message}`, type: "error" });
      return false;
    }
  };

  const submitReview = async () => {
    if (!rating) {
      setAlert({ message: "Please provide a rating before submitting your review.", type: "error" });
      return;
    }
  
    const reviewData = {
      reservation_id: resrvationId,
      user_id: userData.user_id,
      rating: rating,
      comment: reviewComment,
    };
  
    try {
      const response = await fetch("http://localhost/drive-go/backend/Reservation/review.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setAlert({ message: "Thank you for your feedback!", type: "success" });
      } else {
        setAlert({ message: "Failed to submit review: " + result.error, type: "error" });
      }
    } catch (error) {
      setAlert({ message: `Error: ${error.message}`, type: "error" });
    }
  
    setShowReviewWindow(false);
    setTimeout(() => {
      navigate('/')
    }, 3000);
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto p-6 rounded-lg bg-white shadow-lg">
        {alertt.message && (
          <div
            className={`fixed z-50 top-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg ${alertt.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            {alertt.message}
          </div>
        )}
        <p className="text-gray-500 mb-4 text-right text-sm md:text-base">
          Step 4 of 4
        </p>
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
          Confirmation
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-4">
          We are getting to the end. Just a few clicks and your rental is ready!
        </p>

        <label className="flex items-center mb-3 text-sm md:text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={isMarketingChecked}
            onChange={(e) => setIsMarketingChecked(e.target.checked)}
          />
          I agree with sending marketing
          and newsletter emails. No spam, promised!
        </label>
        <label className="flex items-center mb-4 text-sm md:text-base">
          <input
            type="checkbox"
            className="mr-2"
            checked={isTermsChecked}
            onChange={(e) => setIsTermsChecked(e.target.checked)}
          />
          I agree with the terms and
          conditions and privacy policy.
        </label>

        <button
          onClick={handleRentNowClick}
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm md:text-base"
        >
          Rent Now
        </button>
        <h3 className="text-base md:text-lg font-semibold text-gray-700 mt-4">
          All your data are safe
        </h3>
        <p className="text-xs md:text-sm text-gray-500">
          We are using the latest encryption technology to keep your data secure!
        </p>
      </div>
      
      {showReviewWindow && (
        <div className="review-window fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleCloseReviewWindow}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">We Value Your Feedback!</h2>
            <p className="text-sm text-gray-600 mb-4">Rate your experience with us:</p>
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`cursor-pointer ${star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
            <textarea
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Write your review here..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
            <button onClick={submitReview} className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Submit Review
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Confirmation;
