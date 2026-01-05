import './globals.css'
import type { Metadata, Viewport } from 'next'
export const metadata: Metadata = {
  title: 'Veeru Engineering — Industrial Fabrication & EPC Partner',
  description: 'Showcasing credibility, scale, projects, infrastructure, and compliance.',
  icons: {
    icon: '/images/Veeru Infra Logo.png',
    apple: '/images/Veeru Infra Logo.png',
    shortcut: '/images/Veeru Infra Logo.png'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0, // Allow zooming for accessibility
  userScalable: true, // Allow users to zoom
  minimumScale: 1.0,
  themeColor: '#f97316', // Orange-500 color for browser UI,
  viewportFit: 'cover' // Ensures content fits the viewport on notched phones
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden min-h-screen text-base antialiased">
        {children}
      </body>
    </html>
  )
}
