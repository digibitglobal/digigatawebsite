'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

/**
 * Token-aware Button
 * - Colors pull from Tailwind mappings to CSS vars:
 *   primary | secondary | accent | danger | success | warning | info
 *   surface | surface-2 | surface-3 | on-surface | on-surface-2 | elevated
 * - Opacity utilities like /90 work thanks to the OKLCH-aware config.
 * - Focus ring + offset respect theme tokens.
 */

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-medium',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    'focus-visible:ring-offset-2 ring-offset-surface',
    'disabled:opacity-50 disabled:pointer-events-none',
    // Use token radius by default; sizes can override
    'rounded-[var(--radius-md)]',
    // Smooth transform for subtle hover scale on eligible variants
    'will-change-transform',
  ].join(' '),
  {
    variants: {
      variant: {
        // Solid tokens
        primary:
          'bg-primary text-elevated shadow-sm hover:bg-primary/90 hover:shadow-md',
        secondary:
          'bg-secondary text-elevated shadow-sm hover:bg-secondary/90 hover:shadow-md',
        accent:
          'bg-accent text-elevated shadow-sm hover:bg-accent/90 hover:shadow-md',

        // Intent/status tokens
        success:
          'bg-success text-elevated shadow-sm hover:bg-success/90 hover:shadow-md',
        warning:
          'bg-warning text-elevated shadow-sm hover:bg-warning/90 hover:shadow-md',
        info:
          'bg-info text-elevated shadow-sm hover:bg-info/90 hover:shadow-md',
        danger:
          'bg-danger text-elevated shadow-sm hover:bg-danger/90 hover:shadow-md',

        // Gradient using tokens
        gradient:
          'bg-gradient-to-r from-primary to-accent text-elevated shadow-md hover:shadow-lg hover:scale-[1.02]',

        // Low-emphasis variants
        outline:
          'border-2 border-on-surface/20 bg-transparent text-on-surface hover:border-primary/60 hover:bg-primary/10',
        ghost:
          'bg-transparent text-on-surface hover:bg-on-surface/5',
        glass:
          'bg-surface/40 backdrop-blur-md border border-on-surface/15 text-on-surface hover:bg-surface/60',

        // Link-style
        link:
          'bg-transparent text-primary underline-offset-4 hover:underline focus-visible:ring-0 focus-visible:ring-offset-0',
      },
      size: {
        sm: 'h-9 px-3 text-xs rounded-[var(--radius-sm)]',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-12 px-6 py-3 text-base rounded-[var(--radius-lg)]',
        xl: 'h-14 px-8 py-4 text-lg rounded-[var(--radius-xl)]',
        icon: 'h-10 w-10 p-0 rounded-[var(--radius-sm)]',
      },
      weight: {
        normal: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      weight: 'semibold',
    },
    compoundVariants: [
      // Slightly stronger focus appearance on gradient for accessibility.
      {
        variant: 'gradient',
        class:
          'focus-visible:ring-primary/80 focus-visible:ring-offset-2',
      },
      // Outline/ghost need clearer text color on hover
      {
        variant: 'outline',
        class: 'hover:text-primary',
      },
      {
        variant: 'ghost',
        class: 'hover:text-primary',
      },
    ],
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, weight, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, weight }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
