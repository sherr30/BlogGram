/**
 * SEARCH BAR COMPONENT
 * 
 * This component provides search and filter functionality for blog posts.
 * It updates Redux state with search query and selected category.
 */

import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectSearchQuery } from '../../store/slices/blogSlice';
import { useTheme } from '../../context';
import { SearchIcon, CloseIcon } from '../ui/Icons';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const { isDark } = useTheme();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Search Input */}
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <SearchIcon className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search posts by title, content, or author..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`
            w-full pl-12 pr-4 py-3 rounded-xl border-2
            ${isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            }
            focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800
            transition-all duration-200 outline-none
          `}
        />
        {searchQuery && (
          <button
            onClick={() => dispatch(setSearchQuery(''))}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
