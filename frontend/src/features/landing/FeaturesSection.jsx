import {
  MapPin, Users, Cpu, Shield, Globe, Activity,
} from 'lucide-react'
import { SectionTitle, PageContainer } from '@/components/ui'
import { FEATURES } from '@/utils/constants'
import { cn } from '@/utils/cn'

// Map icon string keys from constants to actual Lucide components
const ICON_MAP = { MapPin, Users, Cpu, Shield, Globe, Activity }

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ title, description, icon, iconColor, gradient, borderHover, glowHover, index }) {
  const Icon = ICON_MAP[icon]

  return (
    <article
      className={cn(
        'glass rounded-2xl p-6 group cursor-default',
        'border border-white/[0.08] transition-all duration-300',
        'hover:-translate-y-2 hover:bg-white/[0.07]',
        borderHover,
        glowHover,
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      aria-label={`Feature: ${title}`}
    >
      {/* Icon container */}
      <div
        className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center mb-5',
          'bg-gradient-to-br',
          gradient,
          'group-hover:scale-[1.12] transition-transform duration-300',
        )}
        aria-hidden="true"
      >
        {Icon && <Icon className={cn('w-5 h-5', iconColor)} />}
      </div>

      {/* Text content */}
      <h3 className="text-white font-bold text-lg mb-2.5 group-hover:text-stadium-300 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed">
        {description}
      </p>

      {/* Bottom accent line — reveals on hover */}
      <div
        className="mt-5 h-px bg-gradient-to-r from-transparent via-stadium-500/0 to-transparent group-hover:via-stadium-500/40 transition-all duration-500"
        aria-hidden="true"
      />
    </article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
/**
 * Features preview — 6 capability cards in a responsive grid.
 * Each card lifts, glows, and reveals a green accent line on hover.
 */
export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-label="Platform features overview"
      className="py-24 lg:py-32 relative"
    >
      {/* Background bloom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-stadium-600/[0.05] rounded-full blur-[130px]" />
      </div>

      <PageContainer className="relative">
        <SectionTitle
          eyebrow="Platform Capabilities"
          title="Everything you need to"
          highlight="run match day"
          subtitle="Six powerful AI-driven modules working together to create a seamless match-day operations experience."
          className="mb-16"
        />

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Feature cards"
        >
          {FEATURES.map((feature, index) => (
            <div role="listitem" key={feature.id}>
              <FeatureCard {...feature} index={index} />
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
