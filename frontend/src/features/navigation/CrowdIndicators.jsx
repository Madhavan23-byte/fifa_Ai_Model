/**
 * features/navigation/CrowdIndicators.jsx
 * Stadium-wide crowd density status bar for all zones and gates.
 */
import { Users, TrendingUp } from 'lucide-react'
import { CROWD_ZONES, GATES } from '@/utils/dashboardData'
import { CROWD_CONFIG } from '@/utils/navigationData'
import { Badge } from '@/components/common'
import { cn }   from '@/utils/cn'

// ─── Density bar ───────────────────────────────────────────────────────────────
function DensityBar({ density }) {
  const color =
    density >= 90 ? 'bg-red-500'
    : density >= 70 ? 'bg-orange-500'
    : density >= 50 ? 'bg-yellow-500'
    : 'bg-stadium-500'

  return (
    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden" aria-hidden="true">
      <div
        className={cn('h-full rounded-full transition-all duration-700', color)}
        style={{ width: `${density}%` }}
      />
    </div>
  )
}

// ─── Zone row ──────────────────────────────────────────────────────────────────
function ZoneRow({ name, density, status }) {
  const cfg   = CROWD_CONFIG[status] ?? CROWD_CONFIG.low
  const label = cfg.label

  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
      <div className="w-24 flex-shrink-0">
        <div className="text-white/70 text-xs font-semibold truncate">{name}</div>
      </div>
      <DensityBar density={density} />
      <div className="w-14 text-right flex-shrink-0 flex items-center justify-end gap-1.5">
        <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', cfg.dot)} aria-hidden="true" />
        <span className={cn('text-xs font-bold', cfg.color)}>{density}%</span>
      </div>
      <Badge variant={cfg.badge} size="sm" className="flex-shrink-0 hidden sm:inline-flex">
        {label}
      </Badge>
    </div>
  )
}

// ─── Component ─────────────────────────────────────────────────────────────────
/**
 * Full crowd indicator panel — shows density bars for all zones and gates.
 */
export function CrowdIndicators() {
  return (
    <div className="glass rounded-2xl p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-stadium-500/15 border border-stadium-500/25 flex items-center justify-center">
          <Users className="w-4 h-4 text-stadium-400" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-white font-bold text-sm">Crowd Indicators</h2>
          <p className="text-white/35 text-[11px]">Real-time density across all zones</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-stadium-400">
          <TrendingUp className="w-3 h-3" aria-hidden="true" />
          <span className="text-[10px] font-bold">LIVE</span>
        </div>
      </div>

      {/* Zones */}
      <div>
        <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-2">Seating Zones</div>
        <div>
          {CROWD_ZONES.map((zone) => (
            <ZoneRow
              key={zone.id}
              name={zone.name}
              density={zone.density}
              status={zone.status}
            />
          ))}
        </div>
      </div>

      {/* Gates */}
      <div>
        <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-2">Stadium Gates</div>
        <div>
          {GATES.map((gate) => (
            <ZoneRow
              key={gate.id}
              name={gate.name}
              density={gate.capacity}
              status={gate.status === 'open' ? 'low' : gate.status === 'busy' ? 'medium' : 'critical'}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-1 border-t border-white/[0.06]">
        {[
          { color: 'bg-stadium-500', label: 'Low (<50%)'   },
          { color: 'bg-yellow-500',  label: 'Moderate'     },
          { color: 'bg-orange-500',  label: 'Busy (>70%)'  },
          { color: 'bg-red-500',     label: 'Critical'     },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={cn('w-2.5 h-2.5 rounded-sm flex-shrink-0', color)} aria-hidden="true" />
            <span className="text-white/30 text-[10px]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
