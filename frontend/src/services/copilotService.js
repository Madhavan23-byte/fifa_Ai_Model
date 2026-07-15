/**
 * src/services/copilotService.js
 * All Copilot-related API calls in one place.
 */
import api from './api'

/**
 * Send an operational query to the Copilot endpoint.
 *
 * @param {{ role: string, query: string }} payload
 * @returns {Promise<{
 *   situation: string,
 *   recommendation: string,
 *   reason: string,
 *   priority: string,
 *   impact: string,
 * }>}
 */
export async function sendCopilotMessage({ role = 'organizer', query }) {
  const { data } = await api.post('/ai/query', { role, query })
  return data
}
