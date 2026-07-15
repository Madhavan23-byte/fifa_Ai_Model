/**
 * features/navigation/RouteFinder.jsx
 * Route finder panel — user selects From/To and sees route info.
 */
import { useState } from 'react'
import { Navigation, Clock, Footprints, Users, ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import { LOCATIONS, ROUTES, CROWD_CONFIG } from '@/utils/navigationData'
import { Button } from '@/components/common'
import { Badge }  from '@/components/common'
import { cn }    from '@/utils/cn'
import { sendCopilotMessage as sendAIQuery } from '@/services/copilotService'

// ─── Select dropdown ───────────────────────────────────────────────────────────
function LocationSelect({ label, value, onChange, options, id }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-white/40 text-[11px] font-bold uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full appearance-none glass rounded-xl px-4 py-3 pr-10',
            'text-white text-sm font-medium',
            'border border-white/[0.1] focus:border-stadium-500/60',
            'bg-transparent focus:outline-none focus:ring-2 focus:ring-stadium-500/30',
            'cursor-pointer transition-colors',
          )}
          aria-label={label}
        >
          <option value="" className="bg-[#060c1a] text-white/50">Select location…</option>
          {options.map((loc) => (
            <option key={loc.id} value={loc.id} className="bg-[#060c1a] text-white">
              {loc.icon} {loc.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  )
}

// ─── Route result card ─────────────────────────────────────────────────────────
function RouteResult({ route, isAccessible }) {
  const crowdCfg = CROWD_CONFIG[route.crowdStatus]
  const steps    = isAccessible ? (route.accessibleSteps || route.steps) : route.steps

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Footprints, label: 'Distance',   value: route.distance },
          { icon: Clock,      label: 'Walk Time',  value: route.walkTime  },
          { icon: Users,      label: 'Crowd',      value: crowdCfg.label  },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass rounded-xl p-3 text-center">
            <Icon className="w-4 h-4 mx-auto mb-1 text-white/30" aria-hidden="true" />
            <div className="text-white text-sm font-bold">{value}</div>
            <div className="text-white/35 text-[10px] mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Crowd status banner */}
      <div className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border',
        route.crowdStatus === 'high' || route.crowdStatus === 'critical'
          ? 'bg-red-500/10 border-red-500/25 text-red-400'
          : route.crowdStatus === 'medium'
          ? 'bg-yellow-500/10 border-yellow-500/25 text-yellow-400'
          : 'bg-stadium-500/10 border-stadium-500/25 text-stadium-400',
      )}>
        <span className={cn('w-2 h-2 rounded-full flex-shrink-0', crowdCfg.dot)} aria-hidden="true" />
        <span className="text-xs font-semibold">
          {route.crowdStatus === 'high' || route.crowdStatus === 'critical'
            ? 'Route is crowded — allow extra time'
            : route.crowdStatus === 'medium'
            ? 'Moderate crowd — stay on marked path'
            : 'Clear route — easy walking'}
        </span>
      </div>

      {/* Step-by-step */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Navigation className="w-3.5 h-3.5 text-stadium-400" aria-hidden="true" />
          <span className="text-white/50 text-[11px] font-bold uppercase tracking-widest">
            {isAccessible ? 'Accessible Route' : 'Suggested Route'}
          </span>
        </div>
        <ol className="space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-white/60">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-stadium-500/15 border border-stadium-500/25 text-stadium-400 text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// ─── Component ─────────────────────────────────────────────────────────────────
/**
 * Route finder panel — select From + To to get route details.
 *
 * @param {boolean}  wheelchairMode - Show accessible route steps
 * @param {string}   preselectedTo  - Pre-fill To field (from quick nav click)
 */
export function RouteFinder({ wheelchairMode, preselectedTo = '' }) {
  const [from,     setFrom    ] = useState('')
  const [to,       setTo      ] = useState(preselectedTo)
  const [result,   setResult  ] = useState(null)
  const [searched, setSearched] = useState(false)
  
  const [aiData,    setAiData   ] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError,   setAiError  ] = useState(null)

  const handleFind = async () => {
    if (!from || !to) return
    const key  = `${from}_${to}`
    const data = ROUTES[key] || ROUTES['default']
    setResult(data)
    setSearched(true)
    
    // Trigger AI Guidance
    setAiLoading(true)
    setAiError(null)
    setAiData(null)
    
    try {
      const fromLabel = LOCATIONS.find(l => l.id === from)?.label || from
      const toLabel = LOCATIONS.find(l => l.id === to)?.label || to
      
      const query = `I need directions from ${fromLabel} to ${toLabel}. Is this route crowded? Are there any better alternatives?`
      
      const response = await sendAIQuery({ role: 'fan', query })
      setAiData(response)
    } catch (err) {
      setAiError(err.message)
    } finally {
      setAiLoading(false)
    }
  }

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
    setResult(null)
    setSearched(false)
    setAiData(null)
    setAiError(null)
  }

  return (
    <div className="glass rounded-2xl p-5 space-y-5">
      {/* Panel header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-stadium-500/15 border border-stadium-500/25 flex items-center justify-center">
          <Navigation className="w-4 h-4 text-stadium-400" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-white font-bold text-sm">Route Finder</h2>
          <p className="text-white/35 text-[11px]">Find the best path through the stadium</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3">
        <LocationSelect
          id="from-location"
          label="From"
          value={from}
          onChange={(v) => { setFrom(v); setResult(null); setSearched(false) }}
          options={LOCATIONS}
        />

        {/* Swap button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSwap}
            className="w-8 h-8 rounded-full glass border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all rotate-90"
            aria-label="Swap from and to locations"
          >
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <LocationSelect
          id="to-location"
          label="To"
          value={to}
          onChange={(v) => { setTo(v); setResult(null); setSearched(false) }}
          options={LOCATIONS}
        />
      </div>

      <Button
        variant="primary"
        size="md"
        className="w-full"
        onClick={handleFind}
        disabled={!from || !to || from === to}
        leftIcon={<Navigation className="w-4 h-4" />}
        aria-label="Find route"
      >
        Find Route
      </Button>

      {/* Result */}
      {searched && result && (
        <div className="pt-2 border-t border-white/[0.06]">
          <RouteResult route={result} isAccessible={wheelchairMode} />
          <AIRouteGuidance loading={aiLoading} error={aiError} data={aiData} />
        </div>
      )}

      {searched && !result && (
        <p className="text-center text-white/35 text-xs py-2">
          No route data found for that combination.
        </p>
      )}
    </div>
  )
}

