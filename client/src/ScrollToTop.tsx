// src/components/ScrollToTop.tsx

import { useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

// Define the type for the component's props
interface ScrollToTopProps {
  children: ReactNode;
}

/**
 * This component listens for route changes and smoothly scrolls the window
 * to the top. It should be rendered within your Router context.
 * It doesn't render any visible UI, it just performs an effect.
 */
function ScrollToTop({ children }: ScrollToTopProps) {
  const [pathname] = useLocation();

  useEffect(() => {
    // Scroll to the top of the page with a smooth animation
    // whenever the pathname changes.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // This component just wraps its children.
  // Using a React Fragment <> is a clean way to do this.
  return <>{children}</>;
}

export default ScrollToTop;