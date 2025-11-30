const { NextResponse } = require('next/server')
const { prisma } = require('../../../../lib/prisma')

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const berita = await prisma.berita.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        tpaInfo: {
          select: {
            namaSekolah: true
          }
        }
      }
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Public berita fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}