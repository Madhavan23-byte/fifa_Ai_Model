/**
 * features/navigation/RouteFinder.jsx
 * Route finder panel — user selects From/To and sees route info.
 */
import { useState } from 'react'
import { Navigation, Clock, Footprints, Users, ChevronDown, ArrowRight } from 'lucide-react'
import { LOCATIONS, ROUTES, CROWD_CONFIG } from '@/utils/navigationData'
import { Button } from '@/components/common'
import { Badge }  from '@/components/common'
import { cn }    from '@/utils/cn'

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

  const handleFind = () => {
    if (!from || !to) return
    const key  = `${from}_${to}`
    const data = ROUTES[key] || ROUTES['default']
    setResult(data)
    setSearched(true)
  }

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
    setResult(null)
    setSearched(false)
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
