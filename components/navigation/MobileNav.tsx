"use client"
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const links = [
  { href: '/features', label: 'Features' },
  { href: '/admin-console', label: 'Admin Console' },
  { href: '/how-it-works', label: 'How it Works' },
  { href: '/plugins', label: 'Plugins' },
  { href: '/docs', label: 'Docs' },
  { href: '/integrations', label: 'Integrations' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/security', label: 'Security' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent title="Main Menu" className="p-0">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
            <span className="font-semibold">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="grid gap-1 p-2" role="navigation" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              >
                {l.label}
              </Link>
            ))}
            <Button className="mx-2 mt-2" onClick={() => setOpen(false)}>
              Get Started
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
