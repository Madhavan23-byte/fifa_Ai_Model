import { useState } from 'react'
import { AlertTriangle, Sparkles } from 'lucide-react'
import { CROWD_ZONES } from '@/utils/dashboardData'
import { Badge } from '@/components/common'
import { cn } from '@/utils/cn'
import { sendCopilotMessage as sendAIQuery } from '@/services/copilotService'

const STATUS_CFG = {
  open:     { variant: 'green',  label: 'Open',     bar: 'bg-stadium-500' },
  busy:     { variant: 'yellow', label: 'Busy',     bar: 'bg-yellow-500'  },
  critical: { variant: 'red',    label: 'Critical', bar: 'bg-red-500'     },
}

/**
 * Crowd Intelligence widget.
 * Displays overall capacity and per-zone density with status badges.
 */
export function CrowdStatus() {
  const overall  = Math.round(CROWD_ZONES.reduce((s, z) => s + z.density, 0) / CROWD_ZONES.length)
  const criticals = CROWD_ZONES.filter((z) => z.status === 'critical')

  return (
    <div className="glass rounded-2xl h-full" role="region" aria-label="Crowd intelligence">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
        <h3 className="text-white/60 text-[11px] font-black tracking-widest uppercase">
          Crowd Intelligence
        </h3>
        {criticals.length > 0 && (
          <div className="flex items-center gap-1.5 text-red-400">
            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-xs font-bold">{criticals.length} Critical</span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Overall gauge */}
        <div className="glass rounded-2xl py-4 text-center border border-white/[0.06]">
          <div
            className={cn(
              'text-4xl font-black',
              overall >= 90 ? 'text-red-400' : overall >= 70 ? 'text-yellow-400' : 'text-stadium-400',
            )}
            aria-label={`Overall crowd capacity: ${overall}%`}
          >
            {overall}%
          </div>
          <div className="text-white/30 text-xs mt-1">Overall Capacity</div>
        </div>

        {/* Zone list */}
        <div className="space-y-3">
          {CROWD_ZONES.map((zone) => {
            const cfg = STATUS_CFG[zone.status] ?? STATUS_CFG.open
            return (
              <div key={zone.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/55 text-xs font-medium">{zone.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-xs font-bold tabular-nums">{zone.density}%</span>
                    <Badge variant={cfg.variant} size="sm" dot>{cfg.label}</Badge>
                  </div>
                </div>
                <div
                  className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"
                  role="meter"
                  aria-valuenow={zone.density}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${zone.name}: ${zone.density}% capacity`}
                >
                  <div
                    className={cn('h-full rounded-full transition-all duration-700', cfg.bar)}
                    style={{ width: `${zone.density}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            )
          })}
        </div>
        
        {/* AI Insights Panel */}
        <AICrowdInsightsPanel />
      </div>
    </div>
  )
}

// ─── AI Insights Panel ──────────────────────────────────────────────────────────
function AICrowdInsightsPanel() {
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
      const response = await sendAIQuery({ role: 'organizer', query })
      setAiData(response)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 pt-5 border-t border-white/[0.06]">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-stadium-400" aria-hidden="true" />
        <h4 className="text-white font-bold text-sm">AI Crowd Insights</h4>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="Ask for operational analysis..."
          className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-stadium-500/50 transition-colors"
        />
        <button 
          onClick={handleAsk}
          disabled={loading || !query.trim()}
          className="flex-shrink-0 bg-stadium-500 text-black px-3 py-2 rounded-xl text-xs font-bold hover:bg-stadium-400 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Ask'}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/[0.02]">
          <p className="text-red-400 text-xs font-semibold flex items-center gap-1">
            <span aria-hidden="true">⚠️</span> Insights Unavailable
          </p>
          <p className="text-white/60 text-[11px] mt-1">{error}</p>
        </div>
      )}

      {aiData && (
        <div className="space-y-3 text-sm text-white/80 animate-fade-up glass p-4 rounded-xl border border-stadium-500/20 bg-stadium-500/[0.02]">
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
          
          <div className="flex flex-wrap items-center gap-3 text-[10px] mt-3 pt-3 border-t border-white/[0.06]">
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
