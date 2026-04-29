/**
 * BLOG FORM COMPONENT
 * 
 * This form is used for both creating new posts and editing existing posts.
 * 
 * PROPS:
 * - existingPost: If provided, the form is in "edit mode" and pre-filled
 * 
 * STATE MANAGEMENT:
 * - Uses React's useState for form data (local state)
 * - Uses Redux dispatch to send data to the store when submitting
 * - Uses Context API for theme and notifications
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../../store/slices/blogSlice';
import { useTheme, useNotification } from '../../context';
import { PinIcon, UserIcon, PenIcon, AlertIcon } from '../ui/Icons';

const BlogForm = ({ existingPost = null }) => {
  // Navigation hook to redirect after form submission
  const navigate = useNavigate();
  
  // Dispatch hook to send actions to Redux store
  const dispatch = useDispatch();
  
  // Get theme state from Context
  const { isDark } = useTheme();
  
  // Get notification function from Context
  const { showNotification } = useNotification();
  
  // Check if we're editing an existing post
  const isEditing = existingPost !== null;

  // Form state - stores user input
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  // Error state - stores validation errors
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form if editing an existing post
  useEffect(() => {
    if (existingPost) {
      setFormData({
        title: existingPost.title || '',
        content: existingPost.content || '',
        author: existingPost.author || '',
      });
    }
  }, [existingPost]);

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submitting
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    if (isEditing) {
      // EDIT: Dispatch updatePost action with post ID and new data
      dispatch(updatePost({
        id: existingPost.id,
        ...formData,
      }));
      showNotification('Post updated successfully! ✨', 'success');
    } else {
      // CREATE: Dispatch addPost action with form data
      dispatch(addPost(formData));
      showNotification('Post created successfully! 🎉', 'success');
    }

    setIsSubmitting(false);
    // Redirect to home page after submission
    navigate('/');
  };

  // Input field classes
  const inputClasses = `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
    ${isDark 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-800' 
      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-200'
    }
  `;
  
  const labelClasses = `block text-sm font-semibold mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label className={`${labelClasses} flex items-center space-x-2`}>
          <PinIcon className="w-4 h-4" />
          <span>Title *</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter an engaging post title..."
          className={inputClasses}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <AlertIcon className="w-4 h-4 mr-1" /> {errors.title}
          </p>
        )}
      </div>

      {/* Author Input */}
      <div>
        <label className={`${labelClasses} flex items-center space-x-2`}>
          <UserIcon className="w-4 h-4" />
          <span>Author *</span>
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Your name..."
          className={inputClasses}
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <AlertIcon className="w-4 h-4 mr-1" /> {errors.author}
          </p>
        )}
      </div>

      {/* Content Textarea */}
      <div>
        <label className={`${labelClasses} flex items-center space-x-2`}>
          <PenIcon className="w-4 h-4" />
          <span>Content *</span>
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={10}
          placeholder="Write your post content here... Share your thoughts, ideas, or stories!"
          className={inputClasses + ' resize-none'}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-2 flex items-center">
            <AlertIcon className="w-4 h-4 mr-1" /> {errors.content}
          </p>
        )}
        <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {formData.content.length} characters
        </p>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            flex-1 py-4 px-6 rounded-xl font-semibold text-white
            transition-all duration-200 transform hover:scale-[1.02]
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl'
            }
          `}
        >
          {isSubmitting ? 'Saving...' : (isEditing ? 'Update Post' : 'Publish Post')}
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`
            px-6 py-4 rounded-xl font-semibold transition-all duration-200
            ${isDark 
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
