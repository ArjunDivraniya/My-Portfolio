// Google Analytics utility functions

// Initialize Google Analytics
export const initGA = (measurementId) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const trackPageView = (url, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track section views (for homepage sections)
export const trackSectionView = (sectionName) => {
  trackEvent('section_view', 'User Engagement', sectionName);
};

// Track button/link clicks
export const trackClick = (elementName, destination) => {
  trackEvent('click', 'User Interaction', `${elementName} -> ${destination}`);
};

// Track portfolio project views
export const trackProjectView = (projectName) => {
  trackEvent('project_view', 'Portfolio', projectName);
};

// Track skill interactions
export const trackSkillView = (skillName) => {
  trackEvent('skill_view', 'Skills', skillName);
};

// Track social media clicks
export const trackSocialClick = (platform) => {
  trackEvent('social_click', 'Social Media', platform);
};

// Track contact form submissions
export const trackContactSubmit = () => {
  trackEvent('form_submit', 'Contact', 'Contact Form Submitted');
};

// Track downloads (resume, certificates, etc.)
export const trackDownload = (fileName) => {
  trackEvent('download', 'Resources', fileName);
};

// Track external link clicks
export const trackExternalLink = (url) => {
  trackEvent('external_link', 'Outbound', url);
};

// Track scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll', 'User Engagement', `Scrolled ${percentage}%`, percentage);
};

// Track time spent on page (call on unmount)
export const trackTimeOnPage = (pageName, seconds) => {
  trackEvent('time_on_page', 'User Engagement', pageName, seconds);
};

// Track certificate views
export const trackCertificateView = (certificateName) => {
  trackEvent('certificate_view', 'Achievements', certificateName);
};

// Track achievement interactions
export const trackAchievementView = (achievementName) => {
  trackEvent('achievement_view', 'Achievements', achievementName);
};

// Track LeetCode profile interactions
export const trackLeetCodeInteraction = (action) => {
  trackEvent('leetcode_interaction', 'Competitive Coding', action);
};

// Track creative passions interactions
export const trackCreativeInteraction = (type, name) => {
  trackEvent('creative_interaction', 'Creative Passions', `${type}: ${name}`);
};
