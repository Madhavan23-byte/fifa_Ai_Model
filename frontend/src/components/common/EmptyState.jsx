import { Inbox } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'

/**
 * Empty state illustration for zero-data scenarios.
 *
 * @param {React.ComponentType} icon      - Lucide icon component
 * @param {string}              title     - Primary label
 * @param {string}              description - Secondary supporting text
 * @param {Function}            action    - Optional callback for CTA button
 * @param {string}              actionLabel - Label for the CTA
 */
export function EmptyState({
  icon: Icon = Inbox,
  title = 'No data available',
  description = 'There is nothing to display at this time.',
  action,
  actionLabel,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5 py-20 px-8 text-center',
        className,
      )}
    >
      <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
        <Icon className="w-7 h-7 text-white/20" aria-hidden="true" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-white/60 font-semibold text-base">{title}</h3>
        <p className="text-white/30 text-sm max-w-xs leading-relaxed">{description}</p>
      </div>

      {action && actionLabel && (
        <Button variant="outline" size="sm" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
