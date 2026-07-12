import { Cpu, Shield, MapPin, Radio, MessageCircle, Compass } from 'lucide-react'
import { useAuth } from '@/store/AuthContext'
import { QUICK_ACTIONS } from '@/utils/dashboardData'
import { cn } from '@/utils/cn'

// Maps string keys stored in data to real Lucide components
const ICON_MAP = { Cpu, Shield, MapPin, Radio, MessageCircle, Compass }

// Per-color button styles (background, border, icon, desc)
const COLOR_MAP = {
  green: {
    wrap: 'bg-stadium-500/[0.08] hover:bg-stadium-500/[0.15] border-stadium-500/[0.2] hover:border-stadium-500/[0.4]',
    icon: 'bg-stadium-500/15 text-stadium-400',
    text: 'text-white',
  },
  red: {
    wrap: 'bg-red-500/[0.08] hover:bg-red-500/[0.15] border-red-500/[0.2] hover:border-red-500/[0.4]',
    icon: 'bg-red-500/15 text-red-400',
    text: 'text-white',
  },
  blue: {
    wrap: 'bg-blue-500/[0.08] hover:bg-blue-500/[0.15] border-blue-500/[0.2] hover:border-blue-500/[0.4]',
    icon: 'bg-blue-500/15 text-blue-400',
    text: 'text-white',
  },
  gold: {
    wrap: 'bg-gold-500/[0.08] hover:bg-gold-500/[0.15] border-gold-500/[0.2] hover:border-gold-500/[0.4]',
    icon: 'bg-gold-500/15 text-gold-400',
    text: 'text-white',
  },
}

/**
 * Quick Actions widget.
 * Renders a 2×2 grid of large action buttons whose labels and colors
 * vary based on the authenticated user's role.
 */
export function QuickActions() {
  const { role } = useAuth()
  const actions  = QUICK_ACTIONS[role] ?? QUICK_ACTIONS.organizer

  return (
    <div className="glass rounded-2xl h-full" role="region" aria-label="Quick actions">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.06]">
        <h3 className="text-white/60 text-[11px] font-black tracking-widest uppercase">
          Quick Actions
        </h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon   = ICON_MAP[action.icon] ?? Cpu
            const colors = COLOR_MAP[action.color] ?? COLOR_MAP.green

            return (
              <button
                key={action.id}
                type="button"
                className={cn(
                  'flex flex-col items-start gap-3 p-4 rounded-2xl border',
                  'transition-all duration-200 active:scale-[0.97] text-left group',
                  colors.wrap,
                )}
                aria-label={`${action.label}: ${action.desc}`}
              >
                {/* Icon badge */}
                <div className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center',
                  'group-hover:scale-110 transition-transform duration-200',
                  colors.icon,
                )}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>

                {/* Labels */}
                <div>
                  <div className={cn('font-bold text-sm leading-tight', colors.text)}>
                    {action.label}
                  </div>
                  <div className="text-white/30 text-xs mt-0.5 leading-snug">
                    {action.desc}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
