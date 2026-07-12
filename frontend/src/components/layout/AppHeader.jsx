import { useState, useEffect, useRef } from 'react'
import { Menu, Bell } from 'lucide-react'
import { useAuth, ROLE_CONFIG } from '@/store/AuthContext'
import { NOTIFICATIONS, LIVE_MATCH } from '@/utils/dashboardData'
import { cn } from '@/utils/cn'

// ── Notification severity styling ─────────────────────────────────────────────
const SEVERITY_CFG = {
  critical: { dot: 'bg-red-500',    text: 'text-red-400/80'    },
  warning:  { dot: 'bg-yellow-500', text: 'text-yellow-400/80' },
  info:     { dot: 'bg-blue-500',   text: 'text-blue-400/80'   },
}

// ── Notification dropdown panel ───────────────────────────────────────────────
function NotificationPanel() {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 glass-strong rounded-2xl border border-white/[0.12] shadow-2xl overflow-hidden z-50 animate-slide-down">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <span className="text-white/60 text-[11px] font-black tracking-widest uppercase">Notifications</span>
        <span className="text-white/25 text-xs">{NOTIFICATIONS.length} alerts</span>
      </div>

      <div className="max-h-72 overflow-y-auto divide-y divide-white/[0.04]">
        {NOTIFICATIONS.map((n) => {
          const cfg = SEVERITY_CFG[n.severity] ?? SEVERITY_CFG.info
          return (
            <div key={n.id} className="flex gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors">
              <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5', cfg.dot)} aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className={cn('text-xs leading-snug', cfg.text)}>{n.text}</p>
                <p className="text-white/20 text-[10px] mt-1">{n.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
/**
 * Application top header.
 * - Left: mobile hamburger + live match ticker
 * - Right: notification bell with badge + role avatar
 *
 * @param {Function} onMenuToggle - Opens the mobile sidebar drawer
 */
export function AppHeader({ onMenuToggle }) {
  const { role }         = useAuth()
  const [showNotif, setShowNotif] = useState(false)
  const panelRef         = useRef(null)
  const roleConf         = role ? ROLE_CONFIG[role] : null
  const RoleIcon         = roleConf?.icon
  const alertCount       = NOTIFICATIONS.filter((n) => n.severity !== 'info').length
  const { homeTeam, awayTeam, minute } = LIVE_MATCH

  // Close notification panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowNotif(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header
      className="h-16 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-white/[0.06] bg-[#060c1a]/70 backdrop-blur-xl"
      role="banner"
    >
      {/* ── Left ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-white/45 hover:text-white hover:bg-white/[0.06] transition-all"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Live match ticker */}
        <div
          className="hidden sm:flex items-center gap-2 glass rounded-xl px-3 py-1.5"
          aria-label={`Live match: ${homeTeam.name} ${homeTeam.score} - ${awayTeam.score} ${awayTeam.name}, ${minute} minutes`}
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-stadium-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-stadium-500" />
          </span>
          <span className="text-xs font-medium text-white/55">
            <span className="text-white/80 font-bold">{homeTeam.flag} {homeTeam.code}</span>
            <span className="text-white/30 mx-1.5">{homeTeam.score}–{awayTeam.score}</span>
            <span className="text-white/80 font-bold">{awayTeam.code} {awayTeam.flag}</span>
            <span className="text-white/25 ml-1.5 font-mono">{minute}'</span>
          </span>
        </div>
      </div>

      {/* ── Right ────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification bell */}
        <div className="relative" ref={panelRef}>
          <button
            type="button"
            onClick={() => setShowNotif((v) => !v)}
            className="relative p-2 rounded-lg text-white/45 hover:text-white hover:bg-white/[0.06] transition-all"
            aria-label={`${alertCount} unread notifications — click to view`}
            aria-expanded={showNotif}
            aria-haspopup="true"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            {alertCount > 0 && (
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#060c1a]"
                aria-hidden="true"
              />
            )}
          </button>
          {showNotif && <NotificationPanel />}
        </div>

        {/* Role avatar */}
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              'w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0',
              roleConf?.avatarBg ?? 'bg-white/10 border-white/10',
            )}
            aria-label={`Role: ${roleConf?.label ?? 'Unknown'}`}
          >
            {RoleIcon && (
              <RoleIcon className={cn('w-4 h-4', roleConf?.avatarText)} aria-hidden="true" />
            )}
          </div>
          <div className="hidden sm:block">
            <div className="text-white/75 text-xs font-semibold leading-none">{roleConf?.label ?? '—'}</div>
            <div className="text-white/28 text-[10px] leading-none mt-0.5">{roleConf?.description}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
