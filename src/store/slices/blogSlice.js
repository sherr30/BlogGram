/**
 * REDUX SLICE FOR BLOG POSTS
 * 
 * This file manages all blog post data using Redux Toolkit.
 * 
 * KEY CONCEPTS:
 * - Slice: A collection of reducer logic and actions for a single feature
 * - Reducer: A function that updates state based on actions
 * - Action: An object that describes what happened (e.g., "add post")
 * - Selector: A function to read data from the Redux store
 */

import { createSlice } from '@reduxjs/toolkit';

// ============================================
// CONSTANTS
// ============================================
const CATEGORIES = ['All', 'Technology', 'Lifestyle', 'Travel', 'Food', 'Business', 'Health', 'Other'];

// ============================================
// SAMPLE DATA - Initial blog posts
// ============================================
const samplePosts = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: 'React is a JavaScript library for building user interfaces. It uses components to create reusable UI elements. React makes it painless to create interactive UIs using a component-based architecture. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
    author: 'Jane Developer',
    category: 'Technology',
    createdAt: new Date('2024-01-15').toISOString(),
    likes: 42,
  },
  {
    id: '2',
    title: 'Understanding Redux',
    content: 'Redux helps manage application state. It follows three principles: single source of truth, state is read-only, and changes are made with pure functions. Redux provides a predictable state container for JavaScript apps that helps you write applications that behave consistently across different environments.',
    author: 'John Coder',
    category: 'Technology',
    createdAt: new Date('2024-02-20').toISOString(),
    likes: 38,
  },
  {
    id: '3',
    title: '10 Tips for Better Work-Life Balance',
    content: 'Achieving work-life balance is essential for maintaining physical and mental health. Here are 10 proven tips: 1) Set clear boundaries between work and personal time. 2) Prioritize self-care activities. 3) Learn to say no. 4) Take regular breaks. 5) Exercise regularly. 6) Spend quality time with loved ones. 7) Unplug from technology. 8) Set realistic goals. 9) Practice mindfulness. 10) Seek support when needed.',
    author: 'Sarah Wellness',
    category: 'Lifestyle',
    createdAt: new Date('2024-03-10').toISOString(),
    likes: 56,
  },
  {
    id: '4',
    title: 'Exploring the Mountains of Switzerland',
    content: 'Switzerland offers some of the most breathtaking mountain scenery in the world. From the iconic Matterhorn to the stunning Swiss Alps, every turn reveals another postcard-perfect view. Whether you are hiking in summer or skiing in winter, the Swiss mountains provide unforgettable experiences for outdoor enthusiasts.',
    author: 'Mike Traveler',
    category: 'Travel',
    createdAt: new Date('2024-03-25').toISOString(),
    likes: 73,
  },
];

// ============================================
// HELPER FUNCTIONS - Load/Save to localStorage
// ============================================

// Load posts from browser storage (so data persists after refresh)
const loadPosts = () => {
  const saved = localStorage.getItem('blogPosts');
  return saved ? JSON.parse(saved) : samplePosts;
};

// Save posts to browser storage
const savePosts = (posts) => {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};

// ============================================
// INITIAL STATE - Starting data for the store
// ============================================
const initialState = {
  posts: loadPosts(),           // Array of all blog posts
  searchQuery: '',              // Current search query
  selectedCategory: 'All',      // Currently selected category filter
  categories: CATEGORIES,       // Available categories
};

// ============================================
// CREATE SLICE - Define reducers and actions
// ============================================
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // ADD POST - Creates a new blog post
    addPost: (state, action) => {
      const newPost = {
        id: Date.now().toString(), // Simple unique ID
        ...action.payload,         // Spread the data from action (title, content, author)
        category: action.payload.category || 'Other',
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      state.posts.unshift(newPost); // Add to beginning of array
      savePosts(state.posts);        // Save to localStorage
    },

    // UPDATE POST - Edit an existing post
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload };
        savePosts(state.posts);
      }
    },

    // DELETE POST - Remove a post by ID
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      savePosts(state.posts);
    },

    // LIKE POST - Increment likes count
    likePost: (state, action) => {
      const post = state.posts.find(post => post.id === action.payload);
      if (post) {
        post.likes += 1;
        savePosts(state.posts);
      }
    },

    // UNLIKE POST - Decrement likes count
    unlikePost: (state, action) => {
      const post = state.posts.find(post => post.id === action.payload);
      if (post && post.likes > 0) {
        post.likes -= 1;
        savePosts(state.posts);
      }
    },

    // SET SEARCH QUERY - Update search filter
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // SET CATEGORY - Update category filter
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

// ============================================
// EXPORTS
// ============================================

// Export actions - These are dispatched from components
export const { addPost, updatePost, deletePost, likePost, unlikePost, setSearchQuery, setCategory } = blogSlice.actions;

// Export selectors - These read data from the store
export const selectAllPosts = (state) => state.blog.posts;
export const selectPostById = (id) => (state) => 
  state.blog.posts.find(post => post.id === id);
export const selectSearchQuery = (state) => state.blog.searchQuery;
export const selectCategory = (state) => state.blog.selectedCategory;
export const selectCategories = (state) => state.blog.categories;

// Filtered posts selector - returns posts matching search and category
export const selectFilteredPosts = (state) => {
  const { posts, searchQuery, selectedCategory } = state.blog;
  
  return posts.filter(post => {
    // Filter by category
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    // Filter by search query (case-insensitive)
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query);
    
    return matchesCategory && matchesSearch;
  });
};

// Export reducer - This is used in store configuration
export default blogSlice.reducer;
