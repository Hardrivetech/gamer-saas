import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'StatForge | Pro Gaming Analytics'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a', // slate-900
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {/* Hammer Icon SVG (Orange-500) */}
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f97316" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 20 }}
          >
            <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
            <path d="M17.64 15 22 10.64" />
            <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H16.4c-.84 0-1.65-.33-2.25-.93L12.9 4.68" />
          </svg>
          <h1
            style={{
              fontSize: 100,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #fb923c, #dc2626)', // orange-400 to red-600
              backgroundClip: 'text',
              color: 'transparent',
              margin: 0,
            }}
          >
            StatForge
          </h1>
        </div>
        <p style={{ fontSize: 40, color: '#94a3b8', marginTop: 20 }}>
          Analyze. Compare. Dominate.
        </p>
      </div>
    ),
    { ...size }
  )
}