/**
 * features/emergency/VolunteerResponsePanel.jsx
 * Shows the volunteer's assigned incident with status controls.
 */
import { useState } from 'react'
import {
  MapPin, Clock, CheckCircle2, Navigation, AlertOctagon, User,
} from 'lucide-react'
import { Button } from '@/components/common'
import { Badge }  from '@/components/common'
import { VOLUNTEER_INCIDENT, PRIORITY_CONFIG } from '@/utils/emergencyData'
import { cn } from '@/utils/cn'

// ─── Response steps ────────────────────────────────────────────────────────────
const RESPONSE_STEPS = [
  { id: 'accept',   label: 'Accept',        variant: 'primary',   nextStatus: 'accepted'  },
  { id: 'navigate', label: 'Navigate',      variant: 'secondary', nextStatus: 'navigating'},
  { id: 'arrived',  label: 'Mark Arrived',  variant: 'secondary', nextStatus: 'on_scene'  },
  { id: 'complete', label: 'Complete',      variant: 'outline',   nextStatus: 'complete'  },
]

const STEP_STATUS = {
  accepted:   { label: 'Accepted',    color: 'text-blue-400',    idx: 1 },
  navigating: { label: 'Navigating',  color: 'text-yellow-400',  idx: 2 },
  on_scene:   { label: 'On Scene',    color: 'text-orange-400',  idx: 3 },
  complete:   { label: 'Completed',   color: 'text-stadium-400', idx: 4 },
}

/**
 * Volunteer response panel — shows incident details and step-through action buttons.
 */
export function VolunteerResponsePanel() {
  const incident = VOLUNTEER_INCIDENT
  const priCfg   = PRIORITY_CONFIG[incident.priority] ?? PRIORITY_CONFIG.high
  const [step, setStep] = useState(0) // 0 = not yet accepted

  const handleAction = (s, i) => {
    setStep(i + 1)
  }

  const currentStepStatus = step > 0 ? STEP_STATUS[RESPONSE_STEPS[step - 1]?.nextStatus] : null
  const isCompleted = step >= RESPONSE_STEPS.length

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Critical header strip */}
      <div className={cn('px-5 py-3 flex items-center gap-2.5', priCfg.bg, 'border-b', priCfg.border)}>
        <AlertOctagon className={cn('w-4 h-4 flex-shrink-0', 'text-red-400')} aria-hidden="true" />
        <span className="text-white font-bold text-sm">{incident.title}</span>
        <Badge variant={priCfg.badge} size="sm" dot className="ml-auto">{priCfg.label}</Badge>
      </div>

      <div className="p-5 space-y-5">
        {/* Incident details */}
        <div className="space-y-2">
          <p className="text-white/60 text-sm leading-relaxed">{incident.description}</p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {[
              { icon: MapPin,    label: 'Location',  value: incident.location   },
              { icon: Clock,     label: 'ETA',        value: incident.eta        },
              { icon: User,      label: 'Supervisor', value: incident.supervisor },
              { icon: Navigation,label: 'Protocol',   value: incident.protocol  },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3 h-3 text-white/30" aria-hidden="true" />
                  <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{label}</span>
                </div>
                <div className="text-white text-xs font-semibold leading-snug">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current task */}
        <div className="glass rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/[0.05]">
          <div className="text-yellow-400/70 text-[10px] font-black uppercase tracking-widest mb-1.5">Current Task</div>
          <p className="text-white/70 text-sm leading-relaxed">{incident.currentTask}</p>
        </div>

        {/* Status tracker */}
        <div>
          <div className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-3">Response Progress</div>
          <div className="flex items-center gap-1">
            {RESPONSE_STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1 min-w-0">
                <div className={cn(
                  'flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold',
                  i < step
                    ? 'bg-stadium-500 border-stadium-500 text-white'
                    : i === step
                    ? 'border-stadium-500/60 text-stadium-400 bg-stadium-500/10'
                    : 'border-white/[0.12] text-white/20',
                )}>
                  {i < step ? <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> : i + 1}
                </div>
                {i < RESPONSE_STEPS.length - 1 && (
                  <div className={cn('flex-1 h-0.5 mx-1', i < step ? 'bg-stadium-500' : 'bg-white/[0.08]')} aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {RESPONSE_STEPS.map((s) => (
              <span key={s.id} className="text-[9px] text-white/25 text-center flex-1">{s.label}</span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        {!isCompleted ? (
          <div className="flex flex-col gap-2">
            {RESPONSE_STEPS.map((s, i) => {
              if (i !== step) return null
              return (
                <Button
                  key={s.id}
                  variant={s.variant}
                  size="md"
                  className="w-full"
                  onClick={() => handleAction(s, i)}
                  aria-label={s.label}
                >
                  {s.label}
                </Button>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 text-stadium-400">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            <span className="font-bold text-sm">Incident Completed</span>
          </div>
        )}

        {/* Current status */}
        {currentStepStatus && (
          <div className="text-center">
            <span className={cn('text-xs font-semibold', currentStepStatus.color)}>
              Status: {currentStepStatus.label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
