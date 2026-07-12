import { AlertTriangle } from 'lucide-react'
import { CROWD_ZONES } from '@/utils/dashboardData'
import { Badge } from '@/components/common'
import { cn } from '@/utils/cn'

const STATUS_CFG = {
  open:     { variant: 'green',  label: 'Open',     bar: 'bg-stadium-500' },
  busy:     { variant: 'yellow', label: 'Busy',     bar: 'bg-yellow-500'  },
  critical: { variant: 'red',    label: 'Critical', bar: 'bg-red-500'     },
}

/**
 * Crowd Intelligence widget.
 * Displays overall capacity and per-zone density with status badges.
 */
export function CrowdStatus() {
  const overall  = Math.round(CROWD_ZONES.reduce((s, z) => s + z.density, 0) / CROWD_ZONES.length)
  const criticals = CROWD_ZONES.filter((z) => z.status === 'critical')

  return (
    <div className="glass rounded-2xl h-full" role="region" aria-label="Crowd intelligence">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <h3 className="text-white/60 text-[11px] font-black tracking-widest uppercase">
          Crowd Intelligence
        </h3>
        {criticals.length > 0 && (
          <div className="flex items-center gap-1.5 text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-xs font-bold">{criticals.length} Critical</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Overall gauge */}
        <div className="glass rounded-2xl py-4 text-center border border-white/[0.06]">
          <div
            className={cn(
              'text-4xl font-black',
              overall >= 90 ? 'text-red-400' : overall >= 70 ? 'text-yellow-400' : 'text-stadium-400',
            )}
            aria-label={`Overall crowd capacity: ${overall}%`}
          >
            {overall}%
          </div>
          <div className="text-white/30 text-xs mt-1">Overall Capacity</div>
        </div>

        {/* Zone list */}
        <div className="space-y-3">
          {CROWD_ZONES.map((zone) => {
            const cfg = STATUS_CFG[zone.status] ?? STATUS_CFG.open
            return (
              <div key={zone.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/55 text-xs font-medium">{zone.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-xs font-bold tabular-nums">{zone.density}%</span>
                    <Badge variant={cfg.variant} size="sm" dot>{cfg.label}</Badge>
                  </div>
                </div>
                <div
                  className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"
                  role="meter"
                  aria-valuenow={zone.density}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${zone.name}: ${zone.density}% capacity`}
                >
                  <div
                    className={cn('h-full rounded-full transition-all duration-700', cfg.bar)}
                    style={{ width: `${zone.density}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
