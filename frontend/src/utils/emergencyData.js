/**
 * emergencyData.js
 * Realistic demo data for the Emergency & Safety module.
 * MetLife Stadium — FIFA World Cup 2026 Quarter Final
 */

// ─── Active incidents ──────────────────────────────────────────────────────────
export const ACTIVE_INCIDENTS = [
  {
    id:          'INC-001',
    type:        'medical',
    title:       'Medical Emergency',
    description: 'Fan reported chest pain near concourse.',
    priority:    'critical',
    location:    'Section B, Row 14',
    gate:        'Gate D',
    reportedAt:  '20:34',
    reportedAgo: '6 min ago',
    assignedTeam:'Medical Unit Alpha',
    responders:  3,
    status:      'responding',
    progress:    70,
    eta:         '2 min',
  },
  {
    id:          'INC-002',
    type:        'lost_child',
    title:       'Lost Child',
    description: 'Child (approx. 7 yrs, red shirt) separated from parent.',
    priority:    'high',
    location:    'South Concourse, Food Court 2',
    gate:        'Gate C',
    reportedAt:  '20:28',
    reportedAgo: '12 min ago',
    assignedTeam:'Security Team Bravo',
    responders:  2,
    status:      'active',
    progress:    40,
    eta:         '5 min',
  },
  {
    id:          'INC-003',
    type:        'security',
    title:       'Security Incident',
    description: 'Crowd altercation reported in North Stand.',
    priority:    'high',
    location:    'North Stand, Row 7',
    gate:        'Gate A',
    reportedAt:  '20:41',
    reportedAgo: '1 min ago',
    assignedTeam:'Security Control Alpha',
    responders:  4,
    status:      'dispatched',
    progress:    20,
    eta:         '3 min',
  },
  {
    id:          'INC-004',
    type:        'fire',
    title:       'Fire Alert',
    description: 'Smoke detector triggered in storage room B-12.',
    priority:    'medium',
    location:    'Storage B-12, Level 1',
    gate:        'Gate B',
    reportedAt:  '20:15',
    reportedAgo: '27 min ago',
    assignedTeam:'Fire Safety Unit',
    responders:  2,
    status:      'resolved',
    progress:    100,
    eta:         '—',
  },
  {
    id:          'INC-005',
    type:        'medical',
    title:       'Medical — Minor Injury',
    description: 'Fan slipped on wet surface near restrooms.',
    priority:    'low',
    location:    'East Concourse, Restroom 3',
    gate:        'Gate B',
    reportedAt:  '20:38',
    reportedAgo: '4 min ago',
    assignedTeam:'Medical Unit Beta',
    responders:  1,
    status:      'responding',
    progress:    55,
    eta:         '1 min',
  },
]

// ─── Incident timeline ─────────────────────────────────────────────────────────
export const INCIDENT_TIMELINE = [
  { id: 't1', time: '20:41', type: 'security', event: 'Security Incident reported — North Stand Row 7',    status: 'alert'    },
  { id: 't2', time: '20:38', type: 'medical',  event: 'Minor injury reported — East Concourse',           status: 'info'     },
  { id: 't3', time: '20:34', type: 'medical',  event: 'Medical Emergency — chest pain, Section B',        status: 'critical' },
  { id: 't4', time: '20:31', type: 'general',  event: 'Security Team Bravo dispatched to Gate C',         status: 'info'     },
  { id: 't5', time: '20:28', type: 'lost',     event: 'Lost Child report received — South Concourse',     status: 'alert'    },
  { id: 't6', time: '20:22', type: 'general',  event: 'Medical Unit Alpha status: en route to Section B', status: 'info'     },
  { id: 't7', time: '20:15', type: 'fire',     event: 'Fire Alert triggered — Storage B-12',              status: 'alert'    },
  { id: 't8', time: '20:08', type: 'general',  event: 'Fire Safety Unit confirmed false alarm, resolved', status: 'resolved' },
  { id: 't9', time: '19:55', type: 'general',  event: 'All pre-match safety checks completed',            status: 'resolved' },
]

