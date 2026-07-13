/**
 * features/navigation/QuickNavCards.jsx
 * Six quick-access shortcut cards for the most common destinations.
 */
import {
  Armchair, Waves, UtensilsCrossed, HeartPulse, Car, DoorOpen,
} from 'lucide-react'
import { QUICK_NAV } from '@/utils/navigationData'
import { cn } from '@/utils/cn'

// ─── Icon resolver ─────────────────────────────────────────────────────────────
const ICON_MAP = { Armchair, Waves, UtensilsCrossed, HeartPulse, Car, DoorOpen }

const colorMap = {
  green:   { icon: 'text-stadium-400', bg: 'bg-stadium-500/15 border-stadium-500/25', hover: 'hover:border-stadium-500/50 hover:shadow-[0_8px_32px_rgba(0,168,84,0.15)]' },
  blue:    { icon: 'text-blue-400',    bg: 'bg-blue-500/15 border-blue-500/25',        hover: 'hover:border-blue-500/50 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)]'   },
  gold:    { icon: 'text-gold-400',    bg: 'bg-gold-500/15 border-gold-500/25',        hover: 'hover:border-gold-500/50 hover:shadow-[0_8px_32px_rgba(212,160,23,0.15)]'   },
  red:     { icon: 'text-red-400',     bg: 'bg-red-500/15 border-red-500/25',          hover: 'hover:border-red-500/50 hover:shadow-[0_8px_32px_rgba(239,68,68,0.15)]'     },
  default: { icon: 'text-white/50',    bg: 'bg-white/[0.06] border-white/[0.1]',      hover: 'hover:border-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]'     },
}

// ─── Single card ───────────────────────────────────────────────────────────────
function QuickNavCard({ item, onClick }) {
  const Icon   = ICON_MAP[item.icon]
  const colors = colorMap[item.color] ?? colorMap.default

  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className={cn(
        'glass rounded-xl p-4 text-left flex items-start gap-3',
        'border transition-all duration-200',
        'hover:-translate-y-1 active:scale-[0.98]',
        colors.hover,
      )}
      aria-label={`Navigate to ${item.label}`}
    >
      {/* Icon */}
      <div className={cn(
        'w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0',
        colors.bg,
      )}>
        {Icon && <Icon className={cn('w-5 h-5', colors.icon)} aria-hidden="true" />}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <div className="text-white text-sm font-bold leading-snug">{item.label}</div>
        <div className="text-white/35 text-[10px] mt-0.5 leading-snug truncate">{item.sub}</div>
      </div>
    </button>
  )
}

// ─── Grid ──────────────────────────────────────────────────────────────────────
/**
 * 2×3 grid of quick navigation shortcut cards.
 *
 * @param {Function} onSelect - Called with the QUICK_NAV item that was clicked
 */
export function QuickNavCards({ onSelect }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-white/40 text-[11px] font-black uppercase tracking-widest">Quick Navigation</span>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        role="list"
        aria-label="Quick navigation shortcuts"
      >
        {QUICK_NAV.map((item) => (
          <div key={item.id} role="listitem">
            <QuickNavCard item={item} onClick={onSelect} />
          </div>
        ))}
      </div>
    </div>
  )
}
