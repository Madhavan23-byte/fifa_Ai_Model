import { Clock, MapPin, Users, Trophy } from 'lucide-react'
import { useMatch } from '@/store/MatchContext'
import { cn } from '@/utils/cn'

const EVENT_ICON = { goal: '⚽', yellow: '🟨', red: '🟥', sub: '🔄' }

// ─── Attendance bar ───────────────────────────────────────────────────────────
function AttendanceBar({ current, capacity }) {
  const pct = Math.round((current / capacity) * 100)
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-white/40">
          <Users className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Attendance</span>
        </div>
        <span className="text-white font-semibold">
          {current.toLocaleString()}
          <span className="text-white/25 font-normal"> / {capacity.toLocaleString()}</span>
        </span>
      </div>
      <div
        className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden"
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct}% stadium attendance`}
      >
        <div
          className="h-full bg-gradient-to-r from-stadium-600 to-stadium-400 rounded-full"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
/**
 * Live match card widget. Displays score, match minute, venue,
 * attendance progress and last 3 match events.
 */
export function MatchCard() {
  const match = useMatch()
  const { homeTeam, awayTeam, status, minute, venue, date, group, attendance, events } = match

  return (
    <div className="glass rounded-2xl overflow-hidden h-full" role="region" aria-label="Live match information">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-stadium-500/[0.04]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-stadium-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-stadium-500" />
          </span>
          <span className="text-stadium-400 text-[11px] font-black tracking-widest uppercase">{status}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Trophy className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
          <span className="text-white/35">{group}</span>
          <span className="text-white/20 mx-0.5">·</span>
          <Clock className="w-3.5 h-3.5 text-white/30" aria-hidden="true" />
          <span className="text-white font-bold">{minute}'</span>
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Teams & score */}
        <div
          className="flex items-center justify-between"
          aria-label={`${homeTeam.name} ${homeTeam.score} - ${awayTeam.score} ${awayTeam.name}`}
        >
          <div className="text-center flex-1 space-y-1">
            <div className="text-4xl mb-1" role="img" aria-label={homeTeam.name}>{homeTeam.flag}</div>
            <div className="text-white font-black text-xl">{homeTeam.code}</div>
            <div className="text-white/35 text-xs">{homeTeam.name}</div>
          </div>

          <div className="flex flex-col items-center gap-1 px-4">
            <div className="text-3xl font-black text-white tracking-widest">
              {match.score.home}
              <span className="text-white/20 mx-1.5">–</span>
              {match.score.away}
            </div>
          </div>

          <div className="text-center flex-1 space-y-1">
            <div className="text-4xl mb-1" role="img" aria-label={awayTeam.name}>{awayTeam.flag}</div>
            <div className="text-white font-black text-xl">{awayTeam.code}</div>
            <div className="text-white/35 text-xs">{awayTeam.name}</div>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center gap-2 glass rounded-xl px-3 py-2">
          <MapPin className="w-3.5 h-3.5 text-stadium-400 flex-shrink-0" aria-hidden="true" />
          <span className="text-white/50 text-xs">{venue}</span>
          <span className="text-white/20 text-xs ml-auto">{date.split(',')[0]}</span>
        </div>

        <AttendanceBar current={attendance.current} capacity={attendance.capacity} />

        {/* Match events ticker */}
        <div className="space-y-2">
          <p className="text-white/25 text-[10px] font-black tracking-widest uppercase">Match Events</p>
          {events.slice(-3).map((ev) => (
            <div key={`${ev.minute}-${ev.type}`} className="flex items-center gap-2 text-xs">
              <span className="text-white/25 w-7 text-right font-mono flex-shrink-0">{ev.minute}'</span>
              <span aria-hidden="true">{EVENT_ICON[ev.type] ?? '•'}</span>
              <span className="text-white/55 font-medium truncate">{ev.player}</span>
              <span className={cn(
                'ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0',
                ev.team === 'BRA'
                  ? 'bg-stadium-500/20 text-stadium-400'
                  : 'bg-blue-500/20 text-blue-400',
              )}>
                {ev.team}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
