"use client"
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'mag_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const v = typeof window !== 'undefined' ? localStorage.getItem(CONSENT_KEY) : 'accepted'
    if (!v) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-4xl rounded-t-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          We use privacy‑friendly analytics to improve the product. You can opt‑out anytime.
        </p>
        <div className="shrink-0 space-x-2">
          <button
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700"
            onClick={() => {
              localStorage.setItem(CONSENT_KEY, 'rejected')
              setVisible(false)
            }}
          >Decline</button>
          <button
            className="rounded-md bg-brand px-3 py-1.5 text-sm font-medium text-white"
            onClick={() => {
              localStorage.setItem(CONSENT_KEY, 'accepted')
              setVisible(false)
            }}
          >Allow</button>
        </div>
      </div>
    </div>
  )
}

