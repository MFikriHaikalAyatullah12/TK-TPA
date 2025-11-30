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

    const jadwal = await prisma.jadwal.findMany({
      where: { tpaInfoId: user.tpaInfo.id },
      orderBy: [{ hari: 'asc' }, { waktu: 'asc' }]
    })

    return NextResponse.json(jadwal)
  } catch (error) {
    console.error('Jadwal fetch error:', error)
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

    if (!data.hari || !data.waktuMulai || !data.kegiatan) {
      return NextResponse.json(
        { error: 'Hari, waktu mulai, and kegiatan are required' },
        { status: 400 }
      )
    }

    const jadwal = await prisma.jadwal.create({
      data: {
        hari: data.hari,
        waktu: data.waktuMulai,
        kegiatan: data.kegiatan,
        tempat: data.tempat || null,
        pengajar: data.pengajar || null,
        tpaInfoId: user.tpaInfo.id
      }
    })

    return NextResponse.json(jadwal, { status: 201 })
  } catch (error) {
    console.error('Jadwal create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}