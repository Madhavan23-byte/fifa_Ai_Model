import { cn } from '@/utils/cn'

/**
 * Section title block with optional eyebrow, highlight word, and subtitle.
 *
 * @param {string}  eyebrow   - Small uppercase label above the title
 * @param {string}  title     - Main heading text
 * @param {string}  highlight - Word(s) to render in green gradient
 * @param {string}  subtitle  - Supporting paragraph below the title
 * @param {boolean} centered  - Center-align text (default true)
 */
export function SectionTitle({
  eyebrow,
  title,
  highlight,
  subtitle,
  centered = true,
  className,
}) {
  return (
    <div className={cn('space-y-4', centered && 'text-center', className)}>
      {eyebrow && (
        <p className="text-stadium-400 font-semibold text-sm tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.08]">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="text-green-gradient">{highlight}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'text-white/45 text-lg leading-relaxed',
            centered && 'max-w-2xl mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
