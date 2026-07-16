/**
 * features/emergency/IncidentCard.jsx
 * Reusable incident status card used in both Dashboard and Organizer views.
 */
import {
  HeartPulse, Search, ShieldAlert, Flame, Info, MapPin,
  Clock, Users, ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/common'
import { cn }   from '@/utils/cn'
import {
  PRIORITY_CONFIG, STATUS_CONFIG, INCIDENT_TYPE_CONFIG,
} from '@/utils/emergencyData'

const ICON_MAP = { HeartPulse, Search, ShieldAlert, Flame, Info, MapPin }

// ─── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ value, priority }) {
  const color =
    priority === 'critical' ? 'bg-red-500'
    : priority === 'high'   ? 'bg-orange-500'
    : priority === 'medium' ? 'bg-yellow-500'
    : 'bg-stadium-500'
  return (
    <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden" aria-hidden="true">
      <div className={cn('h-full rounded-full transition-all duration-700', color)} style={{ width: `${value}%` }} />
    </div>
  )
}

/**
 * Full incident status card.
 *
 * @param {object}   incident  - Incident data object from emergencyData
 * @param {boolean}  compact   - Compact list mode (no progress bar)
 * @param {Function} onClick   - Optional click handler
 */
export function IncidentCard({ incident, compact = false, onClick }) {
  const priCfg  = PRIORITY_CONFIG[incident.priority]  ?? PRIORITY_CONFIG.low
  const statuCfg= STATUS_CONFIG[incident.status]      ?? STATUS_CONFIG.active
  const typeCfg = INCIDENT_TYPE_CONFIG[incident.type] ?? INCIDENT_TYPE_CONFIG.general
  const TypeIcon= ICON_MAP[typeCfg.icon] ?? Info

  return (
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
    <article
      className={cn(
        'glass rounded-2xl transition-all duration-200',
        priCfg.border, priCfg.bg,
        onClick && 'cursor-pointer hover:brightness-110',
      )}
      aria-label={`Incident: ${incident.title}, Priority: ${priCfg.label}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      role={onClick ? 'button' : 'article'}
    >
      <div className={cn('p-4', compact ? 'py-3' : 'p-5')}>
        {/* ── Top row ── */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Icon + title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={cn('w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0', typeCfg.bg)}>
              <TypeIcon className={cn('w-4 h-4', typeCfg.color)} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="text-white font-bold text-sm leading-snug truncate">{incident.title}</div>
              <div className="text-white/40 text-[10px] mt-0.5">{incident.id}</div>
            </div>
          </div>

          {/* Priority + status */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <Badge variant={priCfg.badge} size="sm" dot>{priCfg.label}</Badge>
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-md border', statuCfg.bg, statuCfg.color)}>
              {statuCfg.label}
            </span>
          </div>
        </div>

        {/* Description */}
        {!compact && (
          <p className="text-white/50 text-xs mb-3 line-clamp-2">{incident.description}</p>
        )}

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-[10px] text-white/40">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            {incident.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {incident.reportedAgo}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" aria-hidden="true" />
            {incident.assignedTeam}
          </span>
          {incident.eta !== '—' && (
            <span className="flex items-center gap-1 text-stadium-400 font-semibold">
              ETA: {incident.eta}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {!compact && incident.status !== 'resolved' && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-white/30">
              <span>Response Progress</span>
              <span>{incident.progress}%</span>
            </div>
            <ProgressBar value={incident.progress} priority={incident.priority} />
          </div>
        )}

        {/* Resolved bar */}
        {!compact && incident.status === 'resolved' && (
          <div className="flex items-center gap-2 text-stadium-400 text-xs">
            <span className="w-4 h-4 rounded-full bg-stadium-500/20 border border-stadium-500/40 flex items-center justify-center text-[8px]">✓</span>
            Resolved
          </div>
        )}

        {onClick && (
          <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" aria-hidden="true" />
        )}
      </div>
    </article>
  )
}
