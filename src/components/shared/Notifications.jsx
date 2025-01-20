import { useEffect, useRef, useState } from "react";
import useNotifications from "../../hooks/useNotifications";
import NotificationModal from "../modal/NotificationModal";
import Loading from "../Loading";
import { IoNotifications } from "react-icons/io5";



// eslint-disable-next-line react/prop-types
const Notifications = ({ userEmail }) => {
  const {
    data: notifications = [],
    isLoading,
    error,
  } = useNotifications(userEmail);
 
  const lastNotificationRef = useRef(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isNewNotification, setIsNewNotification] = useState(false);

 useEffect(() => {
  if (notifications.length > 0) {
    const latestNotification = notifications[0];
  
    // Check if the latest notification is new
    if (lastNotificationRef.current !== latestNotification?._id) {
      setIsNewNotification(true); // Mark as new notification
    }
  }
}, [notifications]);

  if (isLoading) return <Loading/>;
  if (error) return console.log("error in notification modal", error);
  
  const openModal = () => {
   
    setIsModalOpen(true);
    setIsNewNotification(false); // Mark notifications as "seen"
    if (notifications.length > 0) {
      lastNotificationRef.current = notifications[0]?._id; // Update the last seen notification
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
    <button
      className=""
      onClick={openModal}
    >
      <div className="indicator text-2xl">
      <IoNotifications />
        <span className={`h-2 w-2 rounded-full ${isNewNotification?"bg-green-600":"bg-none"}`}></span>
      </div>
    </button>

    <NotificationModal notifications={notifications} isModalOpen={isModalOpen} closeModal={closeModal}/>
    </>
  );
};

export default Notifications;
