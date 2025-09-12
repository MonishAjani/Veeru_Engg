import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InfraCorp — Industrial Fabrication & EPC Partner',
  description: 'Showcasing credibility, scale, projects, infrastructure, and compliance.',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
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

