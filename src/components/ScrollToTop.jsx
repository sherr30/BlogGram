/**
 * SCROLL TO TOP COMPONENT
 * 
 * This component scrolls the window to the top whenever the route changes.
 * It solves the common SPA issue where navigating to a new page maintains
 * the previous scroll position instead of starting from the top.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
