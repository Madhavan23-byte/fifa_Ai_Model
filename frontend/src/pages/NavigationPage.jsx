/**
 * pages/NavigationPage.jsx
 * Smart Stadium Navigation — full interactive wayfinding page for fans.
 */
import { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { AppLayout }          from '@/components/layout'
import { useAuth }            from '@/store/AuthContext'
import {
  StadiumMap,
  RouteFinder,
  QuickNavCards,
  AccessibilityToggle,
  CrowdIndicators,
} from '@/features/navigation'

/**
 * Stadium Navigation page — protected, fan-focused.
 * Integrates interactive map, route finder, quick nav, and crowd indicators.
 */
export default function NavigationPage() {
  const { role } = useAuth()
  const location = useLocation()
  
  if (!role) return <Navigate to="/role-select" replace />

  const [wheelchairMode,  setWheelchairMode ] = useState(false)
  const [selectedArea,    setSelectedArea   ] = useState(null)
  const [routeTo,         setRouteTo        ] = useState('')
  const [facilityFilter,  setFacilityFilter ] = useState(false)
  const [activeRoute,     setActiveRoute    ] = useState(null)

  // Handle QuickAction routing state
  useEffect(() => {
    if (location.state?.preselectTo) {
      setRouteTo(location.state.preselectTo)
      if (location.state.highlightDest) {
        setSelectedArea('east') // example block for Seat 42B
      }
      // Scroll to route finder on mobile if pre-selected
      setTimeout(() => {
        document.getElementById('route-finder-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
    
    if (location.state?.filterCategory === 'facilities') {
      setFacilityFilter(true)
    }
  }, [location.state])

  // When a quick-nav card is clicked, pre-fill the Route Finder's "To" field
  const handleQuickNav = (item) => {
    setRouteTo(item.to)
    setSelectedArea(item.id)
    setFacilityFilter(false) // clear filter on new selection
    setActiveRoute(null) // clear old route visual
    // Smooth-scroll to the route finder on mobile
    document.getElementById('route-finder-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // When a map area marker is clicked, select it
  const handleMapSelect = (area) => {
    setSelectedArea((prev) => (prev === area.id ? null : area.id))
  }

  // When a route is calculated in RouteFinder
  const handleRouteCalculated = (routeData) => {
    setActiveRoute(routeData ? routeData.path : null)
  }

  return (
    <AppLayout>
      <div className="space-y-6">

        {/* ── Page heading ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-7 h-7 rounded-lg bg-stadium-500/15 border border-stadium-500/25 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-stadium-400" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Stadium Navigation</h1>
            </div>
            <p className="text-white/35 text-sm">
              MetLife Stadium · Interactive Wayfinding · Match Day 3
            </p>
          </div>

          {/* Accessibility toggle — top-right on desktop */}
          <div className="sm:w-72 flex-shrink-0">
            <AccessibilityToggle
              enabled={wheelchairMode}
              onToggle={() => setWheelchairMode((v) => !v)}
            />
          </div>
        </div>

        {/* ── Quick Nav Cards ──────────────────────────────────────────────── */}
        <QuickNavCards onSelect={handleQuickNav} />

        {/* ── Main content grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Stadium Map — takes 2 columns on xl */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-[11px] font-black uppercase tracking-widest">Stadium Layout</span>
              {wheelchairMode && (
                <span className="text-[10px] bg-blue-500/20 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-md font-bold">
                  ♿ Accessible Mode
                </span>
              )}
            </div>
            <StadiumMap
              selectedId={selectedArea}
              wheelchairMode={wheelchairMode}
              facilityFilter={facilityFilter}
              onSelect={handleMapSelect}
              routePath={activeRoute}
            />

            {/* Crowd indicators below map */}
            <CrowdIndicators />
          </div>

          {/* Right column: Route Finder */}
          <div id="route-finder-section" className="xl:col-span-1">
            <RouteFinder
              wheelchairMode={wheelchairMode}
              preselectedTo={routeTo}
              onRouteCalculated={handleRouteCalculated}
              key={routeTo} /* remount when quick-nav pre-fills */
            />
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
