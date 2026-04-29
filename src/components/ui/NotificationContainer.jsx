/**
 * NOTIFICATION CONTAINER COMPONENT
 * 
 * This component renders toast notifications in the corner of the screen.
 * It reads from NotificationContext and displays all active notifications.
 */

import { useNotification } from '../../context';

/**
 * Get icon based on notification type
 */
const getIcon = (type) => {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    case 'warning':
      return '⚠';
    default:
      return 'ℹ';
  }
};

/**
 * Get background color classes based on notification type
 */
const getTypeStyles = (type) => {
  switch (type) {
    case 'success':
      return 'bg-green-500 dark:bg-green-600';
    case 'error':
      return 'bg-red-500 dark:bg-red-600';
    case 'warning':
      return 'bg-yellow-500 dark:bg-yellow-600';
    default:
      return 'bg-blue-500 dark:bg-blue-600';
  }
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            ${getTypeStyles(notification.type)}
            text-white px-6 py-4 rounded-lg shadow-lg
            flex items-center space-x-3
            animate-slide-up min-w-[280px] max-w-md
          `}
        >
          {/* Icon */}
          <span className="text-xl font-bold">
            {getIcon(notification.type)}
          </span>

          {/* Message */}
          <p className="flex-1 font-medium">{notification.message}</p>

          {/* Close Button */}
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
