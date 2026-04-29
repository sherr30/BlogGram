/**
 * COMPONENTS INDEX
 * 
 * This file exports all components from a single location.
 * This makes imports cleaner in other files.
 * 
 * Example usage:
 * import { Header, BlogCard } from './components';
 */

// Layout Components - Used for page structure
export { default as Header } from './layout/Header';
export { default as Footer } from './layout/Footer';

// Blog Components - Used for blog functionality
export { default as BlogCard } from './blog/BlogCard';
export { default as BlogForm } from './blog/BlogForm';
export { default as SearchBar } from './blog/SearchBar';

// UI Components - Generic UI elements
export { default as NotificationContainer } from './ui/NotificationContainer';

// Utility Components
export { default as ScrollToTop } from './ScrollToTop';
