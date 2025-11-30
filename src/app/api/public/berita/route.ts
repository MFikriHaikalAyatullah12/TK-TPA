import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')

    // Get published news from first available TPA
    const firstTpa = await prisma.tpaInfo.findFirst({
      include: {
        berita: {
          orderBy: { createdAt: 'desc' },
          take: limit ? parseInt(limit) : undefined,
          select: {
            id: true,
            judul: true,
            konten: true,
            createdAt: true
          }
        }
      }
    })

    return NextResponse.json(firstTpa?.berita || [])
  } catch (error) {
    console.error('Public berita fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}