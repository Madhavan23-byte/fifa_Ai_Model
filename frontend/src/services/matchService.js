import { DEMO_MATCH } from '@/utils/constants'

const INITIAL_STATE = {
  ...DEMO_MATCH,
  group: 'Group G',
  status: 'Pre Match',
  minute: 0,
  score: { home: 0, away: 0 },
  attendance: { current: 42000, capacity: DEMO_MATCH.capacity?.total || 82500 },
  stats: {
    possession: { home: 50, away: 50 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    subs: { home: 0, away: 0 },
  },
  events: [], // { minute, type, team, player }
}

const PLAYERS = {
  BRA: ['Vinicius Jr', 'Neymar', 'Casemiro', 'Marquinhos', 'Alisson', 'Richarlison'],
  GER: ['Musiala', 'Sane', 'Kimmich', 'Rudiger', 'Neuer', 'Gnabry']
}

// Random helper
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export class MatchService {
  constructor() {
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE))
  }

  getState() {
    return this.state
  }

  // Simulation tick (called every 5s)
  tick() {
    const s = this.state

    // Attendance ramp up during Pre Match
    if (s.status === 'Pre Match') {
      s.attendance.current = Math.min(s.attendance.capacity, s.attendance.current + random(100, 1500))
      // Start match if attendance is high enough or random chance
      if (s.attendance.current > s.attendance.capacity * 0.9 && Math.random() > 0.5) {
        s.status = 'First Half'
        s.minute = 1
      }
      return { ...s }
    }

    // Match minute progression
    if (s.status === 'First Half' || s.status === 'Second Half') {
      s.minute += 1
    }

    // Status transitions
    if (s.minute === 45 && s.status === 'First Half') {
      s.status = 'Half Time'
    } else if (s.status === 'Half Time' && Math.random() > 0.8) {
      s.status = 'Second Half'
      s.minute = 46
    } else if (s.minute === 90 && s.status === 'Second Half') {
      s.status = 'Full Time'
    }

    if (s.status === 'Half Time' || s.status === 'Full Time') {
      return { ...s }
    }

    // Possession swing
    const shift = random(-5, 5)
    s.stats.possession.home = Math.max(30, Math.min(70, s.stats.possession.home + shift))
    s.stats.possession.away = 100 - s.stats.possession.home

    // Determine attacking team based on possession
    const isHomeAttacking = Math.random() * 100 < s.stats.possession.home
    const attackTeam = isHomeAttacking ? 'home' : 'away'
    const attackCode = isHomeAttacking ? 'BRA' : 'GER'

    // Match Events (Shots, Goals, Cards)
    const eventRoll = Math.random()

    if (eventRoll < 0.15) {
      // Shot taken
      s.stats.shots[attackTeam]++
      if (Math.random() > 0.5) {
        // Shot on target
        s.stats.shotsOnTarget[attackTeam]++
        if (Math.random() > 0.7) {
          // GOAL!
          s.score[attackTeam]++
          s.events.push({
            minute: s.minute,
            type: 'goal',
            team: attackCode,
            player: pick(PLAYERS[attackCode])
          })
        }
      } else if (Math.random() > 0.8) {
        // Corner
        s.stats.corners[attackTeam]++
      }
    } else if (eventRoll > 0.90 && eventRoll < 0.95) {
      // Yellow card
      const defendTeam = isHomeAttacking ? 'away' : 'home'
      const defendCode = isHomeAttacking ? 'GER' : 'BRA'
      s.stats.yellowCards[defendTeam]++
      s.events.push({
        minute: s.minute,
        type: 'yellow',
        team: defendCode,
        player: pick(PLAYERS[defendCode])
      })
    } else if (eventRoll > 0.98) {
      // Substitution
      if (s.stats.subs[attackTeam] < 5) {
        s.stats.subs[attackTeam]++
        s.events.push({
          minute: s.minute,
          type: 'sub',
          team: attackCode,
          player: pick(PLAYERS[attackCode])
        })
      }
    } else if (eventRoll > 0.995) {
      // Red card (very rare)
      const defendTeam = isHomeAttacking ? 'away' : 'home'
      const defendCode = isHomeAttacking ? 'GER' : 'BRA'
      s.stats.redCards[defendTeam]++
      s.events.push({
        minute: s.minute,
        type: 'red',
        team: defendCode,
        player: pick(PLAYERS[defendCode])
      })
    }

    return { ...s, stats: { ...s.stats }, events: [...s.events], score: { ...s.score } }
  }
}

// Singleton instance
export const matchService = new MatchService()
