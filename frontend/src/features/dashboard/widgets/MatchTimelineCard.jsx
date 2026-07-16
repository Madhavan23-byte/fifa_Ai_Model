import { useEffect, useRef } from 'react'
import { useMatch } from '@/store/MatchContext'
import { List } from 'lucide-react'
import { cn } from '@/utils/cn'

const EVENT_ICON = { goal: '⚽', yellow: '🟨', red: '🟥', sub: '🔄' }
const EVENT_LABEL = { goal: 'Goal', yellow: 'Yellow Card', red: 'Red Card', sub: 'Substitution' }

export function MatchTimelineCard() {
  const match = useMatch()
  const scrollRef = useRef(null)

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [match.events])

  return (
    <div className="glass rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3 mb-4">
        <List className="w-4 h-4 text-stadium-400" />
        <h3 className="text-white font-bold tracking-wide">Match Timeline</h3>
        <div className="ml-auto flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Live Log</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar min-h-[200px]"
      >
        {match.events.length === 0 ? (
          <div className="h-full flex items-center justify-center text-white/30 text-sm">
            Waiting for match events...
          </div>
        ) : (
          match.events.map((ev, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] animate-fade-in"
            >
              <div className="w-10 text-right text-stadium-400 font-mono font-bold text-sm shrink-0">
                {ev.minute}'
              </div>
              <div className="text-lg shrink-0" aria-label={EVENT_LABEL[ev.type]}>
                {EVENT_ICON[ev.type]}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-white truncate">{ev.player}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">{EVENT_LABEL[ev.type]}</div>
              </div>
              <div className={cn(
                'text-xs font-bold px-2 py-1 rounded-md shrink-0',
                ev.team === 'BRA' 
                  ? 'bg-stadium-500/20 text-stadium-400' 
                  : 'bg-blue-500/20 text-blue-400'
              )}>
                {ev.team}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
