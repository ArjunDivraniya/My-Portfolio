// Custom React Hook for Google Analytics tracking
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, initGA, trackTimeOnPage, trackClick, trackDownload } from '../utils/analytics';

// Hook to track page views on route changes
export const usePageTracking = () => {
  const location = useLocation();
  const startTimeRef = useRef(Date.now());
  const previousPathRef = useRef('');

  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (measurementId) {
      // Initialize GA on first load
      if (!previousPathRef.current) {
        initGA(measurementId);
      }

      // Track time on previous page
      if (previousPathRef.current) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
        trackTimeOnPage(previousPathRef.current, timeSpent);
      }

      // Get page title based on route
      const getPageTitle = (path) => {
        const titles = {
          '/': 'Home - Arjun Divraniya',
          '/about': 'About Me - Arjun Divraniya',
          '/achievements': 'Achievements - Arjun Divraniya',
          '/education': 'Education Journey - Arjun Divraniya',
          '/experience': 'Experience - Arjun Divraniya',
          '/leetcode': 'LeetCode Profile - Arjun Divraniya',
          '/contact': 'Contact Me - Arjun Divraniya',
        };
        return titles[path] || 'Arjun Divraniya Portfolio';
      };

      // Track the page view
      const pageTitle = getPageTitle(location.pathname);
      trackPageView(location.pathname + location.search, pageTitle);

      // Update refs
      previousPathRef.current = location.pathname;
      startTimeRef.current = Date.now();
    }
  }, [location]);
};

// Hook to track section visibility (using Intersection Observer)
export const useSectionTracking = (sectionName, threshold = 0.5) => {
  const sectionRef = useRef(null);
  const trackedRef = useRef(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !trackedRef.current) {
            // Track section view
            import('../utils/analytics').then(({ trackSectionView }) => {
              trackSectionView(sectionName);
            });
            trackedRef.current = true;
          }
        });
      },
      { threshold }
    );

    observer.observe(currentSection);

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [sectionName, threshold]);

  return sectionRef;
};

// Hook to track scroll depth
export const useScrollDepthTracking = () => {
  const trackedDepths = useRef(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);

      // Track at 25%, 50%, 75%, and 100% milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (scrollPercentage >= milestone && !trackedDepths.current.has(milestone)) {
          import('../utils/analytics').then(({ trackScrollDepth }) => {
            trackScrollDepth(milestone);
          });
          trackedDepths.current.add(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      trackedDepths.current.clear();
    };
  }, []);
};

// Hook to track clicks on external links and downloads automatically
export const useLinkTracking = () => {
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const link = e.target.closest('a');
      if (!link || !link.href) return;

      const url = link.href;
      const isExternal = url.startsWith('http') && !url.includes('arjundivraniya.in');
      const isDownload = url.toLowerCase().endsWith('.pdf') || 
                         url.toLowerCase().endsWith('.zip') || 
                         url.toLowerCase().endsWith('.docx') ||
                         link.hasAttribute('download');

      if (isDownload) {
        const fileName = url.split('/').pop() || 'file';
        trackDownload(fileName);
      } else if (isExternal) {
        trackClick('Outbound Link', url);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);
};
