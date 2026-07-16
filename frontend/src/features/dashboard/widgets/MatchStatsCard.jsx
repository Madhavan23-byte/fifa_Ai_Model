import { useMatch } from '@/store/MatchContext'
import { Activity, FileWarning, ArrowRightLeft } from 'lucide-react'
import { cn } from '@/utils/cn'

function StatRow({ label, home, away, format = (v) => v, reverse = false }) {
  const total = home + away
  const homePct = total === 0 ? 50 : Math.round((home / total) * 100)
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-bold text-white">
        <span>{format(home)}</span>
        <span className="text-white/40 font-medium">{label}</span>
        <span>{format(away)}</span>
      </div>
      <div className="flex h-1.5 gap-1 rounded-full overflow-hidden bg-white/[0.05]">
        <div 
          className={cn("h-full transition-all duration-500", reverse ? "bg-blue-400" : "bg-stadium-500")} 
          style={{ width: `${homePct}%` }}
        />
        <div 
          className={cn("h-full transition-all duration-500", reverse ? "bg-stadium-500" : "bg-blue-400")} 
          style={{ width: `${100 - homePct}%` }}
        />
      </div>
    </div>
  )
}

export function MatchStatsCard() {
  const match = useMatch()
  const { stats } = match

  return (
    <div className="glass rounded-2xl p-5 h-full space-y-6">
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
        <Activity className="w-4 h-4 text-stadium-400" />
        <h3 className="text-white font-bold tracking-wide">Match Statistics</h3>
      </div>

      <div className="space-y-4">
        <StatRow 
          label="Possession" 
          home={stats.possession.home} 
          away={stats.possession.away} 
          format={(v) => `${v}%`} 
        />
        <StatRow 
          label="Shots" 
          home={stats.shots.home} 
          away={stats.shots.away} 
        />
        <StatRow 
          label="Shots on Target" 
          home={stats.shotsOnTarget.home} 
          away={stats.shotsOnTarget.away} 
        />
        <StatRow 
          label="Corners" 
          home={stats.corners.home} 
          away={stats.corners.away} 
        />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.06]">
        <div className="bg-white/[0.03] rounded-xl p-3 text-center">
          <FileWarning className="w-4 h-4 mx-auto text-yellow-500 mb-1" />
          <div className="text-xs text-white/40 mb-1">Yellow</div>
          <div className="text-sm font-bold text-white">{stats.yellowCards.home} - {stats.yellowCards.away}</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-3 text-center">
          <FileWarning className="w-4 h-4 mx-auto text-red-500 mb-1" />
          <div className="text-xs text-white/40 mb-1">Red</div>
          <div className="text-sm font-bold text-white">{stats.redCards.home} - {stats.redCards.away}</div>
        </div>
        <div className="bg-white/[0.03] rounded-xl p-3 text-center">
          <ArrowRightLeft className="w-4 h-4 mx-auto text-blue-400 mb-1" />
          <div className="text-xs text-white/40 mb-1">Subs</div>
          <div className="text-sm font-bold text-white">{stats.subs.home} - {stats.subs.away}</div>
        </div>
      </div>
    </div>
  )
}
