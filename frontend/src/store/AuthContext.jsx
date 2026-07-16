/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Users, Shield, Cpu } from 'lucide-react'

// ── Role constants ─────────────────────────────────────────────────────────
export const ROLES = {
  FAN:       'fan',
  VOLUNTEER: 'volunteer',
  ORGANIZER: 'organizer',
}

/**
 * Per-role display config: icon, label, avatar/badge styling.
 * Used throughout the app to ensure consistent role branding.
 */
export const ROLE_CONFIG = {
  [ROLES.FAN]: {
    label:       'Fan',
    description: 'Match Attendee',
    icon:        Users,
    avatarBg:    'bg-stadium-500/20 border-stadium-500/30',
    avatarText:  'text-stadium-400',
    badgeClass:  'bg-stadium-500/15 text-stadium-400 border border-stadium-500/25',
    dotColor:    'bg-stadium-400',
  },
  [ROLES.VOLUNTEER]: {
    label:       'Volunteer',
    description: 'Stadium Volunteer',
    icon:        Shield,
    avatarBg:    'bg-blue-500/20 border-blue-500/30',
    avatarText:  'text-blue-400',
    badgeClass:  'bg-blue-500/15 text-blue-400 border border-blue-500/25',
    dotColor:    'bg-blue-400',
  },
  [ROLES.ORGANIZER]: {
    label:       'Organizer',
    description: 'Operations Manager',
    icon:        Cpu,
    avatarBg:    'bg-gold-500/20 border-gold-500/30',
    avatarText:  'text-gold-400',
    badgeClass:  'bg-gold-500/15 text-gold-400 border border-gold-500/25',
    dotColor:    'bg-gold-400',
  },
}

// ── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

const STORAGE_KEY = 'stadiumops_role'

/**
 * Provides role state to the entire application. Wrap at root level.
 * Persists selected role to sessionStorage so page refreshes don't lose state.
 */
export function AuthProvider({ children }) {
  // Initialise from sessionStorage so page refreshes don't lose the role
  const [role, setRole] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      return Object.values(ROLES).includes(stored) ? stored : null
    } catch {
      return null
    }
  })

  // Sync to sessionStorage on every role change
  useEffect(() => {
    try {
      if (role) {
        sessionStorage.setItem(STORAGE_KEY, role)
      } else {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — silently ignore
    }
  }, [role])

  const selectRole = useCallback((newRole) => {
    if (Object.values(ROLES).includes(newRole)) setRole(newRole)
  }, [])

  const clearRole = useCallback(() => setRole(null), [])

  return (
    <AuthContext.Provider value={{ role, selectRole, clearRole }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access the current role and role-management actions.
 * Must be used inside <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
