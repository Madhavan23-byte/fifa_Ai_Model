import { Navigate } from 'react-router-dom'
import { useAuth }   from '@/store/AuthContext'
import { AppLayout } from '@/components/layout'
import { CommandCenterDashboard } from '@/features/dashboard'

/**
 * Dashboard page — protected route.
 * Redirects to /role-select if no role is stored in AuthContext.
 * Wraps CommandCenterDashboard in AppLayout (sidebar + header).
 */
export default function DashboardPage() {
  const { role } = useAuth()

  if (!role) {
    return <Navigate to="/role-select" replace />
  }

  return (
    <AppLayout>
      <CommandCenterDashboard />
    </AppLayout>
  )
}
