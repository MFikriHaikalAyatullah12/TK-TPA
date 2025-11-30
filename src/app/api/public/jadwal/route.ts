import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get schedule from first available TPA
    const firstTpa = await prisma.tpaInfo.findFirst({
      include: {
        jadwal: {
          orderBy: [
            { hari: 'asc' },
            { waktu: 'asc' }
          ],
          select: {
            id: true,
            hari: true,
            waktu: true,
            kegiatan: true
          }
        }
      }
    })

    return NextResponse.json(firstTpa?.jadwal || [])
  } catch (error) {
    console.error('Public jadwal fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}