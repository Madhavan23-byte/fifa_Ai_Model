import { CheckCircle2, Circle, Clock, User, MapPin, Phone } from 'lucide-react'
import { VOLUNTEER_ASSIGNMENT } from '@/utils/dashboardData'
import { Badge } from '@/components/common'
import { cn } from '@/utils/cn'

const TASK_CFG = {
  completed: {
    icon:  CheckCircle2,
    color: 'text-stadium-400',
    bg:    'bg-stadium-500/[0.08]',
    label: 'Done',
  },
  active: {
    icon:  Clock,
    color: 'text-blue-400',
    bg:    'bg-blue-500/[0.08]',
    label: 'Active',
  },
  pending: {
    icon:  Circle,
    color: 'text-white/25',
    bg:    'bg-white/[0.03]',
    label: 'Pending',
  },
}

/**
 * Assigned Tasks widget (Volunteer role only).
 * Shows volunteer identity, shift info, and a task checklist.
 */
export function AssignedTasks() {
  const { name, volunteerId, zone, gate, shift, role: volRole,
    emergency, tasks } = VOLUNTEER_ASSIGNMENT

  const doneCount = tasks.filter((t) => t.status === 'completed').length

  return (
    <div className="glass rounded-2xl h-full" role="region" aria-label="Volunteer assignment and tasks">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <h3 className="text-white/60 text-[11px] font-black tracking-widest uppercase">
          My Assignment
        </h3>
        <Badge variant="blue" dot pulse size="sm">On Shift</Badge>
      </div>

      <div className="p-5 space-y-5">
        {/* Volunteer info card */}
        <div className="glass rounded-2xl p-4 border border-white/[0.06] space-y-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0"
              aria-hidden="true"
            >
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{name}</div>
              <div className="text-white/35 text-xs">{volunteerId} · {volRole}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <div className="flex items-center gap-2 text-xs text-white/45">
              <MapPin className="w-3.5 h-3.5 text-stadium-400 flex-shrink-0" aria-hidden="true" />
              <span>{zone} · {gate}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/45">
              <Clock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
              <span>{shift}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/35 sm:col-span-2">
              <Phone className="w-3.5 h-3.5 text-white/20 flex-shrink-0" aria-hidden="true" />
              <span>Emergency: {emergency}</span>
            </div>
          </div>
        </div>

        {/* Task checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/25 text-[10px] font-black tracking-widest uppercase">
              Task Checklist
            </p>
            <span className="text-white/40 text-xs font-semibold">
              {doneCount}/{tasks.length} complete
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => {
              const cfg  = TASK_CFG[task.status] ?? TASK_CFG.pending
              const Icon = cfg.icon
              return (
                <div
                  key={task.id}
                  className={cn('flex items-start gap-3 p-3 rounded-xl', cfg.bg)}
                  role="listitem"
                >
                  <Icon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', cfg.color)} aria-hidden="true" />
                  <span className="text-white/60 text-sm leading-snug flex-1">{task.text}</span>
                  <span className={cn('text-[10px] font-bold flex-shrink-0 mt-0.5', cfg.color)}>
                    {cfg.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
