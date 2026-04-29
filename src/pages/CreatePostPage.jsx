/**
 * CREATE POST PAGE
 * 
 * This page allows users to create a new blog post.
 * It uses the BlogForm component which handles the form logic.
 */

import { Link } from 'react-router-dom';
import { BlogForm } from '../components';
import { useTheme } from '../context';

const CreatePostPage = () => {
  // Get theme state from Context
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className={`inline-flex items-center mb-8 px-4 py-2 rounded-lg transition-colors ${
            isDark 
              ? 'text-blue-400 hover:bg-gray-800' 
              : 'text-blue-600 hover:bg-gray-100'
          }`}
        >
          ← Back to Home
        </Link>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✍️</div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Create New Post
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Share your thoughts with the world
          </p>
        </div>

        {/* Form Card */}
        <div className={`rounded-2xl shadow-xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          {/* BlogForm component handles the actual form */}
          <BlogForm />
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
