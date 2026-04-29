/**
 * CONTEXT INDEX
 * 
 * This file exports all context providers and hooks from a single location.
 * 
 * Example usage:
 * import { ThemeProvider, useTheme, NotificationProvider, useNotification } from './context';
 */

// Theme Context - For dark/light mode
export { ThemeProvider, useTheme } from './ThemeContext';

// Notification Context - For toast notifications
export { NotificationProvider, useNotification } from './NotificationContext';
