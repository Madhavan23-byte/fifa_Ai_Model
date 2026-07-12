import { Zap, Eye, Radio } from 'lucide-react'
import { SectionTitle, PageContainer } from '@/components/ui'
import { WHY_FEATURES } from '@/utils/constants'
import { cn } from '@/utils/cn'

// Map icon key strings to Lucide components
const ICON_MAP = { Zap, Eye, Radio }

// Accent style map per color key
const ACCENT = {
  stadium: {
    icon:        'bg-stadium-500/[0.12] border-stadium-500/[0.2]',
    iconText:    'text-stadium-400',
    stat:        'text-stadium-400',
    borderHover: 'hover:border-stadium-500/[0.3]',
    glow:        'hover:shadow-[0_24px_72px_rgba(0,168,84,0.1)]',
  },
  gold: {
    icon:        'bg-gold-500/[0.12] border-gold-500/[0.2]',
    iconText:    'text-gold-400',
    stat:        'text-gold-400',
    borderHover: 'hover:border-gold-500/[0.3]',
    glow:        'hover:shadow-[0_24px_72px_rgba(212,160,23,0.1)]',
  },
  blue: {
    icon:        'bg-blue-500/[0.12] border-blue-500/[0.2]',
    iconText:    'text-blue-400',
    stat:        'text-blue-400',
    borderHover: 'hover:border-blue-500/[0.3]',
    glow:        'hover:shadow-[0_24px_72px_rgba(59,130,246,0.1)]',
  },
}

// ─── Why card ─────────────────────────────────────────────────────────────────
function WhyCard({ feature }) {
  const Icon   = ICON_MAP[feature.icon]
  const accent = ACCENT[feature.accentColor] ?? ACCENT.stadium

  return (
    <article
      className={cn(
        'glass rounded-3xl p-8 flex flex-col gap-6 group',
        'border border-white/[0.08] transition-all duration-300',
        'hover:-translate-y-1.5',
        accent.borderHover,
        accent.glow,
      )}
      aria-label={feature.title}
    >
      {/* Icon */}
      <div
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center border',
          accent.icon,
          'group-hover:scale-110 transition-transform duration-300',
        )}
        aria-hidden="true"
      >
        {Icon && <Icon className={cn('w-6 h-6', accent.iconText)} />}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <h3 className="text-white font-bold text-xl">{feature.title}</h3>
        <p className={cn('text-sm font-semibold', accent.stat)}>
          {feature.subtitle}
        </p>
        <p className="text-white/40 text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/[0.06]">
        {feature.stats.map((stat) => (
          <div key={stat.label}>
            <div className={cn('text-2xl font-black', accent.stat)}>
              {stat.value}
            </div>
            <div className="text-white/30 text-xs font-medium mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
/**
 * "Why StadiumOps AI" section — three premium feature blocks:
 * Decision Support, Operational Intelligence, Real-Time Coordination.
 */
export function WhySection() {
  return (
    <section
      id="about"
      aria-label="Why StadiumOps AI section"
      className="py-24 lg:py-32 relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-gold-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-stadium-600/[0.05] rounded-full blur-[100px]" />
      </div>

      <PageContainer className="relative">
        <SectionTitle
          eyebrow="Why StadiumOps AI"
          title="Built for the world's"
          highlight="biggest stage"
          subtitle="Three core pillars that make StadiumOps AI the definitive operations platform for major football tournaments."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_FEATURES.map((feature) => (
            <WhyCard key={feature.id} feature={feature} />
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
