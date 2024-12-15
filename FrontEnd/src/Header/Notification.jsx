import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";

function Notification() {
  const user = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost/drive-go/BackEnd/Notifications/notification.php?userID=${user}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (data.notifications) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const handleNotificationClick = async (notification) => {
    await fetch(
      `http://localhost/drive-go/BackEnd/Notifications/markAsRead.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId: notification.notification_id }),
      }
    );

    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.notification_id === notification.notification_id
          ? { ...notif, status: true }
          : notif
      )
    );
    setSelectedNotification(notification);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // <>
    //     <div onClick={toggleMenu} className="relative p-2 border rounded-full cursor-pointer">
    //         <FaBell className="w-4 h-4 text-gray-700 cursor-pointer hover:text-blue-500" />
    //         {notifications.length > 0 && (<span className="absolute top-0 -right-1 inline-block w-4 h-4 bg-red-500 rounded-full text-xs text-white text-center">{notifications.length}</span>)}
    //     </div>
    //     {isOpen && (
    //         <div ref={menuRef} className="bg-white w-[15%] absolute right-36 top-14 border border-gray-200 rounded-lg shadow-lg">
    //             <ul className={`py-1 ${notifications.length > 5 ? 'max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent rounded-lg' : ''}`}>
    //                 {notifications.length > 0 ? (
    //                     notifications.map((notification, index) => (
    //                         <li
    //                             key={index}
    //                             onClick={() => handleNotificationClick(notification)}
    //                             className={`px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer ${notification.status === 'Unread' ? 'font-bold' : ''}`}
    //                         >
    //                             {notification.message.slice(0, 20)}{notification.message.length > 10 ? '...' : ''}
    //                             {notification.status === 'Unread' && (
    //                                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    //                             )}
    //                         </li>
    //                     ))
    //                 ) : (
    //                     <li className="px-4 py-2 text-gray-800 cursor-pointer">No notifications</li>
    //                 )}
    //             </ul>
    //         </div>
    //     )}
    //     {selectedNotification && (
    //         <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
    //             <div className="bg-white p-4 rounded-lg shadow-lg w-[400px]">
    //                 <h3 className="text-lg font-semibold">Notification</h3>
    //                 <p>{selectedNotification.message}</p>
    //                 <button
    //                     onClick={() => setSelectedNotification(null)}
    //                     className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
    //                 >
    //                     Close
    //                 </button>
    //             </div>
    //         </div>
    //     )}
    // </>
    <>
      <div
        onClick={toggleMenu}
        className="relative p-2 border rounded-full cursor-pointer"
      >
        <FaBell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 cursor-pointer hover:text-blue-500" />
        {notifications.length > 0 && (
          <span className="absolute top-0 -right-1 inline-block w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-xs text-white text-center">
            {notifications.length}
          </span>
        )}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="bg-white sm:w-48 md:w-64 absolute right-4 sm:right-10 md:right-36 top-14 border border-gray-200 rounded-lg shadow-lg"
        >
          <ul
            className={`py-1 ${
              notifications.length > 5
                ? "max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent rounded-lg"
                : ""
            }`}
          >
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  onClick={() => handleNotificationClick(notification)}
                  className={`px-4 py-2 text-sm sm:text-base text-gray-800 hover:bg-gray-100 cursor-pointer ${
                    notification.status === "Unread" ? "font-bold" : ""
                  }`}
                >
                  {notification.message.slice(0, 20)}
                  {notification.message.length > 10 ? "..." : ""}
                  {notification.status === "Unread" && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm sm:text-base text-gray-800 cursor-pointer">
                No notifications
              </li>
            )}
          </ul>
        </div>
      )}
      {selectedNotification && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
            <h3 className="text-lg font-semibold">Notification</h3>
            <p>{selectedNotification.message}</p>
            <button
              onClick={() => setSelectedNotification(null)}
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
