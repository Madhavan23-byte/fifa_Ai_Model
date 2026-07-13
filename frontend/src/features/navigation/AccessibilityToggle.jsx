/**
 * features/navigation/AccessibilityToggle.jsx
 * Wheelchair / accessible mode toggle with visual feedback.
 */
import { Accessibility } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Toggle switch for wheelchair / accessibility mode.
 *
 * @param {boolean}  enabled   - Current toggle state
 * @param {Function} onToggle  - Toggle handler
 */
export function AccessibilityToggle({ enabled, onToggle }) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-4 flex items-center justify-between gap-4',
        'border transition-all duration-300',
        enabled
          ? 'border-blue-500/40 bg-blue-500/[0.05]'
          : 'border-white/[0.08]',
      )}
    >
      {/* Left: icon + text */}
      <div className="flex items-center gap-3">
        <div className={cn(
          'w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300',
          enabled
            ? 'bg-blue-500/25 border-blue-500/50 shadow-[0_0_16px_rgba(59,130,246,0.2)]'
            : 'bg-white/[0.06] border-white/[0.1]',
        )}>
          <Accessibility
            className={cn('w-5 h-5 transition-colors duration-300', enabled ? 'text-blue-400' : 'text-white/35')}
            aria-hidden="true"
          />
        </div>

        <div>
          <div className={cn(
            'text-sm font-bold transition-colors duration-300',
            enabled ? 'text-blue-300' : 'text-white/70',
          )}>
            Wheelchair Mode
          </div>
          <div className="text-white/30 text-[10px] mt-0.5">
            {enabled
              ? 'Showing accessible routes only — stairs avoided'
              : 'Enable to show ramps, lifts & wide corridors'}
          </div>
        </div>
      </div>

      {/* Right: Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        aria-label={enabled ? 'Disable wheelchair mode' : 'Enable wheelchair mode'}
        onClick={onToggle}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
          'transition-colors duration-300',
          enabled ? 'bg-blue-500' : 'bg-white/[0.1]',
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 rounded-full bg-white shadow-md',
            'transform transition-transform duration-300',
            enabled ? 'translate-x-6' : 'translate-x-1',
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
