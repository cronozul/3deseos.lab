import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop resets the window scroll position to the top whenever the
 * pathname changes. This prevents the browser from retaining the previous
 * scroll offset when navigating between routes (e.g., product list →
 * product detail). The component renders nothing.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to top; smooth behavior can be added if desired.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
