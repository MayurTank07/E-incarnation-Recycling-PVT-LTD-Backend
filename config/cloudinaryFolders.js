/**
 * Cloudinary Folder Structure Configuration
 * 
 * This file defines the organized folder structure for all uploaded assets.
 * Each content type is mapped to a specific Cloudinary folder for better organization.
 */

export const CLOUDINARY_FOLDERS = {
  // Home Page Assets
  HERO: 'eincarnation/hero',
  SERVICES: 'eincarnation/services',
  CLIENTS: 'eincarnation/clients',
  TESTIMONIALS: 'eincarnation/testimonials',
  
  // Page-Specific Assets
  ABOUT: 'eincarnation/about',
  TEAM: 'eincarnation/team',
  EVENTS: 'eincarnation/events',
  EPR: 'eincarnation/epr',
  
  // Services Page
  SERVICES_PAGE: 'eincarnation/services-page',
  
  // Footer & Contact
  FOOTER: 'eincarnation/footer',
  CONTACT: 'eincarnation/contact',
  
  // General/Miscellaneous
  GENERAL: 'eincarnation/general',
  PAGES: 'eincarnation/pages'
};

/**
 * Get folder path by content type
 * @param {String} type - Content type (e.g., 'service', 'client', 'event')
 * @returns {String} Cloudinary folder path
 */
export const getFolderByType = (type) => {
  const folderMap = {
    'service': CLOUDINARY_FOLDERS.SERVICES,
    'services': CLOUDINARY_FOLDERS.SERVICES,
    'client': CLOUDINARY_FOLDERS.CLIENTS,
    'clients': CLOUDINARY_FOLDERS.CLIENTS,
    'testimonial': CLOUDINARY_FOLDERS.TESTIMONIALS,
    'testimonials': CLOUDINARY_FOLDERS.TESTIMONIALS,
    'event': CLOUDINARY_FOLDERS.EVENTS,
    'events': CLOUDINARY_FOLDERS.EVENTS,
    'team': CLOUDINARY_FOLDERS.TEAM,
    'about': CLOUDINARY_FOLDERS.ABOUT,
    'hero': CLOUDINARY_FOLDERS.HERO,
    'epr': CLOUDINARY_FOLDERS.EPR,
    'services-page': CLOUDINARY_FOLDERS.SERVICES_PAGE,
    'footer': CLOUDINARY_FOLDERS.FOOTER,
    'contact': CLOUDINARY_FOLDERS.CONTACT,
    'pages': CLOUDINARY_FOLDERS.PAGES
  };

  return folderMap[type.toLowerCase()] || CLOUDINARY_FOLDERS.GENERAL;
};

/**
 * Folder structure validation
 * Ensures all required folders exist in Cloudinary
 */
export const REQUIRED_FOLDERS = [
  CLOUDINARY_FOLDERS.HERO,
  CLOUDINARY_FOLDERS.SERVICES,
  CLOUDINARY_FOLDERS.CLIENTS,
  CLOUDINARY_FOLDERS.TESTIMONIALS,
  CLOUDINARY_FOLDERS.ABOUT,
  CLOUDINARY_FOLDERS.TEAM,
  CLOUDINARY_FOLDERS.EVENTS,
  CLOUDINARY_FOLDERS.EPR,
  CLOUDINARY_FOLDERS.SERVICES_PAGE
];

export default CLOUDINARY_FOLDERS;
