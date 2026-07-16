import { useAuth, ROLES } from '@/store/AuthContext'
import { MatchCard }         from './widgets/MatchCard'
import { MatchStatsCard }    from './widgets/MatchStatsCard'
import { MatchTimelineCard } from './widgets/MatchTimelineCard'
import { CrowdStatus }    from './widgets/CrowdStatus'
import { GateStatus }     from './widgets/GateStatus'
import { ParkingStatus }  from './widgets/ParkingStatus'
import { WeatherCard }    from './widgets/WeatherCard'
import { QuickActions }   from './widgets/QuickActions'
import { AssignedTasks }  from './widgets/AssignedTasks'

// ─── Grid layout helpers ──────────────────────────────────────────────────────
// All wrappers are direct children of the CSS grid, so col-span classes work.

/** Responsive 3-column grid container */
const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">{children}</div>
)

/** Spans 2 columns on md+, 1 on mobile */
const Wide = ({ children }) => <div className="md:col-span-2">{children}</div>

/** Spans full width on all breakpoints */
const Full = ({ children }) => <div className="md:col-span-2 xl:col-span-3">{children}</div>

// ─── Role-specific dashboard layouts ─────────────────────────────────────────
const OrganizerDashboard = () => (
  <Grid>
    <Wide><MatchCard /></Wide>
    <WeatherCard />
    <Wide><CrowdStatus /></Wide>
    <ParkingStatus />
    <Full><GateStatus /></Full>
    <Full><QuickActions /></Full>
  </Grid>
)

const FanDashboard = () => (
  <Grid>
    <Wide><MatchCard /></Wide>
    <WeatherCard />
    <MatchStatsCard />
    <Wide><MatchTimelineCard /></Wide>
  </Grid>
)

const VolunteerDashboard = () => (
  <Grid>
    <Wide><AssignedTasks /></Wide>
    <CrowdStatus />
    <Wide><GateStatus /></Wide>
    <QuickActions />
  </Grid>
)

// ─── Role → layout + greeting map ────────────────────────────────────────────
const ROLE_CONFIG = {
  [ROLES.ORGANIZER]: { label: 'Operations Overview', Dashboard: OrganizerDashboard },
  [ROLES.VOLUNTEER]: { label: 'My Shift Dashboard',  Dashboard: VolunteerDashboard },
  [ROLES.FAN]:       { label: 'Match Day Hub',        Dashboard: FanDashboard       },
}

// ─── Main component ───────────────────────────────────────────────────────────
/**
 * Command Center Dashboard.
 * Reads the current role from AuthContext and renders the
 * appropriate widget layout. No business logic — pure composition.
 */
export function CommandCenterDashboard() {
  const { role } = useAuth()
  const cfg = ROLE_CONFIG[role]

  if (!cfg) return null   // Guard — DashboardPage redirects before this renders

  const { label, Dashboard } = cfg

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">{label}</h1>
        <p className="text-white/35 text-sm mt-1">
          Sunday, 26 July 2026 · MetLife Stadium, New Jersey · Match Day 3
        </p>
      </div>

      {/* Widget grid */}
      <Dashboard />
    </div>
  )
}
