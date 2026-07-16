import { Clock, MapPin, Radio } from 'lucide-react'
import { Badge } from '@/components/common'
import { SectionTitle, PageContainer } from '@/components/ui'
import { useMatch } from '@/store/MatchContext'
import { cn } from '@/utils/cn'

// ─── Gate status row ──────────────────────────────────────────────────────────
const GATE_CONFIG = {
  open:     { variant: 'green',  label: 'Open'     },
  busy:     { variant: 'yellow', label: 'Busy'     },
  critical: { variant: 'red',    label: 'Critical' },
}

function GateRow({ gate }) {
  const cfg = GATE_CONFIG[gate.status] ?? GATE_CONFIG.open
  const barColor = {
    open:     'bg-stadium-500',
    busy:     'bg-yellow-500',
    critical: 'bg-red-500',
  }[gate.status]

  return (
    <div className="flex items-center justify-between glass rounded-xl px-4 py-2.5">
      <span className="text-sm font-medium text-white/60">{gate.name}</span>
      <div className="flex items-center gap-3">
        {/* Capacity bar */}
        <div className="w-20 h-1.5 bg-white/[0.08] rounded-full overflow-hidden" aria-hidden="true">
          <div
            className={cn('h-full rounded-full transition-all duration-700', barColor)}
            style={{ width: `${gate.capacity}%` }}
          />
        </div>
        <span className="text-white/30 text-xs w-8 text-right">{gate.capacity}%</span>
        <Badge variant={cfg.variant} dot pulse={gate.status === 'critical'} size="sm">
          {cfg.label}
        </Badge>
      </div>
    </div>
  )
}

// ─── Parking status row ───────────────────────────────────────────────────────
const PARKING_CONFIG = {
  available: { variant: 'green',  label: 'Available' },
  full:      { variant: 'red',    label: 'Full'      },
  limited:   { variant: 'yellow', label: 'Limited'   },
}

function ParkingRow({ zone, status }) {
  const cfg = PARKING_CONFIG[status] ?? PARKING_CONFIG.available
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/40 font-medium">{zone}</span>
      <Badge variant={cfg.variant} size="sm" dot>{cfg.label}</Badge>
    </div>
  )
}

// ─── Stadium capacity bar ─────────────────────────────────────────────────────
function CapacityBar({ occupied, total }) {
  const pct = Math.round((occupied / total) * 100)
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/40 font-medium">Stadium Capacity</span>
        <span className="text-white font-bold">
          {pct}%
          <span className="text-white/25 font-normal text-xs ml-1">
            ({occupied.toLocaleString()} / {total.toLocaleString()})
          </span>
        </span>
      </div>
      <div
        className="h-2 bg-white/[0.07] rounded-full overflow-hidden"
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% of stadium capacity filled`}
      >
        <div
          className="h-full bg-gradient-to-r from-stadium-600 to-stadium-400 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
/**
 * Live Match Preview section.
 * Displays a rich match-day operations card with demo data:
 * gate status, parking, weather, and stadium capacity.
 */
export function MatchPreviewSection() {
  const match = useMatch()
  const { homeTeam, awayTeam, kickoff, venue, date, gates, parking, weather, capacity } = match

  return (
    <section
      className="py-24 lg:py-32 relative"
      aria-label="Live match preview section"
    >
      {/* Gold ambient bloom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gold-500/[0.04] rounded-full blur-[130px]" />
        <div className="absolute top-0  left-0  w-[500px] h-[300px] bg-stadium-500/[0.04] rounded-full blur-[130px]" />
      </div>

      <PageContainer className="relative">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── Left — section intro ───────────────────────────────── */}
          <div className="space-y-7">
            <SectionTitle
              eyebrow="Match Day Intelligence"
              title="Real-time match"
              highlight="operations view"
              subtitle="Everything teams need at a glance — gate status, crowd density, weather and live match data in one unified interface."
              centered={false}
            />

            {/* Bullet list */}
            <ul className="space-y-3.5" aria-label="Key capabilities">
              {[
                'Live gate congestion monitoring',
                'AI-generated crowd predictions',
                'Unified staff communication',
                'Instant broadcast alerts to all volunteers',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-stadium-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-white/55 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right — match operations card ────────────────────── */}
          <div
            className="glass-strong rounded-3xl p-6 space-y-5 border border-white/[0.12] shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            role="region"
            aria-label="Match day operations card — demo data"
          >
            {/* Card header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-stadium-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-stadium-500" />
                </span>
                <span className="text-stadium-400 text-[11px] font-black tracking-[0.2em] uppercase">
                  Match Day Live
                </span>
              </div>
              <Radio className="w-4 h-4 text-white/15" aria-hidden="true" />
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between py-3 px-2" aria-label={`${homeTeam.name} versus ${awayTeam.name}`}>
              <div className="text-center space-y-1">
                <div className="text-5xl mb-2" role="img" aria-label={homeTeam.name}>{homeTeam.flag}</div>
                <div className="text-white font-black text-xl tracking-wide">{homeTeam.code}</div>
                <div className="text-white/35 text-xs">{homeTeam.name}</div>
              </div>

              <div className="text-center flex flex-col items-center gap-2 flex-1 px-3">
                <span className="text-white/20 text-xs font-bold tracking-widest uppercase">vs</span>
                <div className="glass rounded-xl px-4 py-2 border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 text-white/50 text-xs font-medium">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    <span aria-label={`Kickoff at ${kickoff}`}>{kickoff}</span>
                  </div>
                </div>
                <span className="text-white/25 text-[11px]">{date.split(',')[0]}</span>
              </div>

              <div className="text-center space-y-1">
                <div className="text-5xl mb-2" role="img" aria-label={awayTeam.name}>{awayTeam.flag}</div>
                <div className="text-white font-black text-xl tracking-wide">{awayTeam.code}</div>
                <div className="text-white/35 text-xs">{awayTeam.name}</div>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-2.5 glass rounded-xl px-4 py-3">
              <MapPin className="w-4 h-4 text-stadium-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-white/55 text-sm">{venue}</span>
            </div>

            {/* Weather grid */}
            <div>
              <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5">
                Weather Conditions
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Temp',     value: weather.temp      },
                  { label: 'Humidity', value: weather.humidity  },
                  { label: 'Wind',     value: weather.wind      },
                  { label: 'Sky',      value: weather.condition },
                ].map(({ label, value }) => (
                  <div key={label} className="glass rounded-xl p-2.5 text-center">
                    <div className="text-white/25 text-[10px] mb-1">{label}</div>
                    <div className="text-white font-semibold text-xs leading-tight">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gate status */}
            <div>
              <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5">
                Gate Status
              </p>
              <div className="space-y-2">
                {gates.map((gate) => <GateRow key={gate.name} gate={gate} />)}
              </div>
            </div>

            {/* Parking status */}
            <div>
              <p className="text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-2.5">
                Parking Status
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {parking.map(({ zone, status }) => (
                  <ParkingRow key={zone} zone={zone} status={status} />
                ))}
              </div>
            </div>

            {/* Capacity bar */}
            <div className="pt-1">
              <CapacityBar occupied={capacity.occupied} total={capacity.total} />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
