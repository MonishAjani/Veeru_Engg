import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'Boiler Erection - NTPC', status: 'Completed' },
    { id: 2, name: 'Pipe Rack Fabrication - L&T', status: 'Ongoing' },
  ])
}


