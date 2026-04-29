/**
 * NOT FOUND PAGE (404)
 * 
 * This page is shown when user visits a URL that doesn't exist.
 * Configured in App.jsx with the "*" route.
 */

import { Link } from 'react-router-dom';
import { useTheme } from '../context';

const NotFoundPage = () => {
  // Get theme state from Context
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="text-center px-4">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <h1 className={`text-[150px] font-bold leading-none ${isDark ? 'text-gray-800' : 'text-gray-200'}`}>
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🔍</span>
          </div>
        </div>

        {/* Message */}
        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Page Not Found
        </h2>
        <p className={`mb-8 text-lg max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </p>
        
        {/* Home Link */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          <span>🏠</span>
          <span>Go to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
