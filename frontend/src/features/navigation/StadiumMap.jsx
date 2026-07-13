/**
 * features/navigation/StadiumMap.jsx
 * Interactive SVG-based stadium layout with clickable areas and crowd indicators.
 */
import { cn } from '@/utils/cn'
import { STADIUM_AREAS, AREA_TYPE_CONFIG, CROWD_CONFIG } from '@/utils/navigationData'

// ─── Single area marker ────────────────────────────────────────────────────────
function AreaMarker({ area, isSelected, isAccessible, onClick }) {
  const typeCfg  = AREA_TYPE_CONFIG[area.type]
  const crowdCfg = CROWD_CONFIG[area.crowd]
  const show     = !isAccessible || area.accessible

  if (!show) return null

  return (
    <button
      type="button"
      onClick={() => onClick(area)}
      aria-label={`${area.label} — crowd: ${crowdCfg.label}`}
      aria-pressed={isSelected}
      style={{ left: `${area.x}%`, top: `${area.y}%` }}
      className={cn(
        'absolute -translate-x-1/2 -translate-y-1/2 group',
        'flex flex-col items-center gap-1',
      )}
    >
      {/* Marker bubble */}
      <div className={cn(
        'relative flex items-center justify-center rounded-xl border text-base',
        'transition-all duration-200 shadow-lg',
        area.type === 'gate' || area.type === 'exit'
          ? 'w-10 h-10 text-lg'
          : 'w-9 h-9 text-sm',
        typeCfg.bg, typeCfg.border,
        isSelected
          ? 'ring-2 ring-stadium-400 ring-offset-1 ring-offset-transparent scale-110'
          : 'group-hover:scale-110 group-hover:ring-2 group-hover:ring-white/30',
      )}>
        {area.emoji || typeCfg.emoji}

        {/* Crowd dot */}
        <span
          className={cn(
            'absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-[#040b14]',
            crowdCfg.dot,
          )}
          aria-hidden="true"
        />

        {/* Accessible badge */}
        {isAccessible && area.accessible && (
          <span
            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center text-[6px]"
            aria-label="Accessible route"
          >
            ♿
          </span>
        )}
      </div>

      {/* Label */}
      <span className={cn(
        'text-[9px] font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap',
        'backdrop-blur-sm border border-white/[0.08] bg-[#040b14]/80',
        typeCfg.text,
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-150',
      )}>
        {area.label}
      </span>
    </button>
  )
}

// ─── Stadium Map ───────────────────────────────────────────────────────────────
/**
 * Interactive top-down stadium layout.
 * Shows all areas as positioned markers on an SVG oval pitch backdrop.
 *
 * @param {string}   selectedId    - Currently selected area id
 * @param {boolean}  wheelchairMode - Only show accessible areas/routes
 * @param {Function} onSelect      - Callback with selected area object
 */
export function StadiumMap({ selectedId, wheelchairMode, onSelect }) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '75%' }}>
      {/* Background panel */}
      <div className="absolute inset-0 glass rounded-2xl overflow-hidden">

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-30" aria-hidden="true" />

        {/* Stadium oval SVG backdrop */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 300"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outer stadium ring */}
          <ellipse cx="200" cy="150" rx="185" ry="135" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="30" />

          {/* Inner concourse */}
          <ellipse cx="200" cy="150" rx="145" ry="100" fill="none" stroke="rgba(0,168,84,0.06)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Pitch */}
          <ellipse cx="200" cy="150" rx="110" ry="75" fill="rgba(0,168,84,0.08)" stroke="rgba(0,168,84,0.2)" strokeWidth="1.5" />

          {/* Centre circle */}
          <circle cx="200" cy="150" r="28" fill="none" stroke="rgba(0,168,84,0.15)" strokeWidth="1" />

          {/* Halfway line */}
          <line x1="200" y1="78" x2="200" y2="222" stroke="rgba(0,168,84,0.15)" strokeWidth="1" />

          {/* Pitch label */}
          <text x="200" y="154" textAnchor="middle" fontSize="9" fill="rgba(0,168,84,0.35)" fontFamily="Inter, sans-serif" fontWeight="700">
            PITCH
          </text>

          {/* Compass directions */}
          {[['N', 200, 10], ['S', 200, 294], ['E', 394, 152], ['W', 6, 152]].map(([dir, x, y]) => (
            <text key={dir} x={x} y={y} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.15)" fontFamily="Inter, sans-serif" fontWeight="800">
              {dir}
            </text>
          ))}
        </svg>

        {/* Area markers — absolutely positioned over the SVG */}
        {STADIUM_AREAS.map((area) => (
          <AreaMarker
            key={area.id}
            area={area}
            isSelected={area.id === selectedId}
            isAccessible={wheelchairMode}
            onClick={onSelect}
          />
        ))}

        {/* Wheelchair mode overlay */}
        {wheelchairMode && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-blue-500/20 border border-blue-500/40 rounded-lg px-2.5 py-1">
            <span className="text-blue-300 text-xs font-bold">♿ Accessible Routes Only</span>
          </div>
        )}

        {/* Map legend */}
        <div className="absolute bottom-3 right-3 glass rounded-xl p-2 flex flex-col gap-1 text-[9px]">
          {[
            { color: 'bg-stadium-400', label: 'Low crowd'   },
            { color: 'bg-yellow-400',  label: 'Moderate'    },
            { color: 'bg-orange-400',  label: 'Busy'        },
            { color: 'bg-red-400',     label: 'Critical'    },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={cn('w-2 h-2 rounded-full flex-shrink-0', color)} />
              <span className="text-white/40 font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
