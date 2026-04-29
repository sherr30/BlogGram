/**
 * APP.JSX - Main Application Component
 * 
 * This is the root component that sets up:
 * 1. Redux Provider - Makes Redux store available to all components
 * 2. Context Providers - Theme and Notifications (cross-cutting concerns)
 * 3. React Router - Handles navigation between pages
 * 4. Layout - Header, main content, and Footer
 * 
 * ROUTING:
 * - "/" → HomePage (list all posts)
 * - "/post/:id" → PostDetailPage (view single post)
 * - "/create" → CreatePostPage (create new post)
 * - "/edit/:id" → EditPostPage (edit existing post)
 * - "*" → NotFoundPage (404 error)
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider, NotificationProvider } from "./context";
import { Header, Footer, NotificationContainer, ScrollToTop } from "./components";
import {
  HomePage,
  PostDetailPage,
  CreatePostPage,
  EditPostPage,
  NotFoundPage,
} from "./pages";
import "./index.css";

function App() {
  return (
    // Provider makes Redux store available to all child components
    <Provider store={store}>
      {/* ThemeProvider - Context API for dark/light mode */}
      <ThemeProvider>
        {/* NotificationProvider - Context API for toast notifications */}
        <NotificationProvider>
          {/* Router enables navigation without page refresh */}
          <Router>
            {/* ScrollToTop - Resets scroll position on route change */}
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              {/* Header - shown on all pages */}
              <Header />
              
              {/* Main content area */}
              <main className="flex-1">
                {/* Routes define which component to show for each URL */}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/post/:id" element={<PostDetailPage />} />
                  <Route path="/create" element={<CreatePostPage />} />
                  <Route path="/edit/:id" element={<EditPostPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              
              {/* Footer - shown on all pages */}
              <Footer />
              
              {/* Notification Container - renders toast notifications */}
              <NotificationContainer />
            </div>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
