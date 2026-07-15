import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/common'
import { cn } from '@/utils/cn'
import { NAV_LINKS } from '@/utils/constants'

/**
 * Top navigation bar.
 * - Transparent on mount; becomes dark glass on scroll.
 * - Responsive: collapses to hamburger menu on mobile.
 * - Accessible: ARIA labels, keyboard navigation, focus-visible rings.
 */
export function TopBar() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled]           = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on viewport resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <header
      role="banner"
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-dark-800/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group rounded-lg"
            aria-label="StadiumOps AI — Return to home"
          >
            <div
              className={cn(
                'w-8 h-8 rounded-lg bg-stadium-500 flex items-center justify-center',
                'group-hover:bg-stadium-400 transition-colors duration-200',
                'shadow-[0_0_20px_rgba(0,168,84,0.4)]',
                'group-hover:shadow-[0_0_32px_rgba(0,168,84,0.6)]',
              )}
            >
              <Zap className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-extrabold text-white text-[17px] tracking-tight">
              StadiumOps{' '}
              <span className="text-stadium-400">AI</span>
            </span>
          </Link>

          {/* ── Desktop navigation ────────────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-0.5"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium',
                  'text-white/55 hover:text-white hover:bg-white/[0.06]',
                  'transition-all duration-200',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA + Mobile toggle ───────────────────────── */}
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              aria-label="Open the Command Center application"
              onClick={() => navigate('/role-select')}
            >
              Enter Command Center
            </Button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={cn(
                'md:hidden p-2 rounded-lg',
                'text-white/55 hover:text-white hover:bg-white/[0.06]',
                'transition-all duration-200',
              )}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen
                ? <X     className="w-5 h-5" aria-hidden="true" />
                : <Menu  className="w-5 h-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={cn(
            'md:hidden animate-slide-down',
            'bg-dark-700/95 backdrop-blur-2xl',
            'border-t border-white/[0.07]',
          )}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={cn(
                  'px-4 py-3.5 rounded-xl text-sm font-medium',
                  'text-white/60 hover:text-white hover:bg-white/[0.06]',
                  'transition-all duration-200',
                )}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/[0.06] mt-1">
              <Button variant="primary" size="md" className="w-full" onClick={() => navigate('/role-select')}>
                Enter Command Center
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
