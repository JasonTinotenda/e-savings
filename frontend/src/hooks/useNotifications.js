import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, variant = 'success') => {
    const id = new Date().getTime(); // Unique ID based on timestamp
    setNotifications((prev) => [...prev, { id, message, variant }]);

    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  const notifySuccess = (message) => addNotification(message, 'success');
  const notifyError = (message) => addNotification(message, 'danger');

  return {
    notifySuccess,
    notifyError,
    NotificationContainer: () => (
      <ToastContainer position="top-end" className="p-3">
        {notifications.map((notif) => (
          <Toast key={notif.id} bg={notif.variant} onClose={() => setNotifications((prev) => prev.filter((n) => n.id !== notif.id))}>
            <Toast.Body>{notif.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    ),
  };
};
