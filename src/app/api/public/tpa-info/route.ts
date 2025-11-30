import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const domain = url.searchParams.get('domain') || url.hostname
    
    // For now, we'll get the first TPA info available
    // In production, you might want to match by domain or subdomain
    const tpaInfo = await prisma.tpaInfo.findFirst({
      include: {
        pengajar: true,
        santri: {
          where: { status: 'active' },
          take: 10
        },
        berita: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        galeri: {
          orderBy: { createdAt: 'desc' },
          take: 8
        },
        jadwal: {
          orderBy: { createdAt: 'desc' }
        },
        prestasi: {
          orderBy: { tahun: 'desc' },
          take: 5
        }
      }
    })

    if (!tpaInfo) {
      return NextResponse.json({ 
        error: 'TPA not found',
        message: 'No TPA information available' 
      }, { status: 404 })
    }

    return NextResponse.json(tpaInfo)
  } catch (error) {
    console.error('Public TPA info fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}