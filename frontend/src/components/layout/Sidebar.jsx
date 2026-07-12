import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Cpu, MapPin, Shield, Activity, MessageCircle,
  Settings, LogOut, Zap, X,
} from 'lucide-react'
import { useAuth, ROLE_CONFIG, ROLES } from '@/store/AuthContext'
import { cn } from '@/utils/cn'

// ── Nav item definitions by role ──────────────────────────────────────────────
const ROLE_NAV = {
  [ROLES.FAN]: [
    { icon: LayoutDashboard, label: 'Dashboard',    href: '/dashboard'  },
    { icon: MessageCircle,   label: 'AI Assistant', href: '/assistant'  },
    { icon: MapPin,          label: 'Navigation',   href: '/navigation' },
    { icon: Shield,          label: 'Emergency',    href: '/emergency'  },
    { icon: Activity,        label: 'Match Info',   href: '/match'      },
  ],
  [ROLES.VOLUNTEER]: [
    { icon: LayoutDashboard, label: 'Dashboard',    href: '/dashboard'  },
    { icon: MessageCircle,   label: 'AI Assistant', href: '/assistant'  },
    { icon: MapPin,          label: 'Navigation',   href: '/navigation' },
    { icon: Shield,          label: 'Emergency',    href: '/emergency'  },
    { icon: Activity,        label: 'Match Info',   href: '/match'      },
  ],
  [ROLES.ORGANIZER]: [
    { icon: LayoutDashboard, label: 'Dashboard',          href: '/dashboard'  },
    { icon: Cpu,             label: 'Operations Copilot', href: '/copilot'    },
    { icon: MapPin,          label: 'Navigation',         href: '/navigation' },
    { icon: Shield,          label: 'Emergency',          href: '/emergency'  },
    { icon: Activity,        label: 'Match Info',         href: '/match'      },
  ]
}

// ── Single nav link ───────────────────────────────────────────────────────────
function NavItem({ icon: Icon, label, href, active }) {
  return (
    <Link
      to={href}
      className={cn(
        'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
        'transition-all duration-150 overflow-hidden',
        active
          ? 'bg-stadium-500/[0.1] text-white border border-stadium-500/[0.22]'
          : 'text-white/45 hover:text-white/80 hover:bg-white/[0.05] border border-transparent',
      )}
      aria-current={active ? 'page' : undefined}
    >
      {/* Active left border accent */}
      {active && (
        <span className="absolute left-0 inset-y-2 w-0.5 bg-stadium-400 rounded-r" aria-hidden="true" />
      )}
      <Icon
        className={cn('w-4 h-4 flex-shrink-0', active ? 'text-stadium-400' : 'text-white/28')}
        aria-hidden="true"
      />
      {label}
    </Link>
  )
}

// ── Shared sidebar content (desktop + mobile) ─────────────────────────────────
function SidebarContent({ onClose }) {
  const location  = useLocation()
  const navigate  = useNavigate()
  const { role, clearRole } = useAuth()
  const roleConf  = role ? ROLE_CONFIG[role] : null
  const RoleIcon  = roleConf?.icon

  const handleSignOut = () => {
    clearRole()
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full select-none">
      {/* ── Logo row ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.06] flex-shrink-0">
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5"
          aria-label="StadiumOps AI — Dashboard home"
        >
          <div className="w-7 h-7 rounded-lg bg-stadium-500 flex items-center justify-center shadow-[0_0_16px_rgba(0,168,84,0.4)]">
            <Zap className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </div>
          <span className="font-extrabold text-white text-[15px] tracking-tight">
            Stadium<span className="text-stadium-400">Ops</span>
          </span>
        </Link>

        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* ── Nav items ─────────────────────────────────────────────── */}
      <nav
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
        aria-label="Application navigation"
      >
        {(ROLE_NAV[role] || ROLE_NAV[ROLES.FAN]).map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={location.pathname === item.href}
          />
        ))}
      </nav>

      {/* ── Bottom — role badge + settings + logout ────────────────── */}
      <div className="px-3 py-4 border-t border-white/[0.06] space-y-1 flex-shrink-0">
        {/* Role badge */}
        {roleConf && (
          <div
            className={cn(
              'flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-2 text-xs',
              roleConf.badgeClass,
            )}
            aria-label={`Current role: ${roleConf.label}`}
          >
            {RoleIcon && <RoleIcon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
            <div>
              <div className="font-bold leading-none">{roleConf.label}</div>
              <div className="opacity-55 text-[10px] mt-0.5 leading-none">{roleConf.description}</div>
            </div>
          </div>
        )}

        <button
          type="button"
          disabled
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/25 border border-transparent cursor-not-allowed"
          aria-label="Settings — coming soon"
          title="Settings coming soon"
        >
          <Settings className="w-4 h-4 text-white/15" aria-hidden="true" />
          Settings
          <span className="ml-auto text-[9px] text-white/20 uppercase tracking-wider">Soon</span>
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-500/[0.08] transition-all"
          aria-label="Sign out and return to home"
        >
          <LogOut className="w-4 h-4" aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

// ── Exported Sidebar ──────────────────────────────────────────────────────────
/**
 * Responsive sidebar.
 * - Desktop (lg+): always-visible 256px aside.
 * - Mobile: full-screen drawer overlay with backdrop.
 *
 * @param {boolean}  isOpen   - Mobile drawer open state
 * @param {Function} onClose  - Close handler for mobile
 */
export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Desktop sidebar — rendered in the flex flow */}
      <aside
        className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-[#060c1a] border-r border-white/[0.06]"
        aria-label="Main navigation sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <aside
            className="relative w-72 bg-[#060c1a] border-r border-white/[0.07] animate-slide-down flex-shrink-0"
            aria-label="Mobile navigation"
          >
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  )
}
