const { NextResponse } = require('next/server')
const { verifyJWT } = require('../../../../lib/auth')
const { prisma } = require('../../../../lib/prisma')

export const dynamic = 'force-dynamic'

export async function GET(request) {
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

    const berita = await prisma.berita.findMany({
      where: { tpaInfoId: user.tpaInfo.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(berita)
  } catch (error) {
    console.error('Berita fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
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

    const data = await request.json()

    if (!data.judul) {
      return NextResponse.json({ error: 'Judul is required' }, { status: 400 })
    }

    const berita = await prisma.berita.create({
      data: {
        judul: data.judul,
        konten: data.isi || data.konten || '',
        kategori: data.kategori || 'umum',
        gambar: data.gambar || null,
        tpaInfoId: user.tpaInfo.id
      }
    })

    return NextResponse.json(berita, { status: 201 })
  } catch (error) {
    console.error('Berita create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}