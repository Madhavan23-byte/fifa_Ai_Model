import { ArrowRight, ChevronDown, Zap, Trophy, Users } from 'lucide-react'
import { Button, Badge } from '@/components/common'

// ─── Football pitch SVG — original design ────────────────────────────────────
function PitchLines() {
  return (
    <div
      className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 480"
        className="w-full max-w-6xl opacity-[0.055] absolute bottom-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pitch boundary */}
        <rect x="40" y="10" width="1120" height="458" stroke="#00a854" strokeWidth="1.5" rx="2" />
        {/* Halfway line */}
        <line x1="600" y1="10" x2="600" y2="468" stroke="#00a854" strokeWidth="1.5" />
        {/* Centre circle */}
        <circle cx="600" cy="239" r="98" stroke="#00a854" strokeWidth="1.5" />
        {/* Centre spot */}
        <circle cx="600" cy="239" r="5" fill="#00a854" />
        {/* Left penalty area */}
        <rect x="40" y="118" width="198" height="242" stroke="#00a854" strokeWidth="1.5" />
        {/* Left goal area */}
        <rect x="40" y="168" width="72" height="142" stroke="#00a854" strokeWidth="1.5" />
        {/* Left penalty spot */}
        <circle cx="152" cy="239" r="4" fill="#00a854" />
        {/* Left arc */}
        <path d="M 238 172 Q 296 239 238 306" stroke="#00a854" strokeWidth="1.5" fill="none" />
        {/* Right penalty area */}
        <rect x="962" y="118" width="198" height="242" stroke="#00a854" strokeWidth="1.5" />
        {/* Right goal area */}
        <rect x="1088" y="168" width="72" height="142" stroke="#00a854" strokeWidth="1.5" />
        {/* Right penalty spot */}
        <circle cx="1048" cy="239" r="4" fill="#00a854" />
        {/* Right arc */}
        <path d="M 962 172 Q 904 239 962 306" stroke="#00a854" strokeWidth="1.5" fill="none" />
        {/* Corner arcs */}
        <path d="M 40  26  Q 56 10  72  10" stroke="#00a854" strokeWidth="1.5" fill="none" />
        <path d="M 1128 26  Q 1144 10 1160 10" stroke="#00a854" strokeWidth="1.5" fill="none" />
        <path d="M 40  452 Q 56 468  72 468" stroke="#00a854" strokeWidth="1.5" fill="none" />
        <path d="M 1128 452 Q 1144 468 1160 468" stroke="#00a854" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}

// ─── Ambient stadium floodlight effects ──────────────────────────────────────
function AmbientLights() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Top green bloom (stadium floodlights) */}
      <div className="absolute -top-32 left-[20%]  w-[480px] h-[480px] bg-stadium-500/[0.09] rounded-full blur-[140px]" />
      <div className="absolute -top-32 right-[20%] w-[480px] h-[480px] bg-stadium-500/[0.07] rounded-full blur-[140px]" />
      {/* Bottom green haze (pitch reflection) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[240px] bg-stadium-600/[0.08] rounded-full blur-[90px]" />
      {/* Gold corner accents */}
      <div className="absolute top-1/3 left-4  w-[320px] h-[320px] bg-gold-500/[0.04] rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-4 w-[320px] h-[320px] bg-gold-500/[0.04] rounded-full blur-[120px]" />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-100" />
    </div>
  )
}

// ─── Stats row ───────────────────────────────────────────────────────────────
const HERO_STATS = [
  { value: '16',   label: 'Host Venues',  icon: Trophy },
  { value: '48',   label: 'Matches',      icon: Zap    },
  { value: '5M+',  label: 'Fans Served',  icon: Users  },
]

import { useNavigate } from 'react-router-dom'

/**
 * Hero section — full-viewport landing with headline, CTAs, and stats.
 * Uses original football-pitch SVG background; no copyrighted assets.
 */
export function HeroSection() {
  const navigate = useNavigate()
  return (
    <section
      id="home"
      aria-label="StadiumOps AI — hero section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,168,84,0.14) 0%, transparent 70%),' +
          'radial-gradient(ellipse 60% 40% at 0%   100%, rgba(0,168,84,0.05) 0%, transparent 60%),' +
          '#040b14',
      }}
    >
      <AmbientLights />
      <PitchLines />

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-24">

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 rounded-full glass border-stadium-500/[0.25] border animate-fade-in">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-stadium-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-stadium-400" />
          </span>
          <span className="text-stadium-300 text-sm font-semibold tracking-wide">
            FIFA World Cup 2026 · Operations Platform
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black tracking-tight text-white leading-[1.04] mb-7 animate-fade-up"
        >
          AI Match Operations
          <br />
          <span className="text-green-gradient">Command Center</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white/45 font-normal max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-up animation-delay-200">
          Helping organizers, volunteers and fans make smarter real-time decisions during major football tournaments.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 animate-fade-up animation-delay-300">
          <Button
            variant="primary"
            size="xl"
            rightIcon={<ArrowRight className="w-5 h-5" />}
            aria-label="Enter the StadiumOps AI Command Center"
            onClick={() => navigate('/role-select')}
          >
            Enter Command Center
          </Button>
          <Button
            variant="secondary"
            size="xl"
            aria-label="Explore platform features"
          >
            Explore Features
          </Button>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-3 max-w-sm sm:max-w-md mx-auto animate-fade-up animation-delay-400"
          aria-label="Platform statistics"
        >
          {HERO_STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="glass rounded-2xl p-4 sm:p-5 text-center border-white/[0.06]"
            >
              <Icon className="w-4 h-4 text-stadium-400 mx-auto mb-2 opacity-80" aria-hidden="true" />
              <div className="text-2xl sm:text-3xl font-black text-white">{value}</div>
              <div className="text-[11px] text-white/35 font-medium mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-1200"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/18 font-semibold tracking-[0.3em] uppercase">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-white/15 animate-float" />
      </div>
    </section>
  )
}
