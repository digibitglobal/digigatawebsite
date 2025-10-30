'use client'

import React, { createContext, useContext, useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

function useAccordionContext() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within Accordion')
  }
  return context
}

interface AccordionProps {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  children: React.ReactNode
  className?: string
}

export function Accordion({
  type = 'single',
  defaultValue,
  children,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : []
  )

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      if (type === 'single') {
        return prev.includes(value) ? [] : [value]
      } else {
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      }
    })
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('w-full', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div
      className={cn(
        'border-b border-gray-200 dark:border-gray-700',
        className
      )}
      data-value={value}
    >
      {children}
    </div>
  )
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordionContext()
  const value = (children as any)?.props?.['data-value'] || ''

  // Get the parent AccordionItem's value
  const itemElement = React.useRef<HTMLButtonElement>(null)
  const [itemValue, setItemValue] = useState('')

  React.useEffect(() => {
    const item = itemElement.current?.closest('[data-value]')
    if (item) {
      setItemValue(item.getAttribute('data-value') || '')
    }
  }, [])

  const isOpen = openItems.includes(itemValue)

  return (
    <button
      ref={itemElement}
      type="button"
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all duration-200',
        'hover:text-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        className
      )}
      onClick={() => toggleItem(itemValue)}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-5 w-5 shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { openItems } = useAccordionContext()
  const [itemValue, setItemValue] = useState('')
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const item = contentRef.current?.closest('[data-value]')
    if (item) {
      setItemValue(item.getAttribute('data-value') || '')
    }
  }, [])

  const isOpen = openItems.includes(itemValue)

  return (
    <div
      ref={contentRef}
      className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-96 pb-4' : 'max-h-0'
      )}
    >
      <div className={cn('text-sm text-gray-600 dark:text-gray-400', className)}>
        {children}
      </div>
    </div>
  )
}
