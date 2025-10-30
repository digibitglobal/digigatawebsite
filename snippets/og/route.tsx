// To enable dynamic OG images, move this file to `app/api/og/route.tsx`
// and remove `output: 'export'` from next.config.mjs (static export).
// Requires Vercel Edge runtime. Example only; not included in static builds.

import { ImageResponse } from '@vercel/og'
export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Modern API Gateway'
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b192f',
          color: 'white',
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div style={{
          position: 'absolute',
          top: 32,
          left: 32,
          width: 24,
          height: 24,
          background: '#00B3A4',
          borderRadius: 4,
        }} />
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}

