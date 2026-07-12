import { GATES } from '@/utils/dashboardData'
import { Badge } from '@/components/common'
import { cn } from '@/utils/cn'

const STATUS_CFG = {
  open:     { variant: 'green',  label: 'Open',     bar: 'bg-stadium-500' },
  busy:     { variant: 'yellow', label: 'Busy',     bar: 'bg-yellow-500'  },
  critical: { variant: 'red',    label: 'Critical', bar: 'bg-red-500'     },
}

/**
 * Gate Status widget.
 * Shows capacity progress bar, visitor flow rate and status badge per gate.
 */
export function GateStatus() {
  return (
    <div className="glass rounded-2xl h-full" role="region" aria-label="Gate status">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.06]">
        <h3 className="text-white/60 text-[11px] font-black tracking-widest uppercase">
          Gate Status
        </h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GATES.map((gate) => {
            const cfg = STATUS_CFG[gate.status] ?? STATUS_CFG.open
            return (
              <div
                key={gate.id}
                className="glass rounded-xl px-4 py-3 space-y-2"
                aria-label={`${gate.name}: ${gate.capacity}% capacity, status ${cfg.label}`}
              >
                {/* Gate name + status */}
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">{gate.name}</span>
                  <Badge variant={cfg.variant} dot size="sm">{cfg.label}</Badge>
                </div>

                {/* Capacity bar */}
                <div
                  className="h-2 bg-white/[0.06] rounded-full overflow-hidden"
                  role="meter"
                  aria-valuenow={gate.capacity}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${gate.capacity}% capacity`}
                >
                  <div
                    className={cn('h-full rounded-full transition-all duration-700', cfg.bar)}
                    style={{ width: `${gate.capacity}%` }}
                    aria-hidden="true"
                  />
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/35">Capacity</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white/30 font-mono">{gate.flow}/h flow</span>
                    <span className="text-white font-bold tabular-nums">{gate.capacity}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
