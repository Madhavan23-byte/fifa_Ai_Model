/**
 * features/emergency/EmergencyContacts.jsx
 * Emergency contacts list with icon, label, number, and status indicator.
 */
import {
  HeartPulse, ShieldCheck, Users, BadgeCheck, Flame, Phone,
} from 'lucide-react'
import { EMERGENCY_CONTACTS } from '@/utils/emergencyData'
import { cn } from '@/utils/cn'

const ICON_MAP = { HeartPulse, ShieldCheck, Users, BadgeCheck, Flame }

/**
 * Emergency contacts panel.
 */
export function EmergencyContacts() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
          <Phone className="w-4 h-4 text-red-400" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Emergency Contacts</h3>
          <p className="text-white/35 text-[11px]">Stadium safety network</p>
        </div>
      </div>

      {/* Contacts list */}
      <ul className="divide-y divide-white/[0.05]" aria-label="Emergency contacts">
        {EMERGENCY_CONTACTS.map((contact) => {
          const Icon = ICON_MAP[contact.icon]
          const isActive = contact.status === 'active'

          return (
            <li key={contact.id}>
              <a
                href={`tel:${contact.number}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors group"
                aria-label={`Call ${contact.label}: ${contact.number}`}
              >
                {/* Icon */}
                <div className={cn(
                  'w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0',
                  isActive
                    ? 'bg-stadium-500/15 border-stadium-500/25 text-stadium-400'
                    : 'bg-white/[0.06] border-white/[0.1] text-white/30',
                )}>
                  {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-bold truncate">{contact.label}</div>
                  <div className="text-white/35 text-[10px] mt-0.5 truncate">{contact.desc}</div>
                </div>

                {/* Right: number + status */}
                <div className="text-right flex-shrink-0">
                  <div className="text-white font-mono text-sm font-semibold group-hover:text-stadium-400 transition-colors">
                    {contact.number}
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className={cn(
                      'w-1.5 h-1.5 rounded-full',
                      isActive ? 'bg-stadium-400 animate-pulse-slow' : 'bg-yellow-400',
                    )} aria-hidden="true" />
                    <span className={cn(
                      'text-[10px] font-semibold capitalize',
                      isActive ? 'text-stadium-400' : 'text-yellow-400',
                    )}>
                      {contact.status}
                    </span>
                  </div>
                </div>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
