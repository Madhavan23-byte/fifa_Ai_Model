// ─── App metadata ───────────────────────────────────────────────────────────
export const APP_NAME        = 'StadiumOps AI'
export const APP_TAGLINE     = 'AI Match Operations Command Center'
export const APP_DESCRIPTION =
  'Helping organizers, volunteers and fans make smarter real-time decisions during major football tournaments.'

// ─── Navigation ─────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
]

// ─── Feature cards ──────────────────────────────────────────────────────────
export const FEATURES = [
  {
    id: 'navigation',
    title: 'AI Navigation',
    description:
      'Smart wayfinding for 90,000+ fans with real-time directions to seats, amenities and exits in multiple languages.',
    icon: 'MapPin',
    gradient: 'from-stadium-500/20 to-stadium-800/10',
    iconColor: 'text-stadium-400',
    borderHover: 'hover:border-stadium-500/30',
    glowHover: 'hover:shadow-[0_20px_60px_rgba(0,168,84,0.1)]',
  },
  {
    id: 'crowd',
    title: 'Crowd Intelligence',
    description:
      'Real-time density monitoring and predictive AI alerts to prevent dangerous crowd build-up across all stadium zones.',
    icon: 'Users',
    gradient: 'from-blue-500/20 to-blue-800/10',
    iconColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/30',
    glowHover: 'hover:shadow-[0_20px_60px_rgba(59,130,246,0.1)]',
  },
  {
    id: 'operations',
    title: 'Operations Copilot',
    description:
      'AI-powered decision support for stadium managers with ranked action plans and real-time operational intelligence.',
    icon: 'Cpu',
    gradient: 'from-purple-500/20 to-purple-800/10',
    iconColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/30',
    glowHover: 'hover:shadow-[0_20px_60px_rgba(168,85,247,0.1)]',
  },
  {
    id: 'emergency',
    title: 'Emergency Response',
    description:
      'Instant AI triage, smart escalation and real-time incident management across all stadium zones and personnel.',
    icon: 'Shield',
    gradient: 'from-red-500/20 to-red-800/10',
    iconColor: 'text-red-400',
    borderHover: 'hover:border-red-500/30',
    glowHover: 'hover:shadow-[0_20px_60px_rgba(239,68,68,0.1)]',
  },
  {
    id: 'multilingual',
    title: 'Multilingual Assistance',
    description:
      'Converse with fans in 50+ languages. AI-powered chat that understands context and delivers instant, accurate answers.',
    icon: 'Globe',
    gradient: 'from-gold-500/20 to-gold-700/10',
    iconColor: 'text-gold-400',
    borderHover: 'hover:border-gold-500/30',
    glowHover: 'hover:shadow-[0_20px_60px_rgba(212,160,23,0.1)]',
  },
  {
    id: 'match',
    title: 'Live Match Operations',
    description:
      'Real-time match timeline, team stats and AI-generated narratives keeping all staff informed and aligned.',
    icon: 'Activity',
    gradient: 'from-teal-500/20 to-teal-800/10',
    iconColor: 'text-teal-400',
    borderHover: 'hover:border-teal-500/30',
    glowHover: 'hover:shadow-[0_20px_60px_rgba(20,184,166,0.1)]',
  },
]

// ─── "Why StadiumOps AI" section ────────────────────────────────────────────
export const WHY_FEATURES = [
  {
    id: 'decision',
    title: 'Decision Support',
    subtitle: 'AI-powered recommendations in under 3 seconds',
    description:
      'Gemini AI analyzes hundreds of real-time variables — crowd density, weather, incidents, match status — and delivers clear, ranked action plans to operations managers.',
    stats: [
      { value: '<3s',  label: 'Response Time' },
      { value: '94%',  label: 'Decision Accuracy' },
    ],
    icon: 'Zap',
    accentColor: 'stadium',
  },
  {
    id: 'intelligence',
    title: 'Operational Intelligence',
    subtitle: 'Monitor 90,000+ fans across 12 stadium zones',
    description:
      'Real-time crowd analytics with predictive density modeling ensure safety thresholds are never breached. AI-generated situation reports keep every stakeholder informed.',
    stats: [
      { value: '12',    label: 'Stadium Zones' },
      { value: '99.9%', label: 'Uptime SLA' },
    ],
    icon: 'Eye',
    accentColor: 'gold',
  },
  {
    id: 'coordination',
    title: 'Real-Time Coordination',
    subtitle: 'Instant alerts to 400+ volunteers simultaneously',
    description:
      'Broadcast critical updates to targeted staff groups in milliseconds. AI refines message clarity and selects the right audience automatically.',
    stats: [
      { value: '400+', label: 'Volunteers' },
      { value: '50+',  label: 'Languages' },
    ],
    icon: 'Radio',
    accentColor: 'blue',
  },
]

// ─── Demo match data ─────────────────────────────────────────────────────────
export const DEMO_MATCH = {
  homeTeam: { name: 'Brazil',  code: 'BRA', flag: '🇧🇷' },
  awayTeam: { name: 'Germany', code: 'GER', flag: '🇩🇪' },
  kickoff:  '20:00 EST',
  venue:    'MetLife Stadium, New Jersey',
  date:     'Sunday, 26 July 2026',
  gates: [
    { name: 'Gate A', status: 'open',     capacity: 42 },
    { name: 'Gate B', status: 'busy',     capacity: 81 },
    { name: 'Gate C', status: 'open',     capacity: 28 },
    { name: 'Gate D', status: 'critical', capacity: 94 },
  ],
  parking: [
    { zone: 'North', status: 'available' },
    { zone: 'South', status: 'full'      },
    { zone: 'East',  status: 'limited'   },
    { zone: 'West',  status: 'available' },
  ],
  weather:  { temp: '28°C', condition: 'Clear', humidity: '54%', wind: '12 km/h' },
  capacity: { total: 82500, occupied: 74250 },
}

// ─── Footer tech stack tags ──────────────────────────────────────────────────
export const TECH_STACK = [
  'React', 'Vite', 'Tailwind CSS', 'React Router',
  'FastAPI', 'Python', 'MongoDB', 'Gemini AI',
]

export const FOOTER_LINKS = {
  Features: [
    { label: 'AI Navigation',        href: '#features' },
    { label: 'Crowd Intelligence',   href: '#features' },
    { label: 'Operations Copilot',   href: '#features' },
    { label: 'Emergency Response',   href: '#features' },
    { label: 'Multilingual Support', href: '#features' },
  ],
  Platform: [
    { label: 'Fan Portal',       href: '#' },
    { label: 'Volunteer Hub',    href: '#' },
    { label: 'Command Center',   href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference',  href: '#' },
    { label: 'GitHub',         href: '#' },
  ],
}
