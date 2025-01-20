import  { useEffect } from "react";


import useNotifications from "../../hooks/useNotifications";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


const MySwal = withReactContent(Swal);

// eslint-disable-next-line react/prop-types
const Notifications = ({ userEmail }) => {
  const { data: notifications = [], isLoading, error } = useNotifications(userEmail);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0]; 
      MySwal.fire({
        title: "New Notification",
        text: latestNotification?.message,
        icon: "info",
        showConfirmButton: false,
        timer: 10000, 
        allowOutsideClick: true,
        didOpen: () => {
          console.log("Notification Popup Opened");
        },
        didClose: () => {
          console.log("Notification Popup Closed");
        },
      })
    }
  }, [notifications]);

  if (isLoading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications!</p>;

  return (
    <button
    className="bg-green-600"
      onClick={() =>
        MySwal.fire({
          title: "Notifications",
          html: notifications.length
            ? notifications
                .map(
                  (notification) =>
                    `<p><b>${notification.message}</b><br><small>${new Date(
                      notification.time
                    ).toLocaleString()}</small></p>`
                )
                .join("<hr>")
            : "No notifications available.",
          icon: "info",
          showCloseButton: true,
          confirmButtonText: "Close",
        })
      }
    >
      Notifications ({notifications.length})
    </button>
  );
};

export default Notifications;
