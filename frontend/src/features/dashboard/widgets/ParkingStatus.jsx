import { Car } from 'lucide-react'
import { PARKING } from '@/utils/dashboardData'
import { Badge } from '@/components/common'
import { cn } from '@/utils/cn'

const STATUS_CFG = {
  available: { variant: 'green',  label: 'Available', bar: 'bg-stadium-500' },
  limited:   { variant: 'yellow', label: 'Limited',   bar: 'bg-yellow-500'  },
  full:      { variant: 'red',    label: 'Full',       bar: 'bg-red-500'     },
}

/**
 * Parking Status widget.
 * Overall occupancy summary + per-lot breakdown with progress bars.
 */
export function ParkingStatus() {
  const totalOccupied = PARKING.reduce((s, p) => s + p.occupied, 0)
  const totalCapacity = PARKING.reduce((s, p) => s + p.total,    0)
  const overallPct    = Math.round((totalOccupied / totalCapacity) * 100)

  return (
    <div className="glass rounded-2xl h-full" role="region" aria-label="Parking status">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <h3 className="text-white/60 text-[11px] font-black tracking-widest uppercase">
          Parking
        </h3>
        <Car className="w-4 h-4 text-white/20" aria-hidden="true" />
      </div>

      <div className="p-5 space-y-4">
        {/* Overall summary card */}
        <div className="glass rounded-xl px-4 py-3 flex items-center justify-between border border-white/[0.06]">
          <div>
            <div
              className="text-2xl font-black text-white"
              aria-label={`Overall parking: ${overallPct}% occupied`}
            >
              {overallPct}%
            </div>
            <div className="text-white/35 text-xs mt-0.5">Overall Occupancy</div>
          </div>
          <div className="text-right">
            <div className="text-white/60 font-semibold text-sm">
              {totalOccupied.toLocaleString()}
            </div>
            <div className="text-white/25 text-xs">of {totalCapacity.toLocaleString()}</div>
          </div>
        </div>

        {/* Per-lot breakdown */}
        <div className="space-y-3">
          {PARKING.map((lot) => {
            const cfg = STATUS_CFG[lot.status] ?? STATUS_CFG.available
            const pct = Math.round((lot.occupied / lot.total) * 100)
            return (
              <div key={lot.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/55 text-xs font-medium">{lot.zone}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs tabular-nums">{pct}%</span>
                    <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>
                  </div>
                </div>
                <div
                  className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"
                  role="meter"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${lot.zone}: ${pct}% occupied`}
                >
                  <div
                    className={cn('h-full rounded-full', cfg.bar)}
                    style={{ width: `${pct}%` }}
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
