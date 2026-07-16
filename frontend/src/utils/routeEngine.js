import { STADIUM_AREAS } from './navigationData'

const SPEED_MS = 1.4 // approx 1.4 meters per sec

// Helper: Calculate Euclidean distance
function getDistance(a, b) {
  // Assuming 1 unit of x/y = 10 meters
  const dx = a.x - b.x
  const dy = a.y - b.y
  return Math.sqrt(dx * dx + dy * dy) * 10
}

function getCompassDir(from, to) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const angle = Math.atan2(dy, dx) * 180 / Math.PI
  if (angle >= -22.5 && angle < 22.5) return 'East'
  if (angle >= 22.5 && angle < 67.5) return 'South-East'
  if (angle >= 67.5 && angle < 112.5) return 'South'
  if (angle >= 112.5 && angle < 157.5) return 'South-West'
  if (angle >= 157.5 || angle < -157.5) return 'West'
  if (angle >= -157.5 && angle < -112.5) return 'North-West'
  if (angle >= -112.5 && angle < -67.5) return 'North'
  if (angle >= -67.5 && angle < -22.5) return 'North-East'
  return 'straight'
}

/**
 * Calculates a dynamic route from start to destination.
 * 
 * @param {string} fromId 
 * @param {string} toId 
 * @param {string} mode - 'shortest', 'fastest', 'accessible', 'low-crowd'
 * @returns {object} route object with distance, time, steps, path array
 */
export function calculateRoute(fromId, toId, mode = 'shortest') {
  let fromNode = STADIUM_AREAS.find(a => a.id === fromId)
  let toNode = STADIUM_AREAS.find(a => a.id === toId)

  // Handle "nearest-" logic
  if (toId.startsWith('nearest-')) {
    const typeNeeded = toId.replace('nearest-', '')
    // Filter candidates
    let candidates = STADIUM_AREAS.filter(a => a.type === typeNeeded)
    if (mode === 'accessible') {
      candidates = candidates.filter(a => a.accessible)
    }
    
    // Find closest candidate by Euclidean distance
    if (candidates.length > 0) {
      let closest = candidates[0]
      let minD = getDistance(fromNode, closest)
      for (let i = 1; i < candidates.length; i++) {
        const d = getDistance(fromNode, candidates[i])
        if (d < minD) {
          minD = d
          closest = candidates[i]
        }
      }
      toNode = closest
    }
  }

  if (!fromNode || !toNode) {
    throw new Error('Invalid origin or destination')
  }

  // Base distance
  const distanceMeters = Math.round(getDistance(fromNode, toNode))
  let speed = SPEED_MS

  // Crowd status simulation based on destination
  let crowdStatus = toNode.crowd || 'low'
  if (mode === 'low-crowd') {
    crowdStatus = 'low' // Simulated routing around crowds
  }

  // Time calculation
  if (crowdStatus === 'critical') speed *= 0.3
  else if (crowdStatus === 'high') speed *= 0.5
  else if (crowdStatus === 'medium') speed *= 0.8
  
  if (mode === 'fastest') {
    // If it's fastest, we assume the engine found a path to avoid the worst crowds
    speed = SPEED_MS * 0.9
  }

  const walkSeconds = distanceMeters / speed
  const walkMinutes = Math.max(1, Math.round(walkSeconds / 60))

  const eta = new Date(Date.now() + walkSeconds * 1000)
  const etaFormatted = eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  const dir = getCompassDir(fromNode, toNode)

  const steps = [
    `Start from ${fromNode.label}.`,
    `Head ${dir} across the concourse.`,
    `Continue for roughly ${distanceMeters} meters.`,
    `Arrive at ${toNode.label}.`
  ]

  if (mode === 'accessible') {
    steps.splice(1, 0, 'Follow the blue accessibility markers on the floor.')
    steps.push('Use the accessible entrance ramp.')
  }
  
  if (crowdStatus === 'high' || crowdStatus === 'critical') {
    steps.splice(2, 0, 'Expect heavy congestion in this area. Keep right.')
  }

  // Basic alternative route suggestion
  const altMode = mode === 'shortest' ? 'fastest' : 'shortest'
  const alternativeRoute = `Try ${altMode} mode for a different path.`

  return {
    fromId: fromNode.id,
    toId: toNode.id,
    fromLabel: fromNode.label,
    toLabel: toNode.label,
    distance: `${distanceMeters} m`,
    walkTime: `${walkMinutes} min`,
    crowdStatus,
    steps,
    eta: etaFormatted,
    mode,
    alternativeRoute,
    path: [fromNode, toNode] // For drawing the line on the map
  }
}
