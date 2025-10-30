"use client"
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'mag_cookie_consent'

export default function AnalyticsLoader() {
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const enabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === '1'
    const consent = typeof window !== 'undefined' ? localStorage.getItem(CONSENT_KEY) : 'rejected'
    if (enabled && consent === 'accepted') setLoad(true)
  }, [])
  if (!load) return null
  // Placeholder for privacy‑friendly analytics (e.g., Vercel Analytics or self‑hosted).
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__MAG_ANALYTICS__=true;console.debug('Analytics enabled')`,
      }}
    />
  )
}

