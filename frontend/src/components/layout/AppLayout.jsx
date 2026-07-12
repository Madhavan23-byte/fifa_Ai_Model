import { useState } from 'react'
import { Sidebar }   from './Sidebar'
import { AppHeader } from './AppHeader'

/**
 * Authenticated application shell.
 * Wraps all dashboard and feature pages with:
 * - Left sidebar (desktop) / drawer (mobile)
 * - Sticky top header
 * - Scrollable main content area
 *
 * Usage:
 * ```jsx
 * <AppLayout>
 *   <MyPageContent />
 * </AppLayout>
 * ```
 */
export function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-dark-800 overflow-hidden">
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-stadium-500 focus:text-white focus:font-semibold focus:text-sm"
      >
        Skip to main content
      </a>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Right panel: header + scrollable content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AppHeader onMenuToggle={() => setSidebarOpen(true)} />

        <main
          id="main-content"
          aria-label="Main content"
          className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

