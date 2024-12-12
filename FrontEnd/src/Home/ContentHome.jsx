import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import car1 from "../../public/car2.webp";
import car2 from "../../public/car3.webp";

function ContentHome() {
  // Define the animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  return (
    <div className="flex justify-center items-center my-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-5 ">
        <motion.div
          className="bg-blue-600 flex flex-col lg:w-1/2 p-6 sm:p-8 rounded-lg"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
            <motion.div
              variants={contentVariants}
              className="text-center lg:text-left w-full lg:w-1/2 mb-4 lg:mb-0"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-white">
                The Best Platform for Car Rental
              </h2>
              <p className="text-base sm:text-lg text-white mb-4">
                Ease of doing a car rental safely and reliably. Of course at a
                low price.
              </p>
              <motion.div
                variants={buttonVariants}
                className="flex justify-center lg:justify-start"
              >
                <Link to="reservation">
                  <button className="mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-full transition-colors duration-300">
                    Rental Car
                  </button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.img
              src={car1}
              alt="Car 1"
              className="w-1/2 sm:w-2/5 lg:w-1/2 object-contain mb-4 lg:mb-0"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-blue-600 flex flex-col lg:w-1/2 p-6 sm:p-8 rounded-lg"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
            <motion.div
              variants={contentVariants}
              className="text-center lg:text-left w-full lg:w-1/2 mb-4 lg:mb-0"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 text-white">
                Easy way to rent a car at a low price
              </h2>
              <p className="text-base sm:text-lg text-white mb-4">
                Providing cheap car rental services and safe and comfortable
                facilities.
              </p>
              <motion.div
                variants={buttonVariants}
                className="flex justify-center lg:justify-start"
              >
                <Link to="reservation">
                  <button className="mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-blue-400 hover:bg-blue-300 text-white rounded-full transition-colors duration-300">
                    Rental Car
                  </button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.img
              src={car2}
              alt="Car 2"
              className="w-1/2 sm:w-2/5 lg:w-1/2 object-contain mb-4 lg:mb-0"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContentHome;
