import { useNavigate } from 'react-router-dom'
import { Users, Shield, Cpu, ArrowRight, Zap } from 'lucide-react'
import { useAuth, ROLES } from '@/store/AuthContext'
import { Button } from '@/components/common'
import { cn } from '@/utils/cn'

// ─── Role card data ───────────────────────────────────────────────────────────
const ROLE_CARDS = [
  {
    role:        ROLES.FAN,
    icon:        Users,
    title:       'Fan',
    tagline:     'Match Attendee',
    description: 'Navigate the stadium, receive multilingual assistance, find facilities and get AI guidance throughout your match day experience.',
    perks: [
      'AI-powered stadium navigation',
      'Multilingual chat assistance',
      'Live match updates & alerts',
    ],
    styles: {
      card:   'hover:border-stadium-500/45 hover:shadow-[0_24px_80px_rgba(0,168,84,0.1)]',
      icon:   'bg-stadium-500/15 border-stadium-500/25 text-stadium-400',
      tag:    'bg-stadium-500/12 text-stadium-400 border-stadium-500/20',
      dot:    'bg-stadium-400',
    },
  },
  {
    role:        ROLES.VOLUNTEER,
    icon:        Shield,
    title:       'Volunteer',
    tagline:     'Stadium Volunteer',
    description: 'View assigned tasks, receive emergency alerts and support crowd operations. Your role is critical to stadium safety and fan experience.',
    perks: [
      'Zone assignment dashboard',
      'AI pre-match briefing',
      'Emergency alert system',
    ],
    styles: {
      card:   'hover:border-blue-500/45 hover:shadow-[0_24px_80px_rgba(59,130,246,0.1)]',
      icon:   'bg-blue-500/15 border-blue-500/25 text-blue-400',
      tag:    'bg-blue-500/12 text-blue-400 border-blue-500/20',
      dot:    'bg-blue-400',
    },
  },
  {
    role:        ROLES.ORGANIZER,
    icon:        Cpu,
    title:       'Organizer',
    tagline:     'Operations Manager',
    description: 'Monitor stadium operations, crowd intelligence and AI decision support. Full access to the Command Center with real-time analytics.',
    perks: [
      'Real-time crowd intelligence',
      'AI decision support copilot',
      'Stadium-wide operations control',
    ],
    styles: {
      card:   'hover:border-gold-500/45 hover:shadow-[0_24px_80px_rgba(212,160,23,0.1)]',
      icon:   'bg-gold-500/15 border-gold-500/25 text-gold-400',
      tag:    'bg-gold-500/12 text-gold-400 border-gold-500/20',
      dot:    'bg-gold-400',
    },
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
/**
 * Role Selection Page.
 * Displays three glassmorphism role cards. Selecting a role stores it
 * in AuthContext and navigates immediately to /dashboard.
 */
export default function RoleSelectionPage() {
  const { selectRole } = useAuth()
  const navigate       = useNavigate()

  const handleSelect = (role) => {
    selectRole(role)
    navigate('/dashboard')
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,168,84,0.10) 0%, transparent 65%),' +
          '#040b14',
      }}
    >
      {/* Compact top bar */}
      <header className="h-16 flex items-center px-6 border-b border-white/[0.06] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-stadium-500 flex items-center justify-center shadow-[0_0_16px_rgba(0,168,84,0.4)]">
            <Zap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </div>
          <span className="font-extrabold text-white text-[15px] tracking-tight">
            StadiumOps <span className="text-stadium-400">AI</span>
          </span>
        </div>
      </header>

      {/* Centered content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Heading block */}
        <div className="text-center mb-12 space-y-4 animate-fade-up">
          <p className="text-stadium-400 text-sm font-semibold tracking-[0.2em] uppercase">
            Welcome to StadiumOps AI
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Select your role to{' '}
            <span className="text-green-gradient">get started</span>
          </h1>
          <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
            Your experience is tailored to your role. Choose the profile that matches your function at FIFA World Cup 2026.
          </p>
        </div>

        {/* Role cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl animate-fade-up animation-delay-200"
          role="list"
          aria-label="Role selection cards"
        >
          {ROLE_CARDS.map(({ role, icon: Icon, title, tagline, description, perks, styles }) => (
            <article
              key={role}
              className={cn(
                'glass rounded-3xl p-7 flex flex-col gap-6',
                'border border-white/[0.08] transition-all duration-300 hover:-translate-y-1.5',
                styles.card,
              )}
              role="listitem"
            >
              {/* Icon + tag row */}
              <div className="flex items-start justify-between">
                <div className={cn(
                  'w-14 h-14 rounded-2xl border flex items-center justify-center',
                  styles.icon,
                )}>
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <span className={cn(
                  'text-[10px] font-bold px-2.5 py-1 rounded-lg border tracking-wide',
                  styles.tag,
                )}>
                  {tagline}
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 space-y-2.5">
                <h2 className="text-white font-black text-2xl">{title}</h2>
                <p className="text-white/40 text-sm leading-relaxed">{description}</p>
              </div>

              {/* Perks list */}
              <ul className="space-y-2" aria-label={`${title} role features`}>
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2.5 text-sm text-white/55">
                    <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', styles.dot)} aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Select button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => handleSelect(role)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                aria-label={`Select the ${title} role and enter the platform`}
              >
                Select {title}
              </Button>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
