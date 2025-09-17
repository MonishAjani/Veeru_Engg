import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Veeru Engineering — Industrial Fabrication & EPC Partner',
  description: 'Showcasing credibility, scale, projects, infrastructure, and compliance.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0, // Allow zooming for accessibility
  userScalable: true, // Allow users to zoom
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
