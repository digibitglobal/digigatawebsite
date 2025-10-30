"use client"
import * as React from 'react'
import { cn } from '@/lib/utils'

type SheetContextValue = {
  open: boolean
  setOpen: (v: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

export function Sheet({ children, open: controlledOpen, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (o: boolean) => void }) {
  const [uncontrolled, setUncontrolled] = React.useState(false)
  const open = controlledOpen ?? uncontrolled
  const setOpen = (v: boolean) => {
    if (controlledOpen === undefined) setUncontrolled(v)
    onOpenChange?.(v)
  }
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>
}

export function SheetTrigger({ asChild = false, children }: { asChild?: boolean; children: React.ReactElement }) {
  const ctx = React.useContext(SheetContext)
  if (!ctx) return children
  const onClick = (e: React.MouseEvent) => {
    children.props.onClick?.(e)
    ctx.setOpen(true)
  }
  return asChild ? React.cloneElement(children, { onClick }) : (
    <button onClick={onClick} aria-haspopup="dialog" aria-expanded={ctx.open} className="rounded-md border border-gray-300 p-2 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
      {children}
    </button>
  )
}

export function SheetContent({ side = 'left', className, children, title = 'Menu' }: { side?: 'left' | 'right'; className?: string; children: React.ReactNode; title?: string }) {
  const ctx = React.useContext(SheetContext)
  const panelRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!ctx?.open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') ctx.setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    panelRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [ctx?.open])
  if (!ctx) return null
  const hidden = !ctx.open
  const sideClass = side === 'left' ? 'left-0' : 'right-0'
  return (
    <div
      className={cn('fixed inset-0 z-50', hidden && 'pointer-events-none')}
      aria-hidden={hidden}
    >
      <div
        className={cn('absolute inset-0 bg-black/40 transition-opacity', hidden ? 'opacity-0' : 'opacity-100')}
        onClick={() => ctx.setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
        className={cn(
          'absolute top-0 h-full w-80 max-w-[90%] transform bg-white p-4 shadow-lg outline-none transition-transform dark:bg-gray-900',
          sideClass,
          hidden ? (side === 'left' ? '-translate-x-full' : 'translate-x-full') : 'translate-x-0',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

