/**
 * EDIT POST PAGE
 * 
 * This page allows users to edit an existing blog post.
 * It fetches the post data and passes it to BlogForm for editing.
 * 
 * URL PARAMETERS:
 * - id: The post ID to edit (e.g., /edit/123)
 */

import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from '../store/slices/blogSlice';
import { BlogForm } from '../components';
import { useTheme } from '../context';

const EditPostPage = () => {
  // Get post ID from URL
  const { id } = useParams();
  
  // Get post from Redux store
  const post = useSelector(selectPostById(id));
  
  // Get theme state from Context
  const { isDark } = useTheme();

  // Show message if post not found
  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-8xl mb-6">📭</div>
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Post Not Found
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The post you're trying to edit doesn't exist.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            ← Go back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <Link
          to={`/post/${id}`}
          className={`inline-flex items-center mb-8 px-4 py-2 rounded-lg transition-colors ${
            isDark 
              ? 'text-blue-400 hover:bg-gray-800' 
              : 'text-blue-600 hover:bg-gray-100'
          }`}
        >
          ← Back to Post
        </Link>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✏️</div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Edit Post
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Make changes to your post
          </p>
        </div>

        {/* Form Card */}
        <div className={`rounded-2xl shadow-xl p-8 ${isDark ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
          {/* Pass existing post to BlogForm for editing */}
          <BlogForm existingPost={post} />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
