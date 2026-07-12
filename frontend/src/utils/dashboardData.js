/**
 * dashboardData.js
 * Realistic FIFA World Cup 2026 demo data for the Command Center dashboard.
 * All data is static — no backend or API calls required.
 */

// ─── Live match ───────────────────────────────────────────────────────────────
export const LIVE_MATCH = {
  homeTeam: { name: 'Brazil',  code: 'BRA', flag: '🇧🇷', score: 2 },
  awayTeam: { name: 'Germany', code: 'GER', flag: '🇩🇪', score: 1 },
  status:   'LIVE',
  minute:   78,
  kickoff:  '20:00 EST',
  venue:    'MetLife Stadium, New Jersey',
  date:     'Sunday, 26 July 2026',
  group:    'Quarter Final',
  attendance: { current: 74250, capacity: 82500 },
  events: [
    { minute: 22, type: 'goal',   team: 'BRA', player: 'Vinicius Jr.',  note: 'Penalty kick'        },
    { minute: 35, type: 'goal',   team: 'GER', player: 'F. Wirtz',      note: 'Long range effort'   },
    { minute: 67, type: 'goal',   team: 'BRA', player: 'Rodrygo',       note: 'Header, corner kick' },
    { minute: 71, type: 'yellow', team: 'GER', player: 'T. Müller',     note: 'Tactical foul'       },
  ],
}

// ─── Crowd zones ──────────────────────────────────────────────────────────────
export const CROWD_ZONES = [
  { id: 'north',  name: 'North Stand',  density: 82, status: 'busy'     },
  { id: 'south',  name: 'South Stand',  density: 45, status: 'open'     },
  { id: 'east',   name: 'East Stand',   density: 94, status: 'critical' },
  { id: 'west',   name: 'West Stand',   density: 61, status: 'busy'     },
  { id: 'vip',    name: 'VIP Lounge',   density: 38, status: 'open'     },
  { id: 'family', name: 'Family Zone',  density: 55, status: 'open'     },
]

// ─── Gates ────────────────────────────────────────────────────────────────────
export const GATES = [
  { id: 'a', name: 'Gate A', capacity: 42, status: 'open',     flow: 210 },
  { id: 'b', name: 'Gate B', capacity: 81, status: 'busy',     flow: 405 },
  { id: 'c', name: 'Gate C', capacity: 28, status: 'open',     flow: 140 },
  { id: 'd', name: 'Gate D', capacity: 94, status: 'critical', flow: 470 },
]

// ─── Parking ──────────────────────────────────────────────────────────────────
export const PARKING = [
  { id: 'north', zone: 'North Lot', status: 'available', occupied: 320, total: 800 },
  { id: 'south', zone: 'South Lot', status: 'full',      occupied: 600, total: 600 },
  { id: 'east',  zone: 'East Lot',  status: 'limited',   occupied: 480, total: 500 },
  { id: 'west',  zone: 'West Lot',  status: 'available', occupied: 210, total: 700 },
]

// ─── Weather ──────────────────────────────────────────────────────────────────
export const WEATHER = {
  temp:      28,
  unit:      '°C',
  condition: 'Clear',
  humidity:  54,
  wind:      12,
  windUnit:  'km/h',
  feelsLike: 30,
  visibility:'10 km',
  uv:        'Low',
  emoji:     '☀️',
}

// ─── Volunteer assignment ─────────────────────────────────────────────────────
export const VOLUNTEER_ASSIGNMENT = {
  name:        'Sarah Mitchell',
  volunteerId: 'VOL-2847',
  zone:        'East Stand',
  gate:        'Gate D',
  shift:       '18:00 – 23:00 EST',
  role:        'Crowd Management',
  supervisor:  'James Okafor (OPS-112)',
  emergency:   '+1 (555) 071-3900',
  tasks: [
    { id: 1, text: 'Gate D crowd flow monitoring',      status: 'active'    },
    { id: 2, text: 'Pre-match volunteer briefing',       status: 'completed' },
    { id: 3, text: 'Emergency protocol review',          status: 'completed' },
    { id: 4, text: 'Accessibility assistance — Row 14', status: 'pending'   },
    { id: 5, text: 'Post-match dispersal coordination', status: 'pending'   },
  ],
}

// ─── Notifications ────────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 1, severity: 'critical', text: 'Gate D at 94% — immediate action required',      time: '2m ago'  },
  { id: 2, severity: 'warning',  text: 'East Stand density exceeds 90% threshold',       time: '8m ago'  },
  { id: 3, severity: 'info',     text: 'Volunteer broadcast sent to Gate D staff',        time: '15m ago' },
  { id: 4, severity: 'info',     text: 'Second half underway — BRA 2–1 GER',             time: '24m ago' },
]

// ─── Quick actions (role-keyed) ───────────────────────────────────────────────
export const QUICK_ACTIONS = {
  organizer: [
    { id: 'copilot',    label: 'Operations Copilot', icon: 'Cpu',            desc: 'AI decision support',   color: 'green' },
    { id: 'emergency',  label: 'Emergency Response',  icon: 'Shield',         desc: 'Incident management',   color: 'red'   },
    { id: 'navigation', label: 'Navigation',           icon: 'MapPin',         desc: 'Fan wayfinding intel',  color: 'blue'  },
    { id: 'broadcast',  label: 'Broadcast Alert',      icon: 'Radio',          desc: 'Send to all staff',     color: 'gold'  },
  ],
  fan: [
    { id: 'seat',       label: 'Find My Seat',         icon: 'MapPin',         desc: 'Interactive map',       color: 'green' },
    { id: 'assist',     label: 'AI Assistant',          icon: 'MessageCircle',  desc: 'Ask in any language',   color: 'blue'  },
    { id: 'emergency',  label: 'Emergency Help',        icon: 'Shield',         desc: 'SOS & nearest medical', color: 'red'   },
    { id: 'facilities', label: 'Facilities',            icon: 'Compass',        desc: 'Food, toilets & info',  color: 'gold'  },
  ],
  volunteer: [
    { id: 'emergency',  label: 'Emergency Response',   icon: 'Shield',          desc: 'Activate protocol',     color: 'red'   },
    { id: 'brief',      label: 'View AI Brief',         icon: 'Cpu',             desc: 'Pre-match briefing',    color: 'green' },
    { id: 'zone',       label: 'Zone Map',              icon: 'MapPin',          desc: 'My assigned area',      color: 'blue'  },
    { id: 'report',     label: 'Report Incident',       icon: 'Radio',           desc: 'Flag an issue',         color: 'gold'  },
  ],
}
