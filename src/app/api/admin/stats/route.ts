import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { tpaInfo: true }
    })

    if (!user?.tpaInfo) {
      return NextResponse.json({ error: 'TPA info not found' }, { status: 404 })
    }

    const [santriCount, pengajarCount, beritaCount, galeriCount] = await Promise.all([
      prisma.santri.count({ where: { tpaInfoId: user.tpaInfo.id } }),
      prisma.pengajar.count({ where: { tpaInfoId: user.tpaInfo.id } }),
      prisma.berita.count({ where: { tpaInfoId: user.tpaInfo.id } }),
      prisma.galeri.count({ where: { tpaInfoId: user.tpaInfo.id } })
    ])

    return NextResponse.json({
      totalSantri: santriCount,
      totalPengajar: pengajarCount,
      totalBerita: beritaCount,
      totalGaleri: galeriCount
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}