// API Configuration
// In development: uses localhost
// In production: uses the Render backend URL

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  availability: `${API_BASE_URL}/api/calendar/availability`,
  book: `${API_BASE_URL}/api/calendar/book`,
  register: `${API_BASE_URL}/api/events/register`,
  newsletter: `${API_BASE_URL}/api/newsletter/subscribe`,
};

