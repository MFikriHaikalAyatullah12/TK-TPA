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

    const pengajar = await prisma.pengajar.findMany({
      where: { tpaInfoId: user.tpaInfo.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(pengajar)
  } catch (error) {
    console.error('Pengajar fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    const pengajar = await prisma.pengajar.create({
      data: {
        tpaInfoId: user.tpaInfo.id,
        nama: data.nama,
        bidang: data.jabatan,
        pengalaman: data.pengalaman || null,
        sertifikasi: data.sertifikasi || null,
        jadwal: data.jadwal || null
      }
    })

    return NextResponse.json(pengajar, { status: 201 })
  } catch (error) {
    console.error('Pengajar create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}