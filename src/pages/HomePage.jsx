/**
 * HOME PAGE
 * 
 * This is the main page that displays all blog posts.
 * 
 * REDUX FLOW:
 * 1. useSelector reads filtered posts from Redux store
 * 2. Posts are displayed using BlogCard components
 * 3. SearchBar updates Redux state for filtering
 * 4. When user interacts (like/delete), BlogCard dispatches actions
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFilteredPosts, selectSearchQuery, selectCategory } from '../store/slices/blogSlice';
import { BlogCard, SearchBar } from '../components';
import { useTheme } from '../context';
import { PenIcon, InboxIcon } from '../components/ui/Icons';

const HomePage = () => {
  // Get theme state from Context
  const { isDark } = useTheme();
  
  // Track if user is a first-time visitor
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);
  
  // Read filtered posts from Redux store using selector
  const filteredPosts = useSelector(selectFilteredPosts);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectCategory);
  
  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedCategory !== 'All';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className={`${isDark ? 'bg-gradient-to-r from-purple-900 to-violet-900' : 'bg-gradient-to-r from-purple-500 to-violet-500'} text-white py-20 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Welcome to BlogGram
          </h1>
          <p className="text-xl text-purple-100 mb-10 animate-slide-up">
            Share your thoughts, discover amazing stories, and connect with writers worldwide
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            <PenIcon className="w-5 h-5" />
            <span>{isFirstVisit ? 'Create Your First Post' : 'Create New Post'}</span>
          </Link>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 transition-colors duration-300`}>
          <SearchBar />
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {hasActiveFilters ? 'Search Results' : 'All Posts'} 
            <span className="text-blue-500 ml-2">({filteredPosts.length})</span>
          </h2>
          
          {hasActiveFilters && (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Showing posts matching your filters
            </p>
          )}
        </div>

        {/* Check if there are posts */}
        {filteredPosts.length > 0 ? (
          // Display posts in a grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          // Show message when no posts exist
          <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <InboxIcon className={`w-20 h-20 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 text-lg`}>
              {hasActiveFilters 
                ? 'No posts match your search. Try different keywords or clear filters.'
                : 'No posts yet. Be the first to share your thoughts!'}
            </p>
            <Link
              to="/create"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Post
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