// ─── Volunteer assigned incident ───────────────────────────────────────────────
export const VOLUNTEER_INCIDENT = {
  id:          'INC-001',
  type:        'medical',
  title:       'Medical Emergency',
  description: 'Fan reported chest pain near concourse. Stay calm and clear the area. Do not move the patient.',
  priority:    'critical',
  location:    'Section B, Row 14',
  coordinates: 'North-East Quadrant, Level 2',
  assignedAt:  '20:34',
  eta:         '2 min',
  currentTask: 'Proceed to Section B immediately. Clear 5m radius. Await Medical Unit Alpha.',
  status:      'en_route',
  supervisor:  'James Okafor (OPS-112)',
  protocol:    'MEDICAL-P3',
}

// ─── Fan emergency action buttons ─────────────────────────────────────────────
export const FAN_EMERGENCY_ACTIONS = [
  {
    id:      'medical',
    label:   'Medical Help',
    icon:    'HeartPulse',
    color:   'red',
    desc:    'Request immediate medical assistance',
    modal: {
      title:   'Medical Help Requested',
      body:    'A medical team has been notified and is being dispatched to your location. Please stay where you are and remain calm.',
      action:  'Nearest Medical: Gate D, Ground Floor',
      eta:     'Estimated arrival: 3 min',
      phone:   '+1 (555) 071-3900',
    },
  },
  {
    id:      'incident',
    label:   'Report Incident',
    icon:    'AlertTriangle',
    color:   'orange',
    desc:    'Report suspicious activity or safety issue',
    modal: {
      title:   'Incident Reported',
      body:    'Your report has been sent to the Security Control Room. A team will be dispatched shortly.',
      action:  'Security Control: Gate A, Level 1',
      eta:     'Estimated response: 5 min',
      phone:   '+1 (555) 071-3901',
    },
  },
  {
    id:      'lost_found',
    label:   'Lost & Found',
    icon:    'Search',
    color:   'blue',
    desc:    'Report a missing person or lost item',
    modal: {
      title:   'Lost & Found Assistance',
      body:    'Please visit the Lost & Found desk or a volunteer will assist you. All reports are logged immediately.',
      action:  'Lost & Found: Information Desk, Gate A',
      eta:     'Open throughout match day',
      phone:   '+1 (555) 071-3905',
    },
  },
  {
    id:      'security',
    label:   'Security',
    icon:    'ShieldAlert',
    color:   'yellow',
    desc:    'Contact stadium security immediately',
    modal: {
      title:   'Security Contacted',
      body:    'Stadium security has been notified. Please stay in your current location. Do not confront anyone.',
      action:  'Nearest Security: Gate D Checkpoint',
      eta:     'Estimated arrival: 2 min',
      phone:   '+1 (555) 071-3902',
    },
  },
  {
    id:      'exit',
    label:   'Emergency Exit',
    icon:    'DoorOpen',
    color:   'green',
    desc:    'Find the nearest emergency exit route',
    modal: {
      title:   'Nearest Emergency Exits',
      body:    'Follow the green illuminated signs to the nearest exit. Volunteers are stationed at every exit to assist you.',
      action:  'Exit A — Section 100 Ground Floor\nExit B — Section 200 Ground Floor',
      eta:     'Both exits are currently clear',
      phone:   null,
    },
  },
  {
    id:      'volunteer',
    label:   'Call Volunteer',
    icon:    'Users',
    color:   'purple',
    desc:    'Flag down a nearby stadium volunteer',
    modal: {
      title:   'Volunteer Requested',
      body:    'A volunteer has been notified and is being directed to your area. Look for the orange vest.',
      action:  'Volunteer Desk: Gate B, Level 1',
      eta:     'Estimated arrival: 1 min',
      phone:   '+1 (555) 071-3903',
    },
  },
]

// ─── Emergency contacts ────────────────────────────────────────────────────────
export const EMERGENCY_CONTACTS = [
  {
    id:      'medical',
    label:   'Medical Team',
    number:  '+1 (555) 071-3900',
    icon:    'HeartPulse',
    status:  'active',
    desc:    'Medical Unit Alpha & Beta on standby',
  },
  {
    id:      'security',
    label:   'Security Control',
    number:  '+1 (555) 071-3901',
    icon:    'ShieldCheck',
    status:  'active',
    desc:    'Command centre — available 24/7',
  },
  {
    id:      'volunteer',
    label:   'Volunteer Desk',
    number:  '+1 (555) 071-3903',
    icon:    'Users',
    status:  'active',
    desc:    'Coordination desk at Gate B',
  },
  {
    id:      'police',
    label:   'Police',
    number:  '911',
    icon:    'BadgeCheck',
    status:  'active',
    desc:    'New Jersey State Police — on site',
  },
  {
    id:      'fire',
    label:   'Fire Service',
    number:  '911',
    icon:    'Flame',
    status:  'standby',
    desc:    'Fire Safety Unit stationed at Gate A',
  },
]

