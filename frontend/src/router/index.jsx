import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage           from '@/pages/LandingPage'
import RoleSelectionPage     from '@/pages/RoleSelectionPage'
import DashboardPage         from '@/pages/DashboardPage'
import AIAssistantPage       from '@/pages/AIAssistantPage'
import OperationsCopilotPage from '@/pages/OperationsCopilotPage'
import NavigationPage        from '@/pages/NavigationPage'
import EmergencyPage         from '@/pages/EmergencyPage'
import NotFoundPage          from '@/pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/role-select',
    element: <RoleSelectionPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/assistant',
    element: <AIAssistantPage />,
  },
  {
    path: '/copilot',
    element: <OperationsCopilotPage />,
  },
  {
    path: '/navigation',
    element: <NavigationPage />,
  },
  {
    path: '/emergency',
    element: <EmergencyPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
