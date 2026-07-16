/**
 * navigationData.js
 * Realistic demo data for the Smart Stadium Navigation module.
 * MetLife Stadium, FIFA World Cup 2026 — Quarter Final: BRA vs GER
 */

// ─── Stadium areas ─────────────────────────────────────────────────────────────
export const STADIUM_AREAS = [
  // Gates
  { id: 'gate-a', type: 'gate',     label: 'Gate A',        crowd: 'low',    x: 50,  y: 8,   accessible: true  },
  { id: 'gate-b', type: 'gate',     label: 'Gate B',        crowd: 'high',   x: 87,  y: 50,  accessible: true  },
  { id: 'gate-c', type: 'gate',     label: 'Gate C',        crowd: 'low',    x: 50,  y: 90,  accessible: true  },
  { id: 'gate-d', type: 'gate',     label: 'Gate D',        crowd: 'critical', x: 13, y: 50, accessible: true  },

  // Seating sections
  { id: 'north',  type: 'section',  label: 'North Stand',   crowd: 'medium', x: 50,  y: 22,  accessible: false },
  { id: 'south',  type: 'section',  label: 'South Stand',   crowd: 'low',    x: 50,  y: 76,  accessible: true  },
  { id: 'east',   type: 'section',  label: 'East Stand',    crowd: 'high',   x: 75,  y: 50,  accessible: false },
  { id: 'west',   type: 'section',  label: 'West Stand',    crowd: 'medium', x: 25,  y: 50,  accessible: true  },
  { id: 'vip',    type: 'vip',      label: 'VIP Box',       crowd: 'low',    x: 50,  y: 50,  accessible: true  },

  // Facilities
  { id: 'food-1', type: 'food',     label: 'Food Court 1',  crowd: 'high',   x: 30,  y: 15,  accessible: true  },
  { id: 'food-2', type: 'food',     label: 'Food Court 2',  crowd: 'medium', x: 70,  y: 85,  accessible: true  },
  { id: 'rest-1', type: 'restroom', label: 'Restrooms N',   crowd: 'low',    x: 65,  y: 18,  accessible: true  },
  { id: 'rest-2', type: 'restroom', label: 'Restrooms S',   crowd: 'medium', x: 35,  y: 82,  accessible: true  },
  { id: 'med',    type: 'medical',  label: 'Medical Center', crowd: 'low',   x: 15,  y: 25,  accessible: true  },
  { id: 'park',   type: 'parking',  label: 'Parking Area',  crowd: 'medium', x: 85,  y: 20,  accessible: true  },
  { id: 'exit-1', type: 'exit',     label: 'Emergency Exit A', crowd: 'low', x: 20,  y: 90,  accessible: true  },
  { id: 'exit-2', type: 'exit',     label: 'Emergency Exit B', crowd: 'low', x: 80,  y: 90,  accessible: true  },
  
  // Extra required nodes
  { id: 'info',   type: 'info',     label: 'Information Desk', crowd: 'low', x: 50,  y: 95,  accessible: true  },
  { id: 'vol',    type: 'volunteer',label: 'Volunteer Kiosk',  crowd: 'low', x: 50,  y: 5,   accessible: true  },
]

