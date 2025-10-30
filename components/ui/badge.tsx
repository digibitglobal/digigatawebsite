import React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
        brand: 'bg-brand-100 text-brand-900 dark:bg-brand-900/30 dark:text-brand-100',
        success: 'bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-100',
        warning: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-100',
        error: 'bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-100',
        purple: 'bg-purple-100 text-purple-900 dark:bg-purple-900/30 dark:text-purple-100',
        glass: 'bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm border border-white/20',
        gradient: 'bg-gradient-brand text-white',
        outline: 'border-2 border-current bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
