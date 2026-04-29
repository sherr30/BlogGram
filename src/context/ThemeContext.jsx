/**
 * THEME CONTEXT
 * 
 * This Context provides theme (dark/light mode) state across the application.
 * 
 * CONTEXT API USAGE:
 * Context API is used here because:
 * 1. Theme is a cross-cutting concern (affects all UI components)
 * 2. Simple state toggle, doesn't need Redux complexity
 * 3. No need for Redux DevTools debugging
 * 
 * HOW IT WORKS:
 * 1. ThemeProvider wraps the app and provides theme state
 * 2. useTheme hook allows any component to access/change theme
 * 3. Theme is persisted to localStorage
 */

import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext(null);

/**
 * ThemeProvider Component
 * Wraps the app and provides theme state to all children
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // Apply theme class to document when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Check if current theme is dark
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 * Custom hook to access theme context in any component
 * 
 * Usage:
 * const { theme, toggleTheme, isDark } = useTheme();
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
