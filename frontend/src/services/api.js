/**
 * src/services/api.js
 * Axios base instance.
 * BASE_URL is read from the Vite env variable VITE_API_URL.
 * Falls back to http://localhost:8000 for local development.
 */
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 30_000, // 30 s — generous for AI endpoints
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// ── Request interceptor — log in dev mode ─────────────────────────────────────
api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`)
  }
  return config
})

// ── Response interceptor — uniform error shape ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.message ||
      'An unexpected network error occurred.'
    return Promise.reject(new Error(message))
  }
)

export default api
