/**
 * REDUX STORE CONFIGURATION
 * 
 * The store is the central place where all application state is kept.
 * Components can:
 * - Read state using useSelector hook
 * - Update state by dispatching actions using useDispatch hook
 */

import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './slices/blogSlice';

// Create the Redux store with our blog reducer
const store = configureStore({
  reducer: {
    blog: blogReducer, // All blog state will be at state.blog
  },
});

export default store;
