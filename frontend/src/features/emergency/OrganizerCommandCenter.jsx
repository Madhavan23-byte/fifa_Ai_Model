/**
 * features/emergency/OrganizerCommandCenter.jsx
 * Enterprise emergency command view for organizers — live list, filters, timeline, stats.
 */
import { useState } from 'react'
import {
  AlertOctagon, Users, CheckCircle2, Clock, Filter,
  HeartPulse, Search, ShieldAlert, Flame, Info, MapPin,
} from 'lucide-react'
import { Badge } from '@/components/common'
import { IncidentCard } from './IncidentCard'
import {
  ACTIVE_INCIDENTS, INCIDENT_TIMELINE, ORGANIZER_STATS,
  PRIORITY_CONFIG, STATUS_CONFIG, INCIDENT_TYPE_CONFIG,
} from '@/utils/emergencyData'
import { cn } from '@/utils/cn'

const STAT_ICON_MAP  = { AlertOctagon, Users, CheckCircle2, Clock }
const TIMELINE_ICONS = { HeartPulse, Search, ShieldAlert, Flame, Info, MapPin }

const PRIORITY_FILTERS = [
  { id: 'all',      label: 'All'      },
  { id: 'critical', label: 'Critical' },
  { id: 'high',     label: 'High'     },
  { id: 'medium',   label: 'Medium'   },
  { id: 'low',      label: 'Low'      },
]

const STATUS_FILTERS = [
  { id: 'all',       label: 'All'       },
  { id: 'active',    label: 'Active'    },
  { id: 'responding',label: 'Responding'},
  { id: 'dispatched',label: 'Dispatched'},
  { id: 'resolved',  label: 'Resolved'  },
]

// ─── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon }) {
  const Icon = STAT_ICON_MAP[icon]
  const colorMap = {
    red:   'text-red-400    bg-red-500/15    border-red-500/30',
    yellow:'text-yellow-400 bg-yellow-500/15 border-yellow-500/30',
    green: 'text-stadium-400 bg-stadium-500/15 border-stadium-500/30',
    blue:  'text-blue-400   bg-blue-500/15   border-blue-500/30',
  }
  return (
    <div className="glass rounded-xl p-4 flex items-center gap-3">
      <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0', colorMap[color])}>
        {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
      </div>
      <div>
        <div className="text-white font-black text-xl leading-none">{value}</div>
        <div className="text-white/35 text-[10px] mt-0.5">{label}</div>
      </div>
    </div>
  )
}

// ─── Timeline item ─────────────────────────────────────────────────────────────
function TimelineItem({ item, isLast }) {
  const typeCfg = INCIDENT_TYPE_CONFIG[item.type] ?? INCIDENT_TYPE_CONFIG.general
  const Icon    = TIMELINE_ICONS[typeCfg.icon] ?? Info

  const dotColor =
    item.status === 'critical' ? 'bg-red-500'
    : item.status === 'alert'  ? 'bg-orange-500'
    : item.status === 'resolved'? 'bg-stadium-500'
    : 'bg-white/20'

  return (
    <div className="flex gap-3 group">
      {/* Dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={cn('w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5', dotColor)} aria-hidden="true" />
        {!isLast && <div className="w-px flex-1 bg-white/[0.06] mt-1" aria-hidden="true" />}
      </div>

      {/* Content */}
      <div className={cn('pb-4 min-w-0', isLast && 'pb-0')}>
        <div className="flex items-baseline gap-2 mb-0.5">
          <span className="text-white/30 text-[10px] font-mono flex-shrink-0">{item.time}</span>
          <span className="text-white/65 text-xs leading-snug">{item.event}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Organizer Emergency Command Center — full enterprise dashboard view.
 */
export function OrganizerCommandCenter() {
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [statusFilter,   setStatusFilter  ] = useState('all')

  const filtered = ACTIVE_INCIDENTS.filter((inc) => {
    const pOk = priorityFilter === 'all' || inc.priority === priorityFilter
    const sOk = statusFilter   === 'all' || inc.status   === statusFilter
    return pOk && sOk
  })

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ORGANIZER_STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Main grid: incident list + timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Incident list — 2 cols */}
        <div className="xl:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1.5 text-white/30">
              <Filter className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Filters</span>
            </div>

            {/* Priority filter */}
            <div className="flex gap-1 flex-wrap" role="group" aria-label="Priority filter">
              {PRIORITY_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPriorityFilter(f.id)}
                  aria-pressed={priorityFilter === f.id}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border',
                    priorityFilter === f.id
                      ? 'bg-stadium-500/20 border-stadium-500/40 text-stadium-400'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white/70',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex gap-1 flex-wrap" role="group" aria-label="Status filter">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  aria-pressed={statusFilter === f.id}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border',
                    statusFilter === f.id
                      ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                      : 'bg-white/[0.04] border-white/[0.08] text-white/40 hover:text-white/70',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Incident cards */}
          <div className="space-y-3" aria-live="polite" aria-label="Filtered incidents">
            {filtered.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center text-white/30 text-sm">
                No incidents match the selected filters.
              </div>
            ) : (
              filtered.map((inc) => (
                <IncidentCard key={inc.id} incident={inc} />
              ))
            )}
          </div>
        </div>

        {/* Timeline — 1 col */}
        <div className="xl:col-span-1">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-white/30" aria-hidden="true" />
              <h3 className="text-white font-bold text-sm">Incident Timeline</h3>
              <span className="ml-auto text-[10px] text-white/20">Match Day 3</span>
            </div>

            <div aria-label="Incident timeline" role="list">
              {INCIDENT_TIMELINE.map((item, i) => (
                <div key={item.id} role="listitem">
                  <TimelineItem item={item} isLast={i === INCIDENT_TIMELINE.length - 1} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
