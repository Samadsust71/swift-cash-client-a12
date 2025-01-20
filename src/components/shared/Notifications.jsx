import { useEffect, useRef } from "react";

import useNotifications from "../../hooks/useNotifications";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);

// eslint-disable-next-line react/prop-types
const Notifications = ({ userEmail }) => {
  const {
    data: notifications = [],
    isLoading,
    error,
  } = useNotifications(userEmail);
  const lastNotificationRef = useRef(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0];

      // Check if the latest notification is new
      if (lastNotificationRef.current !== latestNotification?.id) {
        lastNotificationRef.current = latestNotification?.id; // Update the last shown notification

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
        });
      }
    }
  }, [notifications]);

  if (isLoading) return <p>Loading notifications...</p>;
  if (error) return <p>Error loading notifications!</p>;

  return (
    <button
      className="btn btn-ghost btn-circle"
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
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  );
};

export default Notifications;
