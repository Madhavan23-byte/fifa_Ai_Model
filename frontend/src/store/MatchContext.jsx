import { createContext, useContext, useState, useEffect } from 'react'
import { matchService } from '@/services/matchService'

const MatchContext = createContext(null)

export function MatchProvider({ children }) {
  const [matchState, setMatchState] = useState(() => matchService.getState())

  useEffect(() => {
    // 5 second simulation loop
    const interval = setInterval(() => {
      setMatchState(matchService.tick())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <MatchContext.Provider value={matchState}>
      {children}
    </MatchContext.Provider>
  )
}

export function useMatch() {
  const context = useContext(MatchContext)
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider')
  }
  return context
}
