import React, { useState, useEffect } from "react";
import RentalSummary from "./RentalSummary";
import BillingInfo from "./BillingInfo";
import RentalInfo from "./RentalInfo";
import PaymentMethod from "./PaymentMethod";
import Confirmation from "./Confirmation";
import { useParams } from "react-router-dom";

function Payment() {
  const { car } = useParams();
  const user = localStorage.getItem("userId");

  const [userData, setUserData] = useState([]);
  const [carData, setCarData] = useState([]);
  const [userError, setUserError] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [rentalError, setRentalError] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expirationDate: "",
    cardHolder: "",
    cvc: "",
    paypalEmail: "",
    paypalAmount: "",
    transactionId: "",
    bitcoinAddress: "",
    bitcoinAmount: "",
  });
  const [payError, setPayError] = useState(null);

  const [isTermsChecked, setIsTermsChecked] = useState("");

  // Fetch user data
  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `http://localhost/drive-go/BackEnd/Profile/profile.php?userID=${user}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          if (data.error) {
            throw new Error(data.error);
          }

          setUserData(data.data);
        } catch (error) {
          setUserError(error.message || "Something went wrong.");
        }
      };

      fetchUserData();
    }
  }, [user]);

  // Fetch car data
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(
          `http://localhost/drive-go/backend/cars/reservation.php?carID=${car}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Car data");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setCarData(data.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCarData();
  }, [car]);

  // Calculate total price
  const calculateTotalPrice = () => {
    const pricePerDay = carData.pricePerDay || 0;
    const rentalDays =
      (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 3600 * 24);
    return pricePerDay * rentalDays;
  };

  // Handle reservation
  const handleReservation = async () => {
    const totalPrice = calculateTotalPrice();

    const reservationData = {
      user_id: user,
      vehicle_id: car,
      start_date: pickupDate,
      end_date: dropoffDate,
      total_price: totalPrice,
    };

    try {
      const response = await fetch(
        "http://localhost/drive-go/backend/Reservation/addReservation.php",
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
        alert("Reservation successfully created!");
      } else {
        alert("Failed to create reservation: " + result.error);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Handle payment
  const handlePayment = async () => {
    let paymentDataToSend = {};

    if (paymentMethod === "creditCard") {
      paymentDataToSend = {
        method: "creditCard",
        cardNumber: paymentData.cardNumber,
        expirationDate: paymentData.expirationDate,
        cardHolder: paymentData.cardHolder,
        cvc: paymentData.cvc,
      };
    } else if (paymentMethod === "paypal") {
      paymentDataToSend = {
        method: "paypal",
        paypalEmail: paymentData.paypalEmail,
        amount: paymentData.paypalAmount,
        transactionId: paymentData.transactionId,
      };
    } else if (paymentMethod === "bitcoin") {
      paymentDataToSend = {
        method: "bitcoin",
        bitcoinAddress: paymentData.bitcoinAddress,
        amount: paymentData.bitcoinAmount,
      };
    }

    if (!paymentDataToSend.method) {
      setPayError("Please select a payment method.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/drive-go/backend/BankTest/payment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentDataToSend),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Payment successful!");
        handleNext();
      } else {
        setPayError("Payment failed: " + result.error);
      }
    } catch (error) {
      setPayError("Error processing payment: " + error.message);
    }
  };

  const validateStep = async () => {
    switch (step) {
      case 1:
        if (userData.length === 0 || carData.length === 0) {
          return false;
        }
        break;
      case 2:
        if (!pickupLocation) {
          setRentalError("Pick-Up Location is required !");
          return false;
        } else if (!pickupDate) {
          setRentalError("Pick-Up Date is required !");
          return false;
        } else if (!dropoffLocation) {
          setRentalError("Drop-Off Location is required !");
          return false;
        } else if (!dropoffDate) {
          setRentalError("Drop-Off Date is required !");
          return false;
        }
        break;
      case 3:
        if (!paymentMethod) {
          return false;
        }
        break;
      case 4:
        if (!isTermsChecked) {
          return false;
        }
        break;
      default:
        return true;
    }

    setPayError("");
    return true;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      if (step === 4) {
        await handleReservation();
        await handlePayment();
      } else {
        nextStep();
      }
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      {/* <div className="flex flex-row-reverse justify-between p-5">
                <RentalSummary
                    car={carData}
                    error={error}
                />
                <div className="w-2/3 flex flex-col items-start">
                    {step === 1 && <BillingInfo userData={userData}/>}
                    {step === 2 &&
                        <RentalInfo 
                            pickupLocation={pickupLocation}
                            setPickupLocation={setPickupLocation}
                            pickupDate={pickupDate}
                            setPickupDate={setPickupDate}
                            dropoffLocation={dropoffLocation}
                            setDropoffLocation={setDropoffLocation}
                            dropoffDate={dropoffDate}
                            setDropoffDate={setDropoffDate}
                            error={rentalError}
                            setError={setRentalError}
                        />
                    }
                    {step === 3 &&
                        <PaymentMethod
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            paymentData={paymentData}
                            setPaymentData={setPaymentData}
                        />}
                    {step === 4 &&
                        <Confirmation
                            handleReservation={handleReservation}
                        />}
                    <div className="flex gap-4 mt-4">
                        {step > 1 && <button onClick={prevStep} className="w-full p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">Back</button>}
                        {step < 4 && <button onClick={handleNext} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Next</button>}
                    </div>
                </div>
            </div> */}
      <div className="flex flex-col lg:flex-row-reverse lg:justify-between p-5 gap-5">
        <RentalSummary car={carData} error={error} />
        <div className="w-full lg:w-2/3 flex flex-col items-start">
          {step === 1 && <BillingInfo userData={userData} />}
          {step === 2 && (
            <RentalInfo
              pickupLocation={pickupLocation}
              setPickupLocation={setPickupLocation}
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              dropoffLocation={dropoffLocation}
              setDropoffLocation={setDropoffLocation}
              dropoffDate={dropoffDate}
              setDropoffDate={setDropoffDate}
              error={rentalError}
              setError={setRentalError}
            />
          )}
          {step === 3 && (
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentData={paymentData}
              setPaymentData={setPaymentData}
            />
          )}
          {step === 4 && <Confirmation handleReservation={handleReservation} />}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                onClick={handleNext}
                className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
