/**
 * HEADER COMPONENT
 * 
 * This is the navigation header shown on all pages.
 * Contains the logo, navigation links, and theme toggle.
 * 
 * CONTEXT API USAGE:
 * Uses useTheme hook to access and toggle dark/light mode
 */

import { Link } from 'react-router-dom';
import { useTheme } from '../../context';
import { BlogIcon, SunIcon, MoonIcon, PlusIcon, HomeIcon } from '../ui/Icons';

const Header = () => {
  // Get theme state and toggle function from Context
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-900 dark:via-violet-900 dark:to-indigo-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo - Links to home page */}
          <Link to="/" className="flex items-center space-x-2">
            <BlogIcon className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">BlogGram</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            <Link
              to="/create"
              className="flex items-center space-x-1 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Create Post</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
