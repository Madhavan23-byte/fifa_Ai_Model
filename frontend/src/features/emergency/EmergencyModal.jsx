/**
 * features/emergency/EmergencyModal.jsx
 * Accessible confirmation modal for Fan emergency actions.
 */
import { useEffect, useRef } from 'react'
import { X, Phone } from 'lucide-react'
import { Button } from '@/components/common'
import { cn }    from '@/utils/cn'

/**
 * Traps focus within the modal for keyboard accessibility.
 */
function useFocusTrap(ref, isOpen) {
  useEffect(() => {
    if (!isOpen || !ref.current) return
    const focusable = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    first?.focus()

    const handleTab = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [isOpen, ref])
}

const colorMap = {
  red:    { icon: 'text-red-400',    ring: 'ring-red-500/30',    bg: 'bg-red-500/15 border-red-500/30'       },
  orange: { icon: 'text-orange-400', ring: 'ring-orange-500/30', bg: 'bg-orange-500/15 border-orange-500/30' },
  blue:   { icon: 'text-blue-400',   ring: 'ring-blue-500/30',   bg: 'bg-blue-500/15 border-blue-500/30'     },
  yellow: { icon: 'text-yellow-400', ring: 'ring-yellow-500/30', bg: 'bg-yellow-500/15 border-yellow-500/30' },
  green:  { icon: 'text-stadium-400',ring: 'ring-stadium-500/30',bg: 'bg-stadium-500/15 border-stadium-500/30'},
  purple: { icon: 'text-purple-400', ring: 'ring-purple-500/30', bg: 'bg-purple-500/15 border-purple-500/30' },
}

/**
 * Emergency confirmation modal.
 *
 * @param {boolean}  isOpen    - Visibility
 * @param {Function} onClose   - Close handler
 * @param {object}   action    - FAN_EMERGENCY_ACTIONS item
 */
export function EmergencyModal({ isOpen, onClose, action }) {
  const panelRef = useRef(null)
  useFocusTrap(panelRef, isOpen)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen || !action) return null
  const colors = colorMap[action.color] ?? colorMap.blue
  const modal  = action.modal

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'glass-strong rounded-2xl w-full max-w-sm shadow-2xl',
          'border animate-fade-up',
          colors.ring,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.07]">
          <h2 id="emergency-modal-title" className="text-white font-bold text-base">
            {modal.title}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Confirmation message */}
          <p className="text-white/70 text-sm leading-relaxed">{modal.body}</p>

          {/* Action info */}
          <div className={cn('rounded-xl p-3 border text-sm', colors.bg)}>
            <div className={cn('font-bold mb-0.5', colors.icon)}>{modal.action}</div>
            <div className="text-white/50 text-xs">{modal.eta}</div>
          </div>

          {/* Phone number */}
          {modal.phone && (
            <a
              href={`tel:${modal.phone}`}
              onClick={(e) => {
                if (window.matchMedia('(pointer: fine)').matches) {
                  e.preventDefault();
                  alert(`Calling ${modal.phone}... \n\n(Simulated call on desktop.)`);
                }
              }}
              className="flex items-center gap-3 glass rounded-xl px-4 py-3 hover:bg-white/[0.07] transition-colors group"
              aria-label={`Call ${modal.phone}`}
            >
              <div className="w-8 h-8 rounded-lg bg-stadium-500/15 border border-stadium-500/25 flex items-center justify-center">
                <Phone className="w-4 h-4 text-stadium-400" aria-hidden="true" />
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest">Emergency Line</div>
                <div className="text-white font-bold text-sm group-hover:text-stadium-400 transition-colors">
                  {modal.phone}
                </div>
              </div>
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 pt-0">
          <Button
            variant="secondary"
            size="md"
            className="w-full"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
