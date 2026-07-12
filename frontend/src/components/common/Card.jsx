import { cn } from '@/utils/cn'

/**
 * Base glassmorphism card container.
 *
 * @param {boolean} hover - Enable lift + border highlight on hover
 * @param {boolean} glow  - Enable stadium-green glow on hover
 */
export function Card({ children, className, hover = false, glow = false, ...props }) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        hover && [
          'cursor-pointer transition-all duration-300',
          'hover:bg-white/[0.07] hover:border-white/[0.16]',
          'hover:-translate-y-1.5 hover:shadow-2xl',
        ],
        glow && 'hover:shadow-[0_20px_60px_rgba(0,168,84,0.12)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/** Card header section with bottom padding removed. */
export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('p-6 pb-0', className)} {...props}>
      {children}
    </div>
  )
}

/** Card body section. */
export function CardBody({ children, className, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
}

/** Card footer section with top padding removed. */
export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  )
}
