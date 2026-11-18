// Centralized API Base URL configuration connected to Render backend
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://lookman-nv4e.onrender.com';
export const API_BASE = import.meta.env.VITE_API_URL || `${BACKEND_URL.replace(/\/+$/, '')}/api`;
