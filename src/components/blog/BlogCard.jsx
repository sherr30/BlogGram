import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../store/slices/blogSlice';
import { useTheme, useNotification } from '../../context';
import { HeartIcon, UserIcon, EyeIcon } from '../ui/Icons';

// Helper functions for liked posts in localStorage
const getLikedPosts = () => {
  const liked = localStorage.getItem('likedPosts');
  return liked ? JSON.parse(liked) : [];
};

const saveLikedPosts = (likedPosts) => {
  localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
};

const BlogCard = ({ post }) => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const { showNotification } = useNotification();
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const likedPosts = getLikedPosts();
    setHasLiked(likedPosts.includes(post.id));
  }, [post.id]);

  const handleLike = (e) => {
    e.stopPropagation();
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateContent = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <article className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300`}>
      <div className="p-6">
        
        <Link to={`/post/${post.id}`}>
          <h2 className={`text-xl font-bold mb-3 hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {post.title}
          </h2>
        </Link>

        <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {truncateContent(post.content)}
        </p>

        <div className={`flex items-center text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <UserIcon className="w-4 h-4 mr-2" />
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
              hasLiked
                ? 'text-pink-500'
                : isDark 
                  ? 'hover:bg-pink-900/30 text-gray-300 hover:text-pink-400' 
                  : 'hover:bg-pink-50 text-gray-500 hover:text-pink-500'
            }`}
          >
            <HeartIcon className="w-5 h-5" filled={hasLiked} />
            <span>{post.likes}</span>
          </button>

          <Link
            to={`/post/${post.id}`}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isDark 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}
          >
            <EyeIcon className="w-4 h-4" />
            <span>View</span>
          </Link>

        </div>
      </div>
    </article>
  );
};

export default BlogCard;