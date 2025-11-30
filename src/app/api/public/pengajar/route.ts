import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')

    // Get first available TPA's pengajar for public view
    const firstTpa = await prisma.tpaInfo.findFirst({
      include: {
        pengajar: {
          orderBy: { createdAt: 'desc' },
          take: limit ? parseInt(limit) : undefined,
          select: {
            id: true,
            nama: true,
            bidang: true
          }
        }
      }
    })

    return NextResponse.json(firstTpa?.pengajar || [])
  } catch (error) {
    console.error('Public pengajar fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}