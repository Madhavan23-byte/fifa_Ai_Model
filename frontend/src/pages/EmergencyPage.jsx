/**
 * pages/EmergencyPage.jsx
 * Emergency & Safety module — adapts its layout based on the active user role.
 *
 * Fan      → Large action buttons + contacts
 * Volunteer→ Assigned incident + response panel + contacts
 * Organizer→ Command center + timeline + broadcast + contacts
 */
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Shield, Sparkles }   from 'lucide-react'
import { AppLayout }              from '@/components/layout'
import { useAuth, ROLES }         from '@/store/AuthContext'
import { Badge }                  from '@/components/common'
import { cn }                     from '@/utils/cn'
import { sendCopilotMessage as sendAIQuery } from '@/services/copilotService'
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

// ─── AI Guidance Panel ────────────────────────────────────────────────────────
function AIEmergencyGuidancePanel({ role }) {
  const [query, setQuery] = useState('')
  const [aiData, setAiData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAsk = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    setAiData(null)
    
    try {
      const response = await sendAIQuery({ role, query })
      setAiData(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass rounded-2xl p-5 border border-stadium-500/20 bg-stadium-500/[0.02]">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-stadium-400" aria-hidden="true" />
        <h2 className="text-white font-bold text-sm">AI Emergency Guidance</h2>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Describe the emergency situation for AI assistance..."
          className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-stadium-500/50 transition-colors"
        />
        <button 
          onClick={handleAsk}
          disabled={loading || !query.trim()}
          className="flex-shrink-0 bg-stadium-500 text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-stadium-400 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Ask AI'}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/[0.02] mt-2">
          <p className="text-red-400 text-xs font-semibold flex items-center gap-1">
            <span aria-hidden="true">⚠️</span> AI Guidance Unavailable
          </p>
          <p className="text-white/60 text-[11px] mt-1">{error}</p>
        </div>
      )}

      {aiData && (
        <div className="space-y-3 text-sm text-white/80 animate-fade-up mt-4 pt-4 border-t border-white/[0.06]">
          <div><strong className="text-white">Summary:</strong> <span className="text-white/70">{aiData.summary}</span></div>
          <div><strong className="text-white">Recommendation:</strong> <span className="text-white/70">{aiData.recommendation}</span></div>
          
          {aiData.actions && aiData.actions.length > 0 && (
            <div>
              <strong className="text-white">Actions:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-white/70 text-xs">
                {aiData.actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-wrap items-center gap-3 text-[10px] mt-4 pt-3 border-t border-white/[0.06]">
            <span className={cn(
               "px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border",
               aiData.priority?.toLowerCase() === 'critical' ? "bg-red-500/10 border-red-500/30 text-red-400" :
               aiData.priority?.toLowerCase() === 'high' ? "bg-orange-500/10 border-orange-500/30 text-orange-400" :
               aiData.priority?.toLowerCase() === 'medium' ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" :
               "bg-stadium-500/10 border-stadium-500/30 text-stadium-400"
            )}>
              Priority: {aiData.priority}
            </span>
            <span className="text-white/40 uppercase tracking-widest font-bold">Confidence: {aiData.confidence}%</span>
          </div>
          
          {aiData.notes && <p className="text-[11px] text-white/50 italic mt-2">{aiData.notes}</p>}
        </div>
      )}
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

        {/* ── AI Emergency Guidance Panel ─────────────────────────────────── */}
        <AIEmergencyGuidancePanel role={role} />

        {/* ── Role-specific view ────────────────────────────────────────── */}
        {role === ROLES.FAN       && <FanView       />}
        {role === ROLES.VOLUNTEER && <VolunteerView />}
        {role === ROLES.ORGANIZER && <OrganizerView />}

      </div>
    </AppLayout>
  )
}