// ─── Broadcast messages (multi-language) ──────────────────────────────────────
export const BROADCAST_MESSAGES = {
  en: {
    lang:    'English',
    title:   'Stadium Announcement',
    message: 'Medical assistance has been dispatched to Section B. Please remain calm and follow volunteer instructions. Stay in your seat unless directed otherwise.',
  },
  es: {
    lang:    'Español',
    title:   'Anuncio del Estadio',
    message: 'Se ha enviado asistencia médica a la Sección B. Por favor, mantenga la calma y siga las instrucciones de los voluntarios. Permanezca en su asiento a menos que se le indique lo contrario.',
  },
  fr: {
    lang:    'Français',
    title:   'Annonce du Stade',
    message: 'Une assistance médicale a été envoyée à la Section B. Veuillez rester calme et suivre les instructions des bénévoles. Restez dans votre siège sauf indication contraire.',
  },
  hi: {
    lang:    'हिंदी',
    title:   'स्टेडियम घोषणा',
    message: 'सेक्शन B में चिकित्सा सहायता भेजी गई है। कृपया शांत रहें और स्वयंसेवकों के निर्देशों का पालन करें। जब तक अन्यथा निर्देश न दिया जाए, अपनी सीट पर बने रहें।',
  },
}

// ─── Organizer summary stats ───────────────────────────────────────────────────
export const ORGANIZER_STATS = [
  { label: 'Active Incidents', value: 3, color: 'red',    icon: 'AlertOctagon' },
  { label: 'Responding Units', value: 8, color: 'yellow', icon: 'Users'        },
  { label: 'Resolved Today',   value: 4, color: 'green',  icon: 'CheckCircle2' },
  { label: 'Avg Response',     value: '3.2m', color: 'blue', icon: 'Clock'    },
]

// ─── Priority config ──────────────────────────────────────────────────────────
export const PRIORITY_CONFIG = {
  critical: { label: 'Critical', badge: 'red',    dot: 'bg-red-500',    border: 'border-red-500/40',    bg: 'bg-red-500/10'    },
  high:     { label: 'High',     badge: 'gold',   dot: 'bg-orange-500', border: 'border-orange-500/40', bg: 'bg-orange-500/10' },
  medium:   { label: 'Medium',   badge: 'yellow', dot: 'bg-yellow-500', border: 'border-yellow-500/40', bg: 'bg-yellow-500/10' },
  low:      { label: 'Low',      badge: 'green',  dot: 'bg-stadium-500',border: 'border-stadium-500/40',bg: 'bg-stadium-500/10'},
}

// ─── Status config ────────────────────────────────────────────────────────────
export const STATUS_CONFIG = {
  responding:  { label: 'Responding',  color: 'text-stadium-400', bg: 'bg-stadium-500/15 border-stadium-500/30' },
  active:      { label: 'Active',      color: 'text-orange-400',  bg: 'bg-orange-500/15 border-orange-500/30'   },
  dispatched:  { label: 'Dispatched',  color: 'text-blue-400',    bg: 'bg-blue-500/15 border-blue-500/30'       },
  resolved:    { label: 'Resolved',    color: 'text-white/40',    bg: 'bg-white/[0.06] border-white/[0.1]'      },
  en_route:    { label: 'En Route',    color: 'text-yellow-400',  bg: 'bg-yellow-500/15 border-yellow-500/30'   },
}

// ─── Incident type icons ──────────────────────────────────────────────────────
export const INCIDENT_TYPE_CONFIG = {
  medical:    { icon: 'HeartPulse',    color: 'text-red-400',    bg: 'bg-red-500/15 border-red-500/30'         },
  lost_child: { icon: 'Search',        color: 'text-blue-400',   bg: 'bg-blue-500/15 border-blue-500/30'       },
  security:   { icon: 'ShieldAlert',   color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30'   },
  fire:       { icon: 'Flame',         color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/30'   },
  general:    { icon: 'Info',          color: 'text-white/50',   bg: 'bg-white/[0.06] border-white/[0.1]'      },
  lost:       { icon: 'MapPin',        color: 'text-blue-400',   bg: 'bg-blue-500/15 border-blue-500/30'       },
}
