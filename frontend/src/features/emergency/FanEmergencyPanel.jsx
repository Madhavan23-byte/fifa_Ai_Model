/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 * features/emergency/FanEmergencyPanel.jsx
 * Large accessible emergency action buttons for fans.
 */
import { useState, useEffect } from 'react'
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

function IncidentReportingModal({ isOpen, onClose }) {
  const [type, setType] = useState('medical')
  const [location, setLocation] = useState('')
  const [desc, setDesc] = useState('')
  const [status, setStatus] = useState('idle') // idle, submitting, success, offline_success
  
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting')
    
    const payload = {
      id: Date.now().toString(),
      type,
      location,
      desc,
      timestamp: new Date().toISOString()
    };
    
    try {
      // Simulate backend call
      const res = await fetch('/api/v1/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error('Backend failed');
      setStatus('success');
    } catch {
      // Gracefully fallback to localStorage if backend is unavailable
      const existing = JSON.parse(localStorage.getItem('stadium_offline_incidents') || '[]');
      existing.push(payload);
      localStorage.setItem('stadium_offline_incidents', JSON.stringify(existing));
      setStatus('offline_success');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="report-modal-title" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="glass-strong rounded-2xl w-full max-w-sm shadow-2xl border ring-1 ring-white/10 animate-fade-up">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
          <h2 id="report-modal-title" className="text-white font-bold text-base flex items-center gap-2">
             <AlertTriangle className="w-4 h-4 text-orange-400" />
             Report an Incident
          </h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-colors" aria-label="Close modal">
             <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          {status === 'success' || status === 'offline_success' ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stadium-500/20 border border-stadium-500/40 text-stadium-400 flex items-center justify-center mx-auto mb-2">
                <span aria-hidden="true" className="text-xl">✓</span>
              </div>
              <h3 className="text-white font-bold">Report Submitted</h3>
              {status === 'offline_success' ? (
                <p className="text-white/60 text-xs">Saved locally due to poor connection. We will sync it shortly.</p>
              ) : (
                <p className="text-white/60 text-xs">Security has been notified.</p>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="incident-type" className="text-white/50 text-[10px] uppercase font-bold tracking-widest block mb-1.5">Incident Type</label>
                <select id="incident-type" value={type} onChange={e => setType(e.target.value)} className="w-full appearance-none glass rounded-xl px-4 py-3 text-white text-sm border border-white/[0.1] focus:outline-none focus:border-stadium-500/50 bg-[#060c1a]">
                   <option value="medical">Medical Emergency</option>
                   <option value="security">Security Issue / Disturbance</option>
                   <option value="maintenance">Maintenance / Spill</option>
                   <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="incident-location" className="text-white/50 text-[10px] uppercase font-bold tracking-widest block mb-1.5">Location</label>
                <input id="incident-location" required type="text" placeholder="e.g. Section 120, Row G" value={location} onChange={e => setLocation(e.target.value)} className="w-full glass rounded-xl px-4 py-3 text-white text-sm border border-white/[0.1] focus:outline-none focus:border-stadium-500/50 bg-white/[0.02]" />
              </div>

              <div>
                <label htmlFor="incident-desc" className="text-white/50 text-[10px] uppercase font-bold tracking-widest block mb-1.5">Description</label>
                <textarea id="incident-desc" required rows={3} placeholder="Briefly describe what happened..." value={desc} onChange={e => setDesc(e.target.value)} className="w-full glass rounded-xl px-4 py-3 text-white text-sm border border-white/[0.1] focus:outline-none focus:border-stadium-500/50 bg-white/[0.02] resize-none" />
              </div>
              
              <button disabled={status === 'submitting' || !location || !desc} type="submit" className="w-full bg-stadium-500 text-black font-bold text-sm py-3 rounded-xl hover:bg-stadium-400 disabled:opacity-50 transition-colors">
                 {status === 'submitting' ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Fan emergency panel — 2x3 grid of large accessible action buttons.
 * Opens a confirmation modal on click.
 */
export function FanEmergencyPanel() {
  const [activeAction, setActiveAction] = useState(null)
  const [reportingOpen, setReportingOpen] = useState(false)

  return (
    <>
      <div className="space-y-4">
        {/* Alert banner */}
        <div className="glass rounded-xl px-4 py-3 border border-red-500/25 bg-red-500/[0.06] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" aria-hidden="true" />
            <p className="text-red-300 text-xs font-medium">
              In a life-threatening emergency, always call <strong>911</strong> immediately.
            </p>
          </div>
          
          <button onClick={() => setReportingOpen(true)} className="flex-shrink-0 text-[10px] bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest transition-colors">
            Report Incident
          </button>
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
      
      {/* Incident Reporting Modal */}
      <IncidentReportingModal 
        isOpen={reportingOpen} 
        onClose={() => setReportingOpen(false)} 
      />
    </>
  )
}
