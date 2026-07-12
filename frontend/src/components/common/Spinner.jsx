import { cn } from '@/utils/cn'

const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-[2.5px]',
  lg: 'w-8 h-8 border-[3px]',
  xl: 'w-12 h-12 border-4',
}

/** Inline loading spinner. */
export function Spinner({ size = 'md', className, label = 'Loading...' }) {
  return (
    <div role="status" aria-label={label} className={cn('inline-flex', className)}>
      <span
        className={cn(
          'rounded-full border-white/[0.1] border-t-stadium-500 animate-spin',
          sizes[size],
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

/** Full-page centered loading spinner. */
export function PageSpinner({ label = 'Loading page...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Spinner size="xl" label={label} />
      <p className="text-white/30 text-sm animate-pulse">{label}</p>
    </div>
  )
}
