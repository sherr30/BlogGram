/**
 * POST DETAIL PAGE
 * 
 * This page displays a single blog post with all its details.
 * Users can like, edit, or delete the post from here.
 * 
 * URL PARAMETERS:
 * - id: The post ID from the URL (e.g., /post/123)
 * 
 * REDUX + CONTEXT FLOW:
 * 1. useParams gets the post ID from URL
 * 2. useSelector reads the specific post from Redux store
 * 3. User actions (like/delete) dispatch Redux actions
 * 4. Context API provides theme and notifications
 */

import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostById, likePost, unlikePost, deletePost } from '../store/slices/blogSlice';
import { useTheme, useNotification } from '../context';
import { HeartIcon, UserIcon, CalendarIcon, EditIcon, TrashIcon, ArrowLeftIcon, InboxIcon } from '../components/ui/Icons';

// Helper functions for liked posts in localStorage
const getLikedPosts = () => {
  const liked = localStorage.getItem('likedPosts');
  return liked ? JSON.parse(liked) : [];
};

const saveLikedPosts = (likedPosts) => {
  localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
};

// Category color mapping
const getCategoryColor = (category) => {
  const colors = {
    Technology: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Lifestyle: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Travel: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Food: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    Business: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    Health: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };
  return colors[category] || colors.Other;
};

const PostDetailPage = () => {
  // Get post ID from URL
  const { id } = useParams();
  
  // Navigation hook for redirecting
  const navigate = useNavigate();
  
  // Dispatch hook for Redux actions
  const dispatch = useDispatch();
  
  // Get post from Redux store using selector
  const post = useSelector(selectPostById(id));
  
  // Get theme state from Context
  const { isDark } = useTheme();
  
  // Get notification function from Context
  const { showNotification } = useNotification();
  
  // Track if user has liked this post
  const [hasLiked, setHasLiked] = useState(false);
  
  useEffect(() => {
    if (post) {
      const likedPosts = getLikedPosts();
      setHasLiked(likedPosts.includes(post.id));
    }
  }, [post]);

  // Handle like button click
  const handleLike = () => {
    const likedPosts = getLikedPosts();
    
    if (hasLiked) {
      // Unlike the post
      const updatedLikedPosts = likedPosts.filter(id => id !== post.id);
      saveLikedPosts(updatedLikedPosts);
      setHasLiked(false);
      dispatch(unlikePost(post.id));
    } else {
      // Like the post
      likedPosts.push(post.id);
      saveLikedPosts(likedPosts);
      setHasLiked(true);
      dispatch(likePost(post.id));
    }
  };

  // Handle delete button click
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post.id));
      showNotification('Post deleted successfully', 'info');
      navigate('/'); // Redirect to home after delete
    }
  };

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Show message if post not found
  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <InboxIcon className={`w-24 h-24 mx-auto mb-6 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Post Not Found
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The post you're looking for doesn't exist or has been deleted.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Go back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/"
          className={`inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg transition-colors ${
            isDark 
              ? 'text-purple-400 hover:bg-gray-800' 
              : 'text-purple-600 hover:bg-gray-100'
          }`}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>

        {/* Post Content */}
        <article className={`rounded-2xl shadow-xl overflow-hidden animate-fade-in ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 text-white">
            {/* Category Badge */}
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${getCategoryColor(post.category)}`}>
              {post.category || 'Other'}
            </span>
            
            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-purple-100">
              <span className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>{post.author}</span>
              </span>
              <span className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{formatDate(post.createdAt)}</span>
              </span>
              <span className="flex items-center space-x-2">
                <HeartIcon className="w-5 h-5" />
                <span>{post.likes} likes</span>
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className={`prose max-w-none mb-8 ${isDark ? 'prose-invert' : ''}`}>
              <p className={`text-lg leading-relaxed whitespace-pre-wrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {post.content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-wrap gap-4 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  hasLiked
                    ? 'bg-pink-500 text-white'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                }`}
              >
                <HeartIcon className="w-5 h-5" filled={hasLiked} />
                <span>Like ({post.likes})</span>
              </button>
              <Link
                to={`/edit/${post.id}`}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-violet-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <EditIcon className="w-5 h-5" />
                <span>Edit Post</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <TrashIcon className="w-5 h-5" />
                <span>Delete Post</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetailPage;
