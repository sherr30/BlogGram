/**
 * NOTIFICATION CONTEXT
 * 
 * This Context provides toast notification functionality across the application.
 * 
 * CONTEXT API USAGE:
 * Context API is used here because:
 * 1. Notifications are a cross-cutting UI concern
 * 2. Transient state that doesn't need persistence
 * 3. Simple logic that doesn't benefit from Redux DevTools
 * 
 * HOW IT WORKS:
 * 1. NotificationProvider wraps the app and manages notification state
 * 2. useNotification hook provides showNotification function
 * 3. NotificationContainer renders the actual toast messages
 */

import { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const NotificationContext = createContext(null);

/**
 * NotificationProvider Component
 * Wraps the app and manages notification state
 */
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /**
   * Show a new notification
   * @param {string} message - The notification message
   * @param {string} type - 'success' | 'error' | 'info' | 'warning'
   * @param {number} duration - How long to show (ms), default 3000
   */
  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    
    const newNotification = {
      id,
      message,
      type,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  /**
   * Remove a notification by ID
   */
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

/**
 * useNotification Hook
 * Custom hook to access notification context in any component
 * 
 * Usage:
 * const { showNotification } = useNotification();
 * showNotification('Post created!', 'success');
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
