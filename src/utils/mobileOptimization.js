// Mobile Performance & Optimization Utilities
// Built for lag-free mobile experience with automatic device detection

/**
 * Detect if the current device is mobile/touch-enabled
 */
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0)
  );
};

/**
 * Check if viewport is below tablet breakpoint
 */
export const isMobileViewport = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Combined mobile check (device OR viewport)
 */
export const isMobile = () => {
  return isMobileDevice() || isMobileViewport();
};

/**
 * Get optimized animation config based on device
 */
export const getAnimationConfig = () => {
  const mobile = isMobile();
  
  return {
    // Disable heavy 3D transforms on mobile
    enable3D: !mobile,
    
    // Simplified spring configs for mobile
    spring: mobile 
      ? { stiffness: 100, damping: 20 } 
      : { stiffness: 150, damping: 15 },
    
    // Reduced animation duration on mobile
    duration: mobile ? 0.3 : 0.6,
    
    // Disable complex effects
    enableParticles: !mobile,
    enableBlur: !mobile,
    enableSmoothScroll: !mobile,
    
    // GSAP scrub values
    gsapScrub: mobile ? 0.5 : 1,
  };
};

/**
 * Conditional animation props for Framer Motion
 * Returns empty object on mobile to skip heavy animations
 */
export const conditionalAnimation = (desktopAnimation, mobileAnimation = {}) => {
  return isMobile() ? mobileAnimation : desktopAnimation;
};

/**
 * Get optimized hover props (no-op on mobile)
 */
export const getHoverProps = (hoverProps = {}) => {
  if (isMobile()) return {};
  return { whileHover: hoverProps };
};

/**
 * Convert hover-based animations to in-view animations for mobile
 */
export const getMobileInViewProps = () => {
  if (!isMobile()) return {};
  
  return {
    whileInView: { 
      scale: 1.02, 
      transition: { duration: 0.3 } 
    },
    viewport: { once: false, amount: 0.5 }
  };
};

/**
 * Throttle function for scroll events
 */
export const throttle = (func, delay = 100) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
};

/**
 * GSAP MatchMedia configuration helper
 */
export const getGSAPMatchMedia = (gsap) => {
  return gsap.matchMedia();
};

/**
 * Mobile-optimized GSAP animation setup
 */
export const setupResponsiveGSAP = (gsap, ScrollTrigger, element, desktopConfig, mobileConfig) => {
  const mm = gsap.matchMedia();
  
  // Desktop animations (768px and above)
  mm.add("(min-width: 768px)", () => {
    return gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        ...desktopConfig.scrollTrigger,
      },
      ...desktopConfig.animation,
    });
  });
  
  // Mobile animations (below 768px)
  mm.add("(max-width: 767px)", () => {
    return gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        ...mobileConfig.scrollTrigger,
      },
      ...mobileConfig.animation,
    });
  });
  
  return mm;
};

/**
 * Preload critical images with lazy loading for non-critical
 */
export const preloadImage = (src, priority = false) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    if (priority) {
      img.loading = 'eager';
    } else {
      img.loading = 'lazy';
    }
    img.src = src;
  });
};

/**
 * Replace video with poster image on mobile
 */
export const getVideoOrPoster = (videoSrc, posterSrc) => {
  return isMobile() ? { type: 'image', src: posterSrc } : { type: 'video', src: videoSrc };
};

/**
 * Responsive container classes for preventing horizontal scroll
 */
export const responsiveContainerClasses = "overflow-x-hidden w-full max-w-full";

/**
 * Standard mobile padding
 */
export const mobilePadding = "px-4 sm:px-6 md:px-8 lg:px-12";

/**
 * Debounce function for resize events
 */
export const debounce = (func, delay = 250) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if reduced motion is preferred
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get safe animation config respecting user preferences
 */
export const getSafeAnimationConfig = () => {
  const shouldReduce = prefersReducedMotion();
  const mobile = isMobile();
  
  if (shouldReduce) {
    return {
      duration: 0.01,
      animate: false,
      transition: { duration: 0 }
    };
  }
  
  return getAnimationConfig();
};

export default {
  isMobileDevice,
  isMobileViewport,
  isMobile,
  getAnimationConfig,
  conditionalAnimation,
  getHoverProps,
  getMobileInViewProps,
  throttle,
  debounce,
  setupResponsiveGSAP,
  getGSAPMatchMedia,
  preloadImage,
  getVideoOrPoster,
  responsiveContainerClasses,
  mobilePadding,
  prefersReducedMotion,
  getSafeAnimationConfig,
};
