import { AlertTriangle, RefreshCcw } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'

/**
 * Error state for failed data loads or runtime errors.
 *
 * @param {string}   title       - Error headline
 * @param {string}   description - User-friendly explanation
 * @param {Function} onRetry     - Optional retry callback
 */
export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5 py-20 px-8 text-center',
        className,
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-red-500/[0.1] border border-red-500/[0.2] flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-red-400" aria-hidden="true" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-white/70 font-semibold text-base">{title}</h3>
        <p className="text-white/35 text-sm max-w-xs leading-relaxed">{description}</p>
      </div>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCcw className="w-3.5 h-3.5" />}
        >
          Try again
        </Button>
      )}
    </div>
  )
}
