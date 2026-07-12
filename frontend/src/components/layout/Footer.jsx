import { Zap, Github, ExternalLink, Heart } from 'lucide-react'
import { TECH_STACK, FOOTER_LINKS } from '@/utils/constants'

/**
 * Site-wide footer.
 * Includes brand, tech stack tags, footer link columns,
 * GitHub placeholder and hackathon acknowledgement.
 */
export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-white/[0.06] bg-dark-800/60 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Brand column ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stadium-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,168,84,0.35)]">
                <Zap className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-white text-[17px]">
                StadiumOps <span className="text-stadium-400">AI</span>
              </span>
            </div>

            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              A GenAI-powered Match Operations & Fan Experience Platform built for major football tournaments.
            </p>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-1.5" aria-label="Technology stack">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-lg glass text-white/35 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* GitHub placeholder */}
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors"
              aria-label="View StadiumOps AI on GitHub (placeholder link)"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>github.com/stadiumops-ai</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>

          {/* ── Link columns ──────────────────────────────────────── */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <nav key={category} aria-label={`${category} links`}>
              <h3 className="text-white/50 font-semibold text-xs tracking-widest uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/30 hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © 2026 StadiumOps AI. Built with{' '}
            <Heart className="inline w-3 h-3 text-red-500/60 mx-0.5" aria-label="love" />{' '}
            for{' '}
            <span className="text-white/30">Prompt Wars Virtual — Challenge 4: Smart Stadiums & Tournament Operations.</span>
          </p>
          <p className="text-white/15 text-xs">
            Not affiliated with FIFA. Independent hackathon project.
          </p>
        </div>
      </div>
    </footer>
  )
}
