import { cn } from '@/utils/cn'

/**
 * Centered max-width page container with consistent horizontal padding.
 * Use this as the direct child of every section.
 */
export function PageContainer({ children, className, ...props }) {
  return (
    <div
      className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}
