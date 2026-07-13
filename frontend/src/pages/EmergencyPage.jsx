/**
 * pages/EmergencyPage.jsx
 * Emergency & Safety module — adapts its layout based on the active user role.
 *
 * Fan      → Large action buttons + contacts
 * Volunteer→ Assigned incident + response panel + contacts
 * Organizer→ Command center + timeline + broadcast + contacts
 */
import { Navigate } from 'react-router-dom'
import { Shield }   from 'lucide-react'
import { AppLayout }              from '@/components/layout'
import { useAuth, ROLES }         from '@/store/AuthContext'
import { Badge }                  from '@/components/common'
import {
  FanEmergencyPanel,
  VolunteerResponsePanel,
  OrganizerCommandCenter,
  BroadcastPreview,
  EmergencyContacts,
  IncidentCard,
} from '@/features/emergency'
import { ACTIVE_INCIDENTS }       from '@/utils/emergencyData'

// ─── Fan layout ────────────────────────────────────────────────────────────────
function FanView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Emergency actions — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <SectionHeading>Emergency Actions</SectionHeading>
        <FanEmergencyPanel />
      </div>

      {/* Contacts — 1 col */}
      <div className="lg:col-span-1 space-y-4">
        <SectionHeading>Emergency Contacts</SectionHeading>
        <EmergencyContacts />
      </div>
    </div>
  )
}

// ─── Volunteer layout ──────────────────────────────────────────────────────────
function VolunteerView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Response panel — 2 cols */}
      <div className="lg:col-span-2 space-y-4">
        <SectionHeading>Assigned Incident</SectionHeading>
        <VolunteerResponsePanel />
      </div>

      {/* Right column */}
      <div className="lg:col-span-1 space-y-6">
        {/* Nearby active incidents (compact) */}
        <div className="space-y-3">
          <SectionHeading>Other Active Incidents</SectionHeading>
          {ACTIVE_INCIDENTS.filter((i) => i.status !== 'resolved').slice(0, 3).map((inc) => (
            <IncidentCard key={inc.id} incident={inc} compact />
          ))}
        </div>
        <EmergencyContacts />
      </div>
    </div>
  )
}

// ─── Organizer layout ──────────────────────────────────────────────────────────
function OrganizerView() {
  return (
    <div className="space-y-6">
      <OrganizerCommandCenter />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BroadcastPreview />
        <EmergencyContacts />
      </div>
    </div>
  )
}

// ─── Shared heading helper ─────────────────────────────────────────────────────
function SectionHeading({ children }) {
  return (
    <div className="text-white/40 text-[11px] font-black uppercase tracking-widest">
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
/**
 * Emergency & Safety page — content adapts based on role.
 */
export default function EmergencyPage() {
  const { role } = useAuth()
  if (!role) return <Navigate to="/role-select" replace />

  // Role-based subtitle
  const subtitles = {
    [ROLES.FAN]:       'Get help fast — all emergency resources in one place',
    [ROLES.VOLUNTEER]: 'Your assigned incident and response workflow',
    [ROLES.ORGANIZER]: 'Live incidents, response status and broadcast control',
  }

  // Role-based badge
  const badges = {
    [ROLES.FAN]:       { label: 'Fan',       variant: 'green'  },
    [ROLES.VOLUNTEER]: { label: 'Volunteer', variant: 'blue'   },
    [ROLES.ORGANIZER]: { label: 'Organizer', variant: 'gold'   },
  }
  const badge = badges[role]

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* ── Page heading ──────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/25 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Emergency &amp; Safety</h1>
              {badge && (
                <Badge variant={badge.variant} size="sm" dot>
                  {badge.label}
                </Badge>
              )}
            </div>
            <p className="text-white/35 text-sm">{subtitles[role]}</p>
          </div>

          {/* Active incidents count */}
          <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
            <span className="text-red-400 text-sm font-bold">3 Active Incidents</span>
          </div>
        </div>

        {/* ── Role-specific view ────────────────────────────────────────── */}
        {role === ROLES.FAN       && <FanView       />}
        {role === ROLES.VOLUNTEER && <VolunteerView />}
        {role === ROLES.ORGANIZER && <OrganizerView />}

      </div>
    </AppLayout>
  )
}
