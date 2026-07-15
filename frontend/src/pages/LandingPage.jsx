import { TopBar } from '@/components/layout'
import { Footer }  from '@/components/layout'
import {
  HeroSection,
  FeaturesSection,
  MatchPreviewSection,
  WhySection,
} from '@/features/landing'

/**
 * Landing page — public-facing home page.
 * Composed entirely of section modules; no logic lives here.
 */
export default function LandingPage() {
  return (
    <>
      {/* Skip navigation for keyboard/screen-reader users */}
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault()
          const target = document.querySelector('#main-content')
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
            target.focus()
          }
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-stadium-500 focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <TopBar />

      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <MatchPreviewSection />
        <WhySection />
      </main>

      <Footer />
    </>
  )
}
