/**
 * features/emergency/FanEmergencyPanel.jsx
 * Large accessible emergency action buttons for fans.
 */
import { useState } from 'react'
import {
  HeartPulse, AlertTriangle, Search, ShieldAlert, DoorOpen, Users,
} from 'lucide-react'
import { FAN_EMERGENCY_ACTIONS } from '@/utils/emergencyData'
import { EmergencyModal } from './EmergencyModal'
import { cn } from '@/utils/cn'

const ICON_MAP = { HeartPulse, AlertTriangle, Search, ShieldAlert, DoorOpen, Users }

const colorMap = {
  red:    { bg: 'bg-red-500/10 border-red-500/30',          icon: 'bg-red-500/20 border-red-500/40 text-red-400',         hover: 'hover:border-red-500/60 hover:bg-red-500/20'          },
  orange: { bg: 'bg-orange-500/10 border-orange-500/30',    icon: 'bg-orange-500/20 border-orange-500/40 text-orange-400',hover: 'hover:border-orange-500/60 hover:bg-orange-500/20'    },
  blue:   { bg: 'bg-blue-500/10 border-blue-500/30',        icon: 'bg-blue-500/20 border-blue-500/40 text-blue-400',      hover: 'hover:border-blue-500/60 hover:bg-blue-500/20'        },
  yellow: { bg: 'bg-yellow-500/10 border-yellow-500/30',    icon: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',hover: 'hover:border-yellow-500/60 hover:bg-yellow-500/20'    },
  green:  { bg: 'bg-stadium-500/10 border-stadium-500/30',  icon: 'bg-stadium-500/20 border-stadium-500/40 text-stadium-400',hover:'hover:border-stadium-500/60 hover:bg-stadium-500/20'},
  purple: { bg: 'bg-purple-500/10 border-purple-500/30',    icon: 'bg-purple-500/20 border-purple-500/40 text-purple-400',hover: 'hover:border-purple-500/60 hover:bg-purple-500/20'    },
}

// ─── Single large action button ────────────────────────────────────────────────
function ActionButton({ action, onClick }) {
  const Icon   = ICON_MAP[action.icon]
  const colors = colorMap[action.color] ?? colorMap.blue

  return (
    <button
      type="button"
      onClick={() => onClick(action)}
      aria-label={`${action.label}: ${action.desc}`}
      className={cn(
        'glass rounded-2xl p-5 text-left flex flex-col items-start gap-3 border',
        'transition-all duration-200 hover:-translate-y-1 active:scale-[0.98]',
        'focus-visible:ring-2 focus-visible:ring-white/30',
        colors.bg, colors.hover,
      )}
    >
      {/* Icon */}
      <div className={cn('w-12 h-12 rounded-xl border flex items-center justify-center', colors.icon)}>
        {Icon && <Icon className="w-6 h-6" aria-hidden="true" />}
      </div>

      {/* Text */}
      <div>
        <div className="text-white font-bold text-sm leading-snug">{action.label}</div>
        <div className="text-white/40 text-[11px] mt-1 leading-snug">{action.desc}</div>
      </div>
    </button>
  )
}

/**
 * Fan emergency panel — 2x3 grid of large accessible action buttons.
 * Opens a confirmation modal on click.
 */
export function FanEmergencyPanel() {
  const [activeAction, setActiveAction] = useState(null)

  return (
    <>
      <div className="space-y-4">
        {/* Alert banner */}
        <div className="glass rounded-xl px-4 py-3 border border-red-500/25 bg-red-500/[0.06] flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" aria-hidden="true" />
          <p className="text-red-300 text-xs font-medium">
            In a life-threatening emergency, always call <strong>911</strong> immediately.
          </p>
        </div>

        {/* Action grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          role="list"
          aria-label="Emergency actions"
        >
          {FAN_EMERGENCY_ACTIONS.map((action) => (
            <div key={action.id} role="listitem">
              <ActionButton action={action} onClick={setActiveAction} />
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation modal */}
      <EmergencyModal
        isOpen={!!activeAction}
        onClose={() => setActiveAction(null)}
        action={activeAction}
      />
    </>
  )
}