// ─── Location options (for route finder dropdowns) ───────────────────────────
export const LOCATIONS = [
  // Special dynamic "Nearest" options
  { id: 'nearest-gate',      label: 'Nearest Gate',           icon: '🚪' },
  { id: 'nearest-exit',      label: 'Nearest Exit',           icon: '🚨' },
  { id: 'nearest-food',      label: 'Nearest Food Court',     icon: '🍔' },
  { id: 'nearest-restroom',  label: 'Nearest Restroom',       icon: '🚻' },
  { id: 'nearest-medical',   label: 'Nearest Medical Center', icon: '🏥' },
  { id: 'nearest-parking',   label: 'Nearest Parking',        icon: '🅿️' },
  { id: 'nearest-volunteer', label: 'Nearest Volunteer',      icon: '🙋' },
  { id: 'nearest-info',      label: 'Nearest Information',    icon: 'ℹ️' },

  // Specific locations
  { id: 'main-entrance', label: 'Main Entrance', icon: '🏟️' },
  { id: 'my-seat',       label: 'My Seat — Section 104, Row G', icon: '💺' },
  { id: 'gate-a',        label: 'Gate A',        icon: '🚪' },
  { id: 'gate-b',        label: 'Gate B',        icon: '🚪' },
  { id: 'gate-c',        label: 'Gate C',        icon: '🚪' },
  { id: 'gate-d',        label: 'Gate D',        icon: '🚪' },
  { id: 'food-1',        label: 'Food Court 1',  icon: '🍔' },
  { id: 'food-2',        label: 'Food Court 2',  icon: '🍔' },
  { id: 'rest-1',        label: 'Restrooms (North)', icon: '🚻' },
  { id: 'rest-2',        label: 'Restrooms (South)', icon: '🚻' },
  { id: 'med',           label: 'Medical Center', icon: '🏥' },
  { id: 'park',          label: 'Parking Area',   icon: '🅿️' },
  { id: 'exit-1',        label: 'Emergency Exit A', icon: '🚨' },
  { id: 'exit-2',        label: 'Emergency Exit B', icon: '🚨' },
  { id: 'info',          label: 'Information Desk', icon: 'ℹ️' },
  { id: 'vol',           label: 'Volunteer Kiosk',  icon: '🙋' },
]

// ─── Route data (from → to → route info) ─────────────────────────────────────
export const ROUTES = {
  default: {
    distance:    '350 m',
    walkTime:    '4 min',
    crowdStatus: 'medium',
    steps: [
      'Head straight from your current location.',
      'Turn left at the North Concourse.',
      'Follow the green signs to your destination.',
    ],
    accessibleSteps: [
      'Use the elevator near Gate A (Level 1).',
      'Follow the wide accessible corridor on Level 2.',
      'Use the designated accessible entrance.',
    ],
  },
  'main-entrance_my-seat': {
    distance:    '420 m',
    walkTime:    '5 min',
    crowdStatus: 'medium',
    steps: [
      'Enter through Gate A (recommended — low crowd).',
      'Take escalator to Level 2.',
      'Turn right, follow Section 100–110 signs.',
      'Section 104 is on your left.',
    ],
    accessibleSteps: [
      'Enter through Gate A (accessible entrance on left).',
      'Take the lift to Level 2.',
      'Follow the wide accessible pathway — Section 104 on left.',
    ],
  },
  'my-seat_food-1': {
    distance:    '180 m',
    walkTime:    '2 min',
    crowdStatus: 'high',
    steps: [
      'Exit Section 104 via the concourse aisle.',
      'Turn left toward the North Concourse.',
      'Food Court 1 is 50 m ahead on the right.',
    ],
    accessibleSteps: [
      'Exit Section 104 using accessible aisle at Row A.',
      'Turn left, use accessible route — Food Court 1 is straight ahead.',
    ],
  },
  'my-seat_rest-1': {
    distance:    '90 m',
    walkTime:    '1 min',
    crowdStatus: 'low',
    steps: [
      'Exit Section 104 right.',
      'Restrooms are immediately ahead on the North Concourse.',
    ],
    accessibleSteps: [
      'Exit Section 104 using accessible aisle.',
      'Accessible restrooms are marked with the blue symbol on your right.',
    ],
  },
  'my-seat_med': {
    distance:    '550 m',
    walkTime:    '7 min',
    crowdStatus: 'low',
    steps: [
      'Exit Section 104 and head toward Gate D.',
      'Follow the red Medical signs at every junction.',
      'Medical Center is located at Gate D, Ground Level.',
    ],
    accessibleSteps: [
      'Exit Section 104 via accessible aisle.',
      'Take lift to Ground Level.',
      'Medical Center is directly ahead — ask any volunteer.',
    ],
  },
  'my-seat_park': {
    distance:    '680 m',
    walkTime:    '8 min',
    crowdStatus: 'medium',
    steps: [
      'Exit through Gate B (East Side).',
      'Follow Parking signage across the walkway.',
      'Parking Lot B is 200 m to your right.',
    ],
    accessibleSteps: [
      'Exit through Gate A (accessible ramp on left).',
      'Follow the accessible parking route (blue signs).',
      'Accessible parking is in Lot A — first row.',
    ],
  },
}

