import { cn } from '@/utils/cn'

const variants = {
  default:  'bg-white/[0.08]  text-white/60     border-white/[0.08]',
  green:    'bg-stadium-500/[0.12] text-stadium-400  border-stadium-500/[0.2]',
  gold:     'bg-gold-500/[0.12]    text-gold-400     border-gold-500/[0.2]',
  red:      'bg-red-500/[0.12]     text-red-400      border-red-500/[0.2]',
  yellow:   'bg-yellow-500/[0.12]  text-yellow-400   border-yellow-500/[0.2]',
  blue:     'bg-blue-500/[0.12]    text-blue-400     border-blue-500/[0.2]',
  purple:   'bg-purple-500/[0.12]  text-purple-400   border-purple-500/[0.2]',
}

const sizes = {
  sm: 'text-[10px] px-2    py-0.5 rounded-md',
  md: 'text-xs    px-2.5  py-1   rounded-lg',
  lg: 'text-sm    px-3    py-1.5 rounded-lg',
}

const dotColors = {
  default: 'bg-white/30',
  green:   'bg-stadium-400',
  gold:    'bg-gold-400',
  red:     'bg-red-400',
  yellow:  'bg-yellow-400',
  blue:    'bg-blue-400',
  purple:  'bg-purple-400',
}

/**
 * Status badge for conveying operational state.
 *
 * @param {'default'|'green'|'gold'|'red'|'yellow'|'blue'|'purple'} variant
 * @param {'sm'|'md'|'lg'} size
 * @param {boolean} dot - Show a colored dot indicator
 * @param {boolean} pulse - Animate the dot
 */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  pulse = false,
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium border',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5 flex-shrink-0" aria-hidden="true">
          {pulse && (
            <span className={cn(
              'animate-ping-slow absolute inline-flex h-full w-full rounded-full opacity-75',
              dotColors[variant],
            )} />
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', dotColors[variant])} />
        </span>
      )}
      {children}
    </span>
  )
}
