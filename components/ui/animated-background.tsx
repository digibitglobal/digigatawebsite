'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedBackgroundProps {
  variant?: 'gradient' | 'mesh' | 'particles'
  className?: string
}

export function AnimatedBackground({ variant = 'gradient', className }: AnimatedBackgroundProps) {
  if (variant === 'gradient') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden -z-10', className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-cyan/20 dark:from-gray-900 dark:via-gray-900 dark:to-brand-900/20" />

        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-brand-400/30 dark:bg-brand-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-purple/30 dark:bg-accent-purple/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-cyan/20 dark:bg-accent-cyan/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    )
  }

  if (variant === 'mesh') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden -z-10', className)}>
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />

        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(0, 179, 164, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 90% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
            `,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    )
  }

  if (variant === 'particles') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden -z-10', className)}>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-50/50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-brand-400/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    )
  }

  return null
}

export function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-brand-500 via-accent-cyan to-accent-purple bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}
