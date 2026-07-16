import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Trophy, Activity, Users, Flag, ThermometerSun, ShieldAlert, Sparkles, MapPin } from 'lucide-react'
import { AppLayout } from '@/components/layout'
import { useAuth } from '@/store/AuthContext'
import { useMatch } from '@/store/MatchContext'
import { sendCopilotMessage as sendAIQuery } from '@/services/copilotService'

function StatBar({ label, home, away }) {
  const total = home + away
  const homePct = total > 0 ? (home / total) * 100 : 50
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-white/60 font-medium">
        <span>{home}</span>
        <span className="uppercase tracking-widest text-[10px]">{label}</span>
        <span>{away}</span>
      </div>
      <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden flex">
        <div style={{ width: `${homePct}%` }} className="bg-yellow-400 transition-all duration-500" />
        <div style={{ width: `${100 - homePct}%` }} className="bg-stadium-500 transition-all duration-500" />
      </div>
    </div>
  )
}

export default function MatchInfoPage() {
  const { role } = useAuth()
  const matchState = useMatch()
  
  const [aiInsights, setAiInsights] = useState(null)
  const [loadingInsights, setLoadingInsights] = useState(false)

  useEffect(() => {
    // Generate AI Insights when score or half changes
    const fetchInsights = async () => {
      setLoadingInsights(true)
      try {
        const query = `Analyze this match state: ${matchState.homeTeam.code} ${matchState.score.home} - ${matchState.score.away} ${matchState.awayTeam.code}. Minute: ${matchState.minute}. Give a tactical insight.`
        const response = await sendAIQuery({ role, query })
        setAiInsights(response)
      } catch {
        setAiInsights({ summary: "Insight generation failed.", recommendation: "Check connection." })
      } finally {
        setLoadingInsights(false)
      }
    }
    
    // Only fetch every ~15 minutes of game time to simulate "periodic insights" or when game status changes
    fetchInsights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchState.status])

  if (!role) return <Navigate to="/role-select" replace />

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Page Heading */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stadium-500/15 border border-stadium-500/25 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-stadium-400" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Match Center</h1>
            <p className="text-white/35 text-sm">{matchState.group} • Live Updates</p>
          </div>
        </div>

        {/* Live Score Banner */}
        <div className="glass rounded-2xl p-6 md:p-10 border border-white/[0.05] relative overflow-hidden">
           <div className="absolute inset-0 grid-overlay opacity-20" aria-hidden="true" />
           
           <div className="relative flex items-center justify-between">
              <div className="text-center flex-1">
                 <img src={matchState.homeTeam.flag} alt={matchState.homeTeam.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover shadow-lg" />
                 <h2 className="text-white font-bold text-lg md:text-xl">{matchState.homeTeam.name}</h2>
                 <p className="text-white/50 text-xs uppercase tracking-widest">{matchState.homeTeam.code}</p>
              </div>
              
              <div className="text-center flex-shrink-0 px-4 md:px-8">
                 <div className="text-stadium-400 text-xs font-bold uppercase tracking-widest mb-2 animate-pulse">
                    {matchState.status} {matchState.minute > 0 ? `${matchState.minute}'` : ''}
                 </div>
                 <div className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums drop-shadow-xl">
                    {matchState.score.home} - {matchState.score.away}
                 </div>
              </div>
              
              <div className="text-center flex-1">
                 <img src={matchState.awayTeam.flag} alt={matchState.awayTeam.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover shadow-lg" />
                 <h2 className="text-white font-bold text-lg md:text-xl">{matchState.awayTeam.name}</h2>
                 <p className="text-white/50 text-xs uppercase tracking-widest">{matchState.awayTeam.code}</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Left Column: Stats & Lineups */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* Match Statistics */}
              <div className="glass rounded-2xl p-5">
                 <div className="flex items-center gap-2 mb-6">
                    <Activity className="w-4 h-4 text-white/40" />
                    <h3 className="text-white text-sm font-bold uppercase tracking-widest">Team Statistics</h3>
                 </div>
                 
                 <div className="space-y-5">
                    <StatBar label="Possession (%)" home={matchState.stats.possession.home} away={matchState.stats.possession.away} />
                    <StatBar label="Shots" home={matchState.stats.shots.home} away={matchState.stats.shots.away} />
                    <StatBar label="Shots on Target" home={matchState.stats.shotsOnTarget.home} away={matchState.stats.shotsOnTarget.away} />
                    <StatBar label="Corners" home={matchState.stats.corners.home} away={matchState.stats.corners.away} />
                    <StatBar label="Yellow Cards" home={matchState.stats.yellowCards.home} away={matchState.stats.yellowCards.away} />
                    <StatBar label="Substitutions" home={matchState.stats.subs.home} away={matchState.stats.subs.away} />
                 </div>
              </div>
              
              {/* Lineups Mock */}
              <div className="glass rounded-2xl p-5">
                 <div className="flex items-center gap-2 mb-6">
                    <Users className="w-4 h-4 text-white/40" />
                    <h3 className="text-white text-sm font-bold uppercase tracking-widest">Starting Lineups</h3>
                 </div>
                 <div className="flex justify-between">
                    <div>
                       <ul className="text-sm text-white/70 space-y-2">
                          <li>1. Alisson (GK)</li>
                          <li>4. Marquinhos</li>
                          <li>3. Thiago Silva (C)</li>
                          <li>5. Casemiro</li>
                          <li>10. Neymar Jr</li>
                          <li>20. Vinícius Jr</li>
                       </ul>
                    </div>
                    <div className="text-right">
                       <ul className="text-sm text-white/70 space-y-2">
                          <li>1. Neuer (GK, C)</li>
                          <li>2. Rüdiger</li>
                          <li>6. Kimmich</li>
                          <li>8. Goretzka</li>
                          <li>14. Musiala</li>
                          <li>19. Sané</li>
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Right Column: Timeline, Info, AI */}
           <div className="space-y-6">
              
              {/* AI Insights */}
              <div className="glass rounded-2xl p-5 border border-stadium-500/20 bg-stadium-500/[0.02]">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-stadium-400" />
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest">AI Match Insights</h3>
                </div>
                {loadingInsights ? (
                  <p className="text-white/40 text-xs animate-pulse">Analyzing tactical data...</p>
                ) : aiInsights ? (
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm">{aiInsights.summary}</p>
                    <p className="text-white/50 text-xs italic">{aiInsights.recommendation}</p>
                  </div>
                ) : (
                  <p className="text-white/40 text-xs">Waiting for significant events...</p>
                )}
              </div>

              {/* Match Timeline */}
              <div className="glass rounded-2xl p-5">
                 <div className="flex items-center gap-2 mb-4">
                    <Flag className="w-4 h-4 text-white/40" />
                    <h3 className="text-white text-sm font-bold uppercase tracking-widest">Match Timeline</h3>
                 </div>
                 <div className="space-y-3">
                    {matchState.events.length === 0 ? (
                       <p className="text-white/40 text-xs italic">No major events yet.</p>
                    ) : (
                       matchState.events.slice().reverse().map((ev, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                             <span className="text-stadium-400 font-bold w-6">{ev.minute}&apos;</span>
                             <span className="text-white/40">{ev.team}</span>
                             <span className="text-white truncate">
                                {ev.type === 'goal' && '⚽ Goal by '}
                                {ev.type === 'yellow' && '🟨 Yellow - '}
                                {ev.type === 'red' && '🟥 Red - '}
                                {ev.type === 'sub' && '🔄 Sub - '}
                                {ev.player}
                             </span>
                          </div>
                       ))
                    )}
                 </div>
              </div>
              
              {/* Venue & Weather */}
              <div className="glass rounded-2xl p-5 space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40 flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Venue</span>
                    <span className="text-white font-medium">{matchState.venue.name}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40 flex items-center gap-2"><ThermometerSun className="w-3.5 h-3.5" /> Weather</span>
                    <span className="text-white font-medium">{matchState.weather.temp}, {matchState.weather.condition}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40 flex items-center gap-2"><Users className="w-3.5 h-3.5" /> Attendance</span>
                    <span className="text-white font-medium">{matchState.attendance.current.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40 flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5" /> Officials</span>
                    <span className="text-white font-medium">Ref: M. Oliver (ENG)</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40 flex items-center gap-2"><Trophy className="w-3.5 h-3.5" /> Competition</span>
                    <span className="text-white font-medium">{matchState.competition}</span>
                 </div>
              </div>
           </div>
           
        </div>
      </div>
    </AppLayout>
  )
}