// ─── Quick navigation shortcuts ───────────────────────────────────────────────
export const QUICK_NAV = [
  {
    id:       'my-seat',
    label:    'Find My Seat',
    sub:      'Section 104, Row G, Seat 24',
    icon:     'Armchair',
    color:    'green',
    from:     'main-entrance',
    to:       'my-seat',
  },
  {
    id:       'restroom',
    label:    'Nearest Restroom',
    sub:      'North Concourse — 90m',
    icon:     'Waves',
    color:    'blue',
    from:     'my-seat',
    to:       'rest-1',
  },
  {
    id:       'food',
    label:    'Nearest Food Court',
    sub:      'Food Court 1 — 180m',
    icon:     'UtensilsCrossed',
    color:    'gold',
    from:     'my-seat',
    to:       'food-1',
  },
  {
    id:       'medical',
    label:    'Medical Center',
    sub:      'Gate D, Ground Level',
    icon:     'HeartPulse',
    color:    'red',
    from:     'my-seat',
    to:       'med',
  },
  {
    id:       'parking',
    label:    'Parking Area',
    sub:      'North Lot — 680m',
    icon:     'Car',
    color:    'default',
    from:     'my-seat',
    to:       'park',
  },
  {
    id:       'exit',
    label:    'Emergency Exit',
    sub:      'Exit A & B — Ground Floor',
    icon:     'DoorOpen',
    color:    'red',
    from:     'my-seat',
    to:       'exit-1',
  },
]

// ─── Crowd status config ──────────────────────────────────────────────────────
export const CROWD_CONFIG = {
  low:      { label: 'Low',      color: 'text-stadium-400', bg: 'bg-stadium-500', dot: 'bg-stadium-400',  badge: 'green'   },
  medium:   { label: 'Moderate', color: 'text-yellow-400',  bg: 'bg-yellow-500',  dot: 'bg-yellow-400',   badge: 'yellow'  },
  high:     { label: 'Busy',     color: 'text-orange-400',  bg: 'bg-orange-500',  dot: 'bg-orange-400',   badge: 'gold'    },
  critical: { label: 'Critical', color: 'text-red-400',     bg: 'bg-red-500',     dot: 'bg-red-400',      badge: 'red'     },
}

// ─── Area type config (icons + colors for stadium map) ────────────────────────
export const AREA_TYPE_CONFIG = {
  gate:     { emoji: '🚪', bg: 'bg-blue-500/20',     border: 'border-blue-500/40',     text: 'text-blue-300'     },
  section:  { emoji: '💺', bg: 'bg-white/[0.06]',    border: 'border-white/[0.12]',    text: 'text-white/60'     },
  vip:      { emoji: '⭐', bg: 'bg-gold-500/20',     border: 'border-gold-500/40',     text: 'text-gold-300'     },
  food:     { emoji: '🍔', bg: 'bg-orange-500/20',   border: 'border-orange-500/40',   text: 'text-orange-300'   },
  restroom: { emoji: '🚻', bg: 'bg-cyan-500/20',     border: 'border-cyan-500/40',     text: 'text-cyan-300'     },
  medical:  { emoji: '🏥', bg: 'bg-red-500/20',      border: 'border-red-500/40',      text: 'text-red-300'      },
  parking:  { emoji: '🅿️', bg: 'bg-purple-500/20',   border: 'border-purple-500/40',   text: 'text-purple-300'   },
  exit:     { emoji: '🚨', bg: 'bg-red-600/20',      border: 'border-red-600/40',      text: 'text-red-400'      },
  info:     { emoji: 'ℹ️', bg: 'bg-indigo-500/20',   border: 'border-indigo-500/40',   text: 'text-indigo-300'   },
  volunteer:{ emoji: '🙋', bg: 'bg-green-500/20',    border: 'border-green-500/40',    text: 'text-green-300'    },
}