// ─── AI Guidance Component ──────────────────────────────────────────────────────
function AIRouteGuidance({ loading, error, data }) {
  if (loading) {
    return (
      <div className="glass p-4 rounded-xl border border-white/[0.06] mt-4 flex items-center justify-center space-x-3">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stadium-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-stadium-500"></span>
        </span>
        <span className="text-white/60 text-[11px] font-bold uppercase tracking-widest">AI analyzing route...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass p-4 rounded-xl border border-red-500/20 bg-red-500/[0.02] mt-4">
        <p className="text-red-400 text-xs mb-1 font-semibold flex items-center gap-1">
          <span aria-hidden="true">⚠️</span> AI Guidance Unavailable
        </p>
        <p className="text-white/60 text-[11px]">{error}</p>
      </div>
    )
  }

  if (!data) return null;

  return (
    <div className="glass p-4 rounded-xl border border-stadium-500/20 bg-stadium-500/[0.02] mt-4 animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-stadium-400" aria-hidden="true" />
        <span className="text-stadium-400 text-[11px] font-bold uppercase tracking-widest">AI Route Guidance</span>
      </div>
      
      <div className="space-y-3 text-sm text-white/80">
        <div>
          <strong className="text-white">Summary:</strong> <span className="text-white/70">{data.summary}</span>
        </div>
        <div>
          <strong className="text-white">Recommendation:</strong> <span className="text-white/70">{data.recommendation}</span>
        </div>
        
        {data.actions && data.actions.length > 0 && (
          <div>
            <strong className="text-white">Actions:</strong>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-white/70 text-xs">
              {data.actions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap items-center gap-3 text-[10px] mt-4 pt-3 border-t border-white/[0.06]">
          <span className={cn(
             "px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border",
             data.priority?.toLowerCase() === 'critical' ? "bg-red-500/10 border-red-500/30 text-red-400" :
             data.priority?.toLowerCase() === 'high' ? "bg-orange-500/10 border-orange-500/30 text-orange-400" :
             data.priority?.toLowerCase() === 'medium' ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" :
             "bg-stadium-500/10 border-stadium-500/30 text-stadium-400"
          )}>
            Priority: {data.priority}
          </span>
          <span className="text-white/40 uppercase tracking-widest font-bold">Confidence: {data.confidence}%</span>
        </div>
        
        {data.notes && (
          <p className="text-[11px] text-white/50 italic mt-2">{data.notes}</p>
        )}
      </div>
    </div>
  )
}
