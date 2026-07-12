import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

// ─── Variant styles ──────────────────────────────────────────────────────────
const variants = {
  primary: [
    'bg-stadium-500 hover:bg-stadium-400 text-white border-transparent',
    'shadow-[0_0_0_1px_rgba(0,168,84,0.25)]',
    'hover:shadow-[0_0_32px_rgba(0,168,84,0.45)]',
  ],
  secondary: [
    'bg-white/[0.05] hover:bg-white/[0.09] text-white',
    'border-white/[0.14] hover:border-white/[0.28]',
  ],
  danger: [
    'bg-red-600 hover:bg-red-500 text-white border-transparent',
  ],
  ghost: [
    'bg-transparent hover:bg-white/[0.05] text-white/60 hover:text-white border-transparent',
  ],
  gold: [
    'bg-gold-500 hover:bg-gold-400 text-dark-800 font-bold border-transparent',
    'hover:shadow-[0_0_32px_rgba(212,160,23,0.45)]',
  ],
  outline: [
    'bg-transparent hover:bg-stadium-500/[0.08] text-stadium-400',
    'border-stadium-500/40 hover:border-stadium-500',
  ],
}

const sizes = {
  sm: 'text-xs  px-4   py-2   rounded-lg  gap-1.5',
  md: 'text-sm  px-5   py-2.5 rounded-xl  gap-2',
  lg: 'text-sm  px-7   py-3.5 rounded-xl  gap-2',
  xl: 'text-base px-8  py-4   rounded-2xl gap-2.5',
}

// ─── Component ───────────────────────────────────────────────────────────────
/**
 * Primary interactive button for the design system.
 *
 * @param {'primary'|'secondary'|'danger'|'ghost'|'gold'|'outline'} variant
 * @param {'sm'|'md'|'lg'|'xl'} size
 * @param {boolean} isLoading
 * @param {React.ReactNode} leftIcon
 * @param {React.ReactNode} rightIcon
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center',
        'font-semibold border transition-all duration-200',
        'active:scale-[0.96]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : (
        leftIcon && <span aria-hidden="true">{leftIcon}</span>
      )}

      {children}

      {!isLoading && rightIcon && (
        <span aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  )
}
